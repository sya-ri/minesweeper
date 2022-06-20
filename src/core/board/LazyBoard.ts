import IBoard from './IBoard'
import OpenTileResult from '../tile/OpenTileResult'
import TilePosition from '../tile/TilePosition'
import ToggleFlagResult from '../tile/ToggleFlagResult'
import Tile from '../tile/Tile'
import ReadOnlyTile from '../tile/ReadOnlyTile'

export default class LazyBoard implements IBoard {
  private readonly width: number

  private readonly height: number

  private readonly generator: (width: number, height: number, opened: TilePosition[], flags: TilePosition[]) => IBoard

  private readonly _tiles: Tile[][]

  private readonly opened: TilePosition[] = []

  constructor(
    width: number,
    height: number,
    generator: (width: number, height: number, opened: TilePosition[], flags: TilePosition[]) => IBoard
  ) {
    this._tiles = (() => {
      const tiles: Tile[][] = []
      for (let y = 0; y < height; y += 1) {
        const tt: Tile[] = []
        for (let x = 0; x < width; x += 1) {
          tt.push(new Tile(x, y))
        }
        tiles.push(tt)
      }
      return tiles
    })()
    this.width = width
    this.height = height
    this.generator = generator
  }

  public get tiles(): ReadOnlyTile[][] {
    return this._tiles
  }

  public clone(): IBoard {
    const flags = this._tiles.flatMap((tt) => tt.filter((t) => t.hasFlag).map((t) => ({ x: t.x, y: t.y })))
    return this.generator(this.width, this.height, this.opened, flags)
  }

  public getTile(x: number, y: number): Tile {
    return this._tiles[y][x]
  }

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  public countAroundBomb(x: number, y: number): number {
    return 0
  }

  public openTile(x: number, y: number): OpenTileResult {
    for (let i = -1; i <= 1; i += 1) {
      for (let j = -1; j <= 1; j += 1) {
        this.opened.push({ x: x + i, y: y + j })
      }
    }
    return OpenTileResult.Success
  }

  public toggleFlag(x: number, y: number): ToggleFlagResult {
    const tile = this.getTile(x, y)
    return tile.toggleFlag()
  }
}
