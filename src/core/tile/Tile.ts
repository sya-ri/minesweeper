export default class Tile {
  public readonly id: number

  private _isOpen = false

  constructor(id: number) {
    this.id = id
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
