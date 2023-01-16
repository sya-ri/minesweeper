import { TilePosition } from '../../Tile'

export default interface BombPlacer {
  init(candidates: TilePosition[]): void

  hasBomb(x: number, y: number): boolean
}
