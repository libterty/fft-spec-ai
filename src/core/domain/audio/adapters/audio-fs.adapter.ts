import fs from 'fs'
import { join, extname } from 'path'
import { Logger } from '@nestjs/common'
import * as ffmpeg from 'fluent-ffmpeg'
import { IAudioFsAdapter } from '@ttfs/core/domain/audio/interfaces/audio-fs-adapter.interface'
import { EAudioExt } from '@ttfs/core/domain/audio/value-object/audio.domain'
import { FileHandler } from '@ttfs/core/common/utils/file-handler'

export class AudioFsAdapter implements IAudioFsAdapter {
  private readonly logger = new Logger('AudioFsAdapter')

  getExtensionName(file: string): string {
    return extname(file)
  }

  convertMp3ToWav(file: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const ext = this.getExtensionName(file)
      if (ext === EAudioExt.WAV) return resolve(file)
      const outPutFile = file.replace(ext, EAudioExt.WAV)
      // ffmpeg(file)
      ffmpeg(file)
        .outputFormat('wav')
        .on('error', (err) => reject(err))
        .on('progress', (progress) => {
          this.logger.log('Processing: ' + progress.targetSize + ' KB converted')
        })
        .on('end', () => resolve(outPutFile))
        .save(outPutFile)
    })
  }
}

async function main() {
  const audioPath = join(process.cwd(), 'video/example_audio_5.mp3')
  console.log('audioPath: ', audioPath)
  const wavFile = await new AudioFsAdapter().convertMp3ToWav(audioPath)
  console.log('wavFile: ', wavFile)
}

main()
