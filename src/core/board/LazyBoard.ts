import IBoard from './IBoard'
import OpenTileResult from '../tile/OpenTileResult'
import TilePosition from '../tile/TilePosition'
import ToggleFlagResult from '../tile/ToggleFlagResult'
import Tile from '../tile/Tile'

export default class LazyBoard implements IBoard {
  private readonly width: number

  private readonly height: number

  private readonly generator: (width: number, height: number, opened: TilePosition[], flags: TilePosition[]) => IBoard

  private readonly opened: TilePosition[] = []

  public readonly tiles: Tile[][]

  constructor(
    width: number,
    height: number,
    generator: (width: number, height: number, opened: TilePosition[], flags: TilePosition[]) => IBoard
  ) {
    this.tiles = Array.from({ length: height }, (_y, y) => Array.from({ length: width }, (_x, x) => new Tile(x, y)))
    this.width = width
    this.height = height
    this.generator = generator
  }

  public clone(): IBoard {
    const flags = this.tiles.flatMap((tt) => tt.filter((t) => t.hasFlag).map((t) => ({ x: t.x, y: t.y })))
    return this.generator(this.width, this.height, this.opened, flags)
  }

  public getTile(x: number, y: number): Tile {
    return this.tiles[y][x]
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
