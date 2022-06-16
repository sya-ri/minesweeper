import TilePosition from './TilePosition'

export default interface ReadOnlyTile {
  readonly x: number

  readonly y: number

  readonly position: TilePosition

  readonly isBomb: boolean

  readonly isOpen: boolean

  readonly hasFlag: boolean
}
