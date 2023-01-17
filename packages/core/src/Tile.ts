export enum OpenTileResult {
  Success,
  GameOver,
  Failure
}

export enum ToggleFlagResult {
  Place,
  Take,
  Failure
}

export interface TilePosition {
  x: number
  y: number
}

export default class Tile {
  public readonly x: number

  public readonly y: number

  public readonly isBomb: boolean

  private _isOpen = false

  private _hasFlag = false

  constructor(x: number, y: number, isBomb: boolean = false) {
    this.x = x
    this.y = y
    this.isBomb = isBomb
  }

  public clone(): Tile {
    const tile = new Tile(this.x, this.y, this.isBomb)
    tile._isOpen = this._isOpen // eslint-disable-line no-underscore-dangle
    tile._hasFlag = this._hasFlag // eslint-disable-line no-underscore-dangle
    return tile
  }

  /**
   * Get (x, y).
   */
  public get position(): TilePosition {
    return { x: this.x, y: this.y }
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

  /**
   * Get if the tile has flag.
   */
  public get hasFlag(): boolean {
    return this._hasFlag
  }

  /**
   * Place or take the flag.
   */
  public toggleFlag(): ToggleFlagResult {
    if (this._isOpen) {
      return ToggleFlagResult.Failure
    }
    this._hasFlag = !this._hasFlag
    return this._hasFlag ? ToggleFlagResult.Place : ToggleFlagResult.Take
  }
}
