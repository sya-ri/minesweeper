import Board from '../board/Board'
import Tile from '../tile/Tile'
import TilePosition from '../tile/TilePosition'

const RandomBoardGenerator = (numberOfBomb: number) => {
  return (width: number, height: number, opened: TilePosition[], flags: TilePosition[]): Board => {
    const openedId = opened.map(({ x, y }) => x * height + y)
    const flagsId = flags.map(({ x, y }) => x * height + y)
    const bombs = new Set<number>()
    while (bombs.size < numberOfBomb) {
      const x = Math.floor(Math.random() * width)
      const y = Math.floor(Math.random() * height)
      const id = x * height + y
      if (!openedId.includes(id)) {
        bombs.add(id)
      }
    }
    const tiles: Tile[][] = []
    for (let y = 0; y < height; y += 1) {
      const tt: Tile[] = []
      for (let x = 0; x < width; x += 1) {
        const id = x * height + y
        const t = new Tile(x, y, bombs.has(id))
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

export default RandomBoardGenerator
