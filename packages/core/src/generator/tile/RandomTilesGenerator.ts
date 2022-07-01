import SimpleTilesGenerator from './SimpleTilesGenerator'
import RandomBombPlacer from '../bomb/RandomBombPlacer'

export default class RandomTilesGenerator extends SimpleTilesGenerator {
  constructor(width: number, height: number, numberOfBomb: number, isLazy: boolean) {
    super(width, height, new RandomBombPlacer(width, height, numberOfBomb), isLazy)
  }
}
