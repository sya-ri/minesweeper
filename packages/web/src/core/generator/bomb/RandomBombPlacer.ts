import BombPlacer from './BombPlacer'
import TilePosition from '../../tile/TilePosition'

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

  public init(blanks: TilePosition[]) {
    while (this.bombs.size < this.numberOfBomb) {
      const x = Math.floor(Math.random() * this.width)
      const y = Math.floor(Math.random() * this.height)
      if (!blanks.some((t) => t.x === x && t.y === y)) {
        this.bombs.add(x * this.height + y)
      }
    }
  }

  public hasBomb(x: number, y: number): boolean {
    return this.bombs.has(x * this.height + y)
  }
}
