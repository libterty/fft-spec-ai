/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, @typescript-eslint/explicit-module-boundary-types */

import * as fs from 'fs'
import * as path from 'path'

export class FileHandler {
  /**
   * @description Get File Path
   * @public
   * @param {string} file
   * @returns {string}
   */
  public realPath(file: string): string {
    return path.resolve(file)
  }

  /**
   * @description Get Path
   * @public
   * @param {string} filename
   * @returns {string}
   */
  public getPath(filename: string): string {
    filename = filename.replace(/\/|\\/g, '/')
    const path = filename.substr(0, filename.lastIndexOf('/'))
    return this.realPath(path)
  }

  /**
   * @description Create folder
   * @public
   * @param {string} path
   * @returns {void}
   */
  public createFolder(path: string): void {
    const realPath = this.realPath(path)
    const realPaths = realPath.split(/\/|\\/g)
    realPaths.reduce((prevVal, curVal, curIndex, arr) => {
      const sum = `${prevVal}/${curVal}`
      if (!fs.existsSync(sum)) {
        fs.mkdirSync(sum)
      }
      return sum
    })
  }

  /**
   * @description Write File
   * @public
   * @param {string} fileName
   * @param {any} data
   * @returns {void}
   */
  public writeFile(fileName: string, data: any): void {
    this.createFolder(this.getPath(fileName))
    const realPath = this.realPath(fileName)
    fs.writeFileSync(realPath, data)
  }

  /**
   * @description Append File
   * @public
   * @param {string} fileName
   * @param {any} data
   * @returns {void}
   */
  public appendFile(fileName: string, data: any): void {
    this.createFolder(this.getPath(fileName))
    const realPath = this.realPath(fileName)
    fs.appendFileSync(realPath, data)
  }

  /**
   * @description Check if Directory is exited or not
   * @private
   * @returns {Promise<boolean}
   */
  public isDirectoryExist(path: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      fs.statSync(path)
    })
  }

  /**
   * @description Read File
   * @public
   * @param {string} fileName
   * @returns {Buffer}
   */
  public readFile(fileName: string): Buffer {
    this.createFolder(this.getPath(fileName))
    const realPath = this.realPath(fileName)
    return fs.readFileSync(realPath)
  }

  public createReadStream(fileName: string): fs.ReadStream {
    return fs.createReadStream(fileName)
  }

  /**
   * @description Get File Status
   * @public
   * @param {string} fileName
   * @returns {fs.Stats}
   */
  public getFileStatus(fileName: string): fs.Stats {
    this.createFolder(this.getPath(fileName))
    const realPath = this.realPath(fileName)
    return fs.statSync(realPath)
  }

  /**
   * @description Check if File Alive
   * @public
   * @param {string} fileName
   * @returns {boolean}
   */
  public getFileAlive(fileName: string): boolean {
    try {
      this.createFolder(this.getPath(fileName))
      const realPath = this.realPath(fileName)
      fs.accessSync(fileName)
      return true
    } catch (error) {
      return false
    }
  }
}
