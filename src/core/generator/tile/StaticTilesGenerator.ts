import TilesGenerator from './TilesGenerator'
import Tile from '../../tile/Tile'

export default class StaticTilesGenerator implements TilesGenerator {
  private readonly tiles: Tile[][]

  public readonly isGenerated = true

  public readonly isLazy = false

  constructor(tiles: Tile[][]) {
    this.tiles = tiles
  }

  public generate(): Tile[][] {
    return this.tiles
  }
}
