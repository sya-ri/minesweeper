import TilesGenerator from './TilesGenerator'
import Tile from '../../tile/Tile'
import TilePosition from '../../tile/TilePosition'
import BombPlacer from '../bomb/BombPlacer'

export default class SimpleTilesGenerator implements TilesGenerator {
  private readonly bombPlacer: BombPlacer

  public readonly isLazy: boolean

  private _isGenerated = false

  public get isGenerated(): boolean {
    return this._isGenerated
  }

  constructor(bombPlacer: BombPlacer, isLazy: boolean) {
    this.bombPlacer = bombPlacer
    this.isLazy = isLazy
  }

  public generate(width: number, height: number, blanks: TilePosition[]): Tile[][] {
    this._isGenerated = true
    this.bombPlacer.init(blanks)
    return Array.from({ length: height }, (_y, y) =>
      Array.from({ length: width }, (_x, x) => {
        return new Tile(x, y, this.bombPlacer.hasBomb(x, y))
      })
    )
  }
}
