import TilesGenerator from './TilesGenerator'
import Tile from '../../Tile'
import RandomBombPlacer from '../bomb/RandomBombPlacer'

export default class StaticTilesGenerator implements TilesGenerator {
  public readonly bombPlacer = new RandomBombPlacer(0, 0, 0)

  private readonly tiles: Tile[][]

  public readonly width: number

  public readonly height: number

  public readonly isGenerated = true

  public readonly isLazy = false

  constructor(tiles: Tile[][]) {
    this.tiles = tiles
    this.height = tiles.length
    this.width = this.height ? tiles[0].length : 0
  }

  public generate(): Tile[][] {
    return this.tiles
  }
}
