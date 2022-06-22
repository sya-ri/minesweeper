import TilePosition from '../tile/TilePosition'
import Tile from '../tile/Tile'
import Board from '../board/Board'
import IBoard from '../board/IBoard'

const BoardGenerator = (hasBomb: (position: TilePosition) => boolean) => {
  return (width: number, height: number, opened: TilePosition[], flags: TilePosition[]): IBoard => {
    const tiles: Tile[][] = []
    for (let y = 0; y < height; y += 1) {
      const tt: Tile[] = []
      for (let x = 0; x < width; x += 1) {
        const tile = new Tile(x, y, hasBomb({ x, y }))
        if (flags.some((t) => t.x === x && t.y === y)) {
          tile.toggleFlag()
        }
        tt.push(tile)
      }
      tiles.push(tt)
    }
    const board = new Board(tiles)
    opened.forEach(({ x, y }) => board.openTile(x, y))
    return board
  }
}

export default BoardGenerator
