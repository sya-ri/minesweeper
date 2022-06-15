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
   *
   * @throws The tile is already open.
   */
  public open() {
    if (this._isOpen) {
      throw new Error('The tile is already open.')
    }
    this._isOpen = true
  }
}
