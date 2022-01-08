

import { extname } from 'path'
import { Transform } from 'stream'
import { Logger } from '@nestjs/common'
import * as ffmpeg from 'fluent-ffmpeg'
import { FileHandler } from '@ffts/core/common/utils/file-handler'
import { IAudioFsAbstractAdapter } from '@ffts/core/domain/audio/interfaces/audio-fs-adapter.interface'
import { EAudioExt } from '@ffts/core/domain/audio/value-object/audio.domain'
import * as ICommonTypes from '@ffts/core/common/types/CommonTypes'


export abstract class AudioFsAbstractAdapter implements IAudioFsAbstractAdapter {
  abstract onAudioReadStream<T extends ICommonTypes.auto, R extends ICommonTypes.auto>(result: T): R

  constructor(
    private readonly logger: Logger,
    private readonly fileHandler: FileHandler
  ) {}

  public getExtensionName(file: string): string {
    return extname(file)
  }

  public convertMp3ToWav(file: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const ext = this.getExtensionName(file)
      if (ext === EAudioExt.WAV) return resolve(file)
      const outPutFile = file.replace(ext, EAudioExt.WAV)
      ffmpeg(file)
        .outputFormat('wav')
        .on('error', (err) => reject(err))
        .on('progress', (progress) => {
          this.logger.log('Processing: ' + progress.targetSize + ' KB converted', 'AudioFsAdapter')
        })
        .on('end', () => resolve(outPutFile))
        .save(outPutFile)
    })
  }

  public streamAudio(file: string) {
    const pipeStream = new Transform({
      transform: (chunk: ICommonTypes.auto, encoding: BufferEncoding, done) => {
        const result = chunk.toString().toUpperCase()
        // this.logger.log(result, '')
        this.onAudioReadStream(result)
        done(null, result)
      }
    })
    // const fileStatus = this.fileHandler.getFileStatus(file)
    const stream = this.fileHandler.createReadStream(file)
    stream
      .pipe(pipeStream)
  }
}

// async function main() {
//   const audioPath = join(process.cwd(), 'video/example_audio_5.mp3')
//   console.log('audioPath: ', audioPath)
//   const audioFsAdapter = new AudioFsAdapter(new FileHandler())
//   const wavFile = await audioFsAdapter.convertMp3ToWav(audioPath)
//   console.log('wavFile: ', wavFile)
//   await audioFsAdapter.streamAudio(wavFile)
// }

// main()
