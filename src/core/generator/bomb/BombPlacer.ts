import TilePosition from '../../tile/TilePosition'

export default interface BombPlacer {
  init(blanks: TilePosition[]): void

  hasBomb(x: number, y: number): boolean
}
