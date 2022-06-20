import TilePosition from '../tile/TilePosition'
import Tile from '../tile/Tile'
import Board from '../board/Board'
import IBoard from '../board/IBoard'

const BoardGenerator = (hasBomb: (position: TilePosition) => boolean) => {
  return (width: number, height: number, opened: TilePosition[], flags: TilePosition[]): IBoard => {
    const flagsId = flags.map(({ x, y }) => x * height + y)
    const tiles: Tile[][] = []
    for (let y = 0; y < height; y += 1) {
      const tt: Tile[] = []
      for (let x = 0; x < width; x += 1) {
        const id = x * height + y
        const t = new Tile(x, y, hasBomb({ x, y }))
        if (flagsId.includes(id)) {
          t.toggleFlag()
        }
        tt.push(t)
      }
      tiles.push(tt)
    }
    const board = new Board(tiles)
    opened.forEach(({ x, y }) => board.openTile(x, y))
    return board
  }
}

export default BoardGenerator
