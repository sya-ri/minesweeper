import Tile from '../../tile/Tile'
import TilePosition from '../../tile/TilePosition'

export default interface TilesGenerator {
  /**
   * Whether to generate a delay
   */
  readonly isLazy: boolean

  /**
   * Whether it has already generated
   */
  readonly isGenerated: boolean

  /**
   * Generate tiles for the board
   *
   * @param width Width of tiles
   * @param height Height of tiles
   * @param blanks Bomb-less tiles
   * @return Tile[][]
   */
  generate(width: number, height: number, blanks: TilePosition[]): Tile[][]
}
