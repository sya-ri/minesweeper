import OpenTileResult from '../tile/OpenTileResult'
import ToggleFlagResult from '../tile/ToggleFlagResult'
import Tile from '../tile/Tile'

export default interface IBoard {
  /**
   * Get board tiles as a two-dimensional array
   */
  tiles: Tile[][]

  /**
   * Get all board tiles
   *
   * @see tiles
   */
  flatTiles: Tile[]

  clone(): IBoard

  /**
   * Get the tile of (x, y).
   * if (x, y) is outside the board, throw an exception or return undefined.
   *
   * @see isInside
   */
  getTile(x: number, y: number): Tile

  /**
   * Get the number of bombs around the tile.
   */
  countAroundBomb(x: number, y: number): number

  /**
   * Open the tile of (x, y).
   */
  openTile(x: number, y: number): OpenTileResult

  /**
   * Place or take the flag of (x, y).
   */
  toggleFlag(x: number, y: number): ToggleFlagResult
}
