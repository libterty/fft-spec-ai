
export interface IAudioFsAbstractAdapter {
  getExtensionName(file: string): string
  convertMp3ToWav(file: string): Promise<string>
  streamAudio(file: string): void
}