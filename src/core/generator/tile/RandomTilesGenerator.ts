import TilesGenerator from './TilesGenerator'
import Tile from '../../tile/Tile'
import SimpleTilesGenerator from './SimpleTilesGenerator'
import RandomBombPlacer from '../bomb/RandomBombPlacer'
import TilePosition from '../../tile/TilePosition'

export default class RandomTilesGenerator implements TilesGenerator {
  private readonly numberOfBomb: number

  public readonly isLazy

  private _isGenerated = false

  public get isGenerated(): boolean {
    return this._isGenerated
  }

  constructor(numberOfBomb: number, isLazy: boolean) {
    this.numberOfBomb = numberOfBomb
    this.isLazy = isLazy
  }

  public generate(width: number, height: number, blanks: TilePosition[]): Tile[][] {
    this._isGenerated = true
    const generator = new SimpleTilesGenerator(new RandomBombPlacer(width, height, this.numberOfBomb), false)
    return generator.generate(width, height, blanks)
  }
}
