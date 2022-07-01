import { TilePosition } from '../../Tile'

export default interface BombPlacer {
  init(blanks: TilePosition[]): void

  hasBomb(x: number, y: number): boolean
}
