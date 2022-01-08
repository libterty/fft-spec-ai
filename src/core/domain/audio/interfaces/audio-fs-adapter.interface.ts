
export interface IAudioFsAdapter {
  getExtensionName(file: string): string
  convertMp3ToWav(file: string): Promise<string>
}