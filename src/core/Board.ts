import Tile from './tile/Tile'

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
   * Get tile at (x, y).
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
  public getAroundTiles(x: number, y: number): Tile[] {
    const tiles = []
    for (let i = -1; i <= 1; i += 1) {
      for (let j = -1; j <= 1; j += 1) {
        if ((i !== 0 || j !== 0) && this.isInside(x + i, y + j)) {
          tiles.push(this.getTile(x + i, y + j))
        }
      }
    }
    return tiles
  }
}
