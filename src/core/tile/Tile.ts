import OpenTileResult from './OpenTileResult'
import TilePosition from './TilePosition'
import ReadOnlyTile from './ReadOnlyTile'
import ToggleFlagResult from './ToggleFlagResult'

export default class Tile implements ReadOnlyTile {
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
