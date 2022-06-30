import TilesGenerator from './TilesGenerator'
import Tile from '../../tile/Tile'
import TilePosition from '../../tile/TilePosition'
import BombPlacer from '../bomb/BombPlacer'

export default class SimpleTilesGenerator implements TilesGenerator {
  private readonly bombPlacer: BombPlacer

  public readonly width: number

  public readonly height: number

  public readonly isLazy: boolean

  private _isGenerated = false

  public get isGenerated(): boolean {
    return this._isGenerated
  }

  constructor(width: number, height: number, bombPlacer: BombPlacer, isLazy: boolean) {
    this.width = width
    this.height = height
    this.bombPlacer = bombPlacer
    this.isLazy = isLazy
  }

  public generate(blanks: TilePosition[]): Tile[][] {
    this._isGenerated = true
    this.bombPlacer.init(blanks)
    return Array.from({ length: this.height }, (_y, y) =>
      Array.from({ length: this.width }, (_x, x) => {
        return new Tile(x, y, this.bombPlacer.hasBomb(x, y))
      })
    )
  }
}
