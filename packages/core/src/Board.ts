import Tile, { OpenTileResult, TilePosition, ToggleFlagResult } from './Tile'
import TilesGenerator from './generator/tile/TilesGenerator'
import StaticTilesGenerator from './generator/tile/StaticTilesGenerator'
import SimpleTilesGenerator from './generator/tile/SimpleTilesGenerator'
import RandomBombPlacer from './generator/bomb/RandomBombPlacer'

export default class Board {
  private readonly tilesGenerator: TilesGenerator

  private _tiles: Tile[][]

  constructor(tilesGenerator: TilesGenerator) {
    this.tilesGenerator = tilesGenerator
    if (tilesGenerator.isLazy) {
      const { width, height } = tilesGenerator
      const bombPlacer = new RandomBombPlacer(width, height, 0)
      const blankGenerator = new SimpleTilesGenerator(width, height, bombPlacer, false)
      this._tiles = blankGenerator.generate([])
    } else {
      this._tiles = tilesGenerator.generate([])
    }
  }

  /**
   * Get whether board is generated
   */
  public get isGenerated(): boolean {
    return this.tilesGenerator.isGenerated
  }

  /**
   * Get board width
   */
  public get width(): number {
    return this.tilesGenerator.width
  }

  /**
   * Get board height
   */
  public get height(): number {
    return this.tilesGenerator.height
  }

  /**
   * Get board tiles as a two-dimensional array
   */
  public get tiles(): Tile[][] {
    return this._tiles
  }

  /**
   * Get all board tiles
   *
   * @see tiles
   */
  public get flatTiles(): Tile[] {
    return this._tiles.flat()
  }

  public clone(): Board {
    return new Board(new StaticTilesGenerator(this.tiles))
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
    if (!this.tilesGenerator.isGenerated) {
      const blanks = []
      for (let i = -1; i <= 1; i += 1) {
        for (let j = -1; j <= 1; j += 1) {
          blanks.push({ x: x + i, y: y + j })
        }
      }
      this._tiles = this.tilesGenerator.generate(blanks)
    }
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
