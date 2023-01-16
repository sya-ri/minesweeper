import BombPlacer from './BombPlacer'
import { TilePosition } from '../../Tile'
import shuffle from '../../util/shuffle'

export default class RandomBombPlacer implements BombPlacer {
  public readonly width: number

  public readonly height: number

  public readonly numberOfBomb: number

  private readonly bombs = new Set<number>()

  constructor(width: number, height: number, numberOfBomb: number) {
    this.width = width
    this.height = height
    this.numberOfBomb = numberOfBomb
  }

  public init(candidates: TilePosition[]) {
    if (candidates.length === 0) {
      const positions: TilePosition[] = []
      Array.from(Array(this.width).keys()).forEach((x) => {
        Array.from(Array(this.height).keys()).forEach((y) => {
          positions.push({ x, y })
        })
      })
      shuffle(positions)
        .slice(0, this.numberOfBomb)
        .forEach(({ x, y }) => this.bombs.add(x * this.height + y))
    } else {
      shuffle(candidates)
        .slice(0, this.numberOfBomb)
        .forEach(({ x, y }) => this.bombs.add(x * this.height + y))
    }
  }

  public hasBomb(x: number, y: number): boolean {
    return this.bombs.has(x * this.height + y)
  }
}
