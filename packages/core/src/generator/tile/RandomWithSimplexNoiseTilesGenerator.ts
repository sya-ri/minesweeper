import SimpleTilesGenerator from './SimpleTilesGenerator'
import RandomWithSimplexNoiseBombPlacer from '../bomb/RandomWithSimplexNoiseBombPlacer'

export default class RandomWithSimplexNoiseTilesGenerator extends SimpleTilesGenerator {
  constructor(width: number, height: number, numberOfBomb: number, step: number, candidate: number, isLazy: boolean) {
    super(width, height, new RandomWithSimplexNoiseBombPlacer(width, height, numberOfBomb, step, candidate), isLazy)
  }

  public noise(x: number, y: number): number {
    return (this.bombPlacer as RandomWithSimplexNoiseBombPlacer).noise(x, y)
  }
}
