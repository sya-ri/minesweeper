import Tile from './tile/Tile'
import TilePosition from './tile/TilePosition'
import OpenTileResult from './tile/OpenTileResult'

export default class Board {
  private readonly tiles: Tile[][] = []

  constructor(tiles: Tile[][]) {
    this.tiles = tiles
  }

  /**
   * Get if (x, y) is in the board.
   */
  public isInside(x: number, y: number): boolean {
    return x >= 0 && y >= 0 && y < this.tiles.length && x < this.tiles[y].length
  }

  /**
   * Get the tile of (x, y).
   * if (x, y) is outside the board, throw an exception or return undefined.
   *
   * @see isInside
   */
  public getTile(x: number, y: number): Tile {
    return this.tiles[y][x]
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
    return this.getAround(x, y).map(({ x: tx, y: ty }) => this.getTile(tx, ty))
  }

  /**
   * Get the number of bombs around the tile.
   */
  public countAroundBomb(x: number, y: number): number {
    return this.getAroundTiles(x, y).filter((tile) => tile.isBomb).length
  }

  /**
   * Open the tile of (x, y).
   */
  public openTile(x: number, y: number): OpenTileResult {
    const tile = this.getTile(x, y)
    const result = tile.open()
    if (result === OpenTileResult.Success && this.countAroundBomb(x, y) === 0) {
      this.getAround(x, y).forEach(({ x: tx, y: ty }) => this.openTile(tx, ty))
    }
    return result
  }
}
