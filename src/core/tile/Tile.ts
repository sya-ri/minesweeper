import OpenTileResult from './OpenTileResult'

export default class Tile {
  public readonly id: number

  public readonly isBomb: boolean

  private _isOpen = false

  constructor(id: number, isBomb: boolean = false) {
    this.id = id
    this.isBomb = isBomb
  }

  /**
   * Get if the tile is open.
   */
  public get isOpen(): boolean {
    return this._isOpen
  }

  /**
   * Open the tile.
   */
  public open(): OpenTileResult {
    if (this._isOpen) {
      return OpenTileResult.Failure
    }
    this._isOpen = true
    return this.isBomb ? OpenTileResult.GameOver : OpenTileResult.Success
  }
}
