import SimpleTilesGenerator from './SimpleTilesGenerator'
import RandomWithSimplexNoiseBombPlacer from '../bomb/RandomWithSimplexNoiseBombPlacer'

export default class RandomWithSimplexNoiseTilesGenerator extends SimpleTilesGenerator {
  constructor(
    width: number,
    height: number,
    numberOfBomb: number,
    step: number,
    numberOfBlanks: number,
    isLazy: boolean
  ) {
    super(
      width,
      height,
      new RandomWithSimplexNoiseBombPlacer(width, height, numberOfBomb, step, numberOfBlanks),
      isLazy
    )
  }
}
