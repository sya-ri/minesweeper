import TilePosition from '../tile/TilePosition'
import Tile from '../tile/Tile'
import Board from '../board/Board'
import IBoard from '../board/IBoard'

const BoardGenerator = (hasBomb: (position: TilePosition) => boolean) => {
  return (width: number, height: number, opened: TilePosition[], flags: TilePosition[]): IBoard => {
    const tiles = Array.from({ length: height }, (_y, y) =>
      Array.from({ length: width }, (_x, x) => {
        const tile = new Tile(x, y, hasBomb({ x, y }))
        if (flags.some((t) => t.x === x && t.y === y)) {
          tile.toggleFlag()
        }
        return tile
      })
    )
    const board = new Board(tiles)
    opened.forEach(({ x, y }) => board.openTile(x, y))
    return board
  }
}

export default BoardGenerator
