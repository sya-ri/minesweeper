import Tile from '../tile/Tile'
import TilePosition from '../tile/TilePosition'
import OpenTileResult from '../tile/OpenTileResult'
import ReadOnlyTile from '../tile/ReadOnlyTile'
import ToggleFlagResult from '../tile/ToggleFlagResult'
import IBoard from './IBoard'

export default class Board implements IBoard {
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

  public countAroundBomb(x: number, y: number): number {
    return this.getAroundTiles(x, y).filter((t) => t.isBomb).length
  }

  public openTile(x: number, y: number): OpenTileResult {
    const tile = this.getTile(x, y)
    const result = tile.open()
    if (result === OpenTileResult.Success && this.countAroundBomb(x, y) === 0) {
      this.getAround(x, y).forEach((t) => this.openTile(t.x, t.y))
    }
    return result
  }

  public toggleFlag(x: number, y: number): ToggleFlagResult {
    const tile = this.getTile(x, y)
    return tile.toggleFlag()
  }
}
