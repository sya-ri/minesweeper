import SimplexNoise from 'simplex-noise'
import RandomBombPlacer from './RandomBombPlacer'
import { TilePosition } from '../../Tile'

export default class RandomWithSimplexNoiseBombPlacer extends RandomBombPlacer {
  private readonly step: number

  private readonly candidate: number

  constructor(width: number, height: number, numberOfBomb: number, step: number, candidate: number) {
    super(width, height, numberOfBomb)
    this.step = step
    this.candidate = candidate
  }

  public init(candidates: TilePosition[]) {
    const simplex = new SimplexNoise()
    const noises = Array.from({ length: this.height }, (_y, y) => {
      return Array.from({ length: this.width }, (_x, x) => {
        const noise = simplex.noise2D(x * this.step, y * this.step)
        return { x, y, noise }
      })
    }).flat()
    noises.sort(({ noise: noise1 }, { noise: noise2 }) => noise2 - noise1)
    candidates.push(...noises.slice(0, Math.floor(this.width * this.height * this.candidate)))
    super.init(candidates)
  }
}
