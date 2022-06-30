import TilesGenerator from './TilesGenerator'
import Tile from '../../tile/Tile'

export default class StaticTilesGenerator implements TilesGenerator {
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
