import Tile, { TilePosition } from '../../Tile'
import BombPlacer from '../bomb/BombPlacer'

export default interface TilesGenerator {
  readonly bombPlacer: BombPlacer

  /**
   * Width of tiles
   */
  readonly width: number

  /**
   * Height of tiles
   */
  readonly height: number

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
   * @param blanks Bomb-less tiles
   * @return Tile[][]
   */
  generate(blanks: TilePosition[]): Tile[][]
}
