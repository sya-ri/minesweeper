import Tile from '../tile/Tile'
import TilePosition from '../tile/TilePosition'
import OpenTileResult from '../tile/OpenTileResult'
import ReadOnlyTile from '../tile/ReadOnlyTile'
import ToggleFlagResult from '../tile/ToggleFlagResult'

export default class Board {
  private readonly _tiles: Tile[][] = []

  constructor(tiles: Tile[][]) {
    this._tiles = tiles
  }

  public get tiles(): ReadOnlyTile[][] {
    return this._tiles
  }

  public clone(): Board {
    return new Board(this._tiles)
  }

  /**
   * Get if (x, y) is in the board.
   */
  public isInside(x: number, y: number): boolean {
    return x >= 0 && y >= 0 && y < this._tiles.length && x < this._tiles[y].length
  }

  /**
   * Get the tile of (x, y).
   * if (x, y) is outside the board, throw an exception or return undefined.
   *
   * @see isInside
   */
  public getTile(x: number, y: number): Tile {
    return this._tiles[y][x]
  }

  /**
   * Get the tiles around (x, y).
   */
  public getAround(x: number, y: number): TilePosition[] {
    const positions: TilePosition[] = []
    for (let i = -1; i <= 1; i += 1) {
      for (let j = -1; j <= 1; j += 1) {
        if ((i !== 0 || j !== 0) && this.isInside(x + i, y + j)) {
          positions.push({ x: x + i, y: y + j })
        }
      }
    }
    return positions
  }

  /**
   * Get the tiles around (x, y).
   */
  public getAroundTiles(x: number, y: number): Tile[] {
    return this.getAround(x, y).map((t) => this.getTile(t.x, t.y))
  }

  /**
   * Get the number of bombs around the tile.
   */
  public countAroundBomb(x: number, y: number): number {
    return this.getAroundTiles(x, y).filter((t) => t.isBomb).length
  }

  /**
   * Open the tile of (x, y).
   */
  public openTile(x: number, y: number): OpenTileResult {
    const tile = this.getTile(x, y)
    const result = tile.open()
    if (result === OpenTileResult.Success && this.countAroundBomb(x, y) === 0) {
      this.getAround(x, y).forEach((t) => this.openTile(t.x, t.y))
    }
    return result
  }

  /**
   * Place or take the flag of (x, y).
   */
  public toggleFlag(x: number, y: number): ToggleFlagResult {
    const tile = this.getTile(x, y)
    return tile.toggleFlag()
  }
}
