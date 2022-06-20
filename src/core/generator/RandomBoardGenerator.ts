import Board from '../board/Board'
import Tile from '../tile/Tile'

const RandomBoardGenerator = (width: number, height: number, numberOfBomb: number): Board => {
  const bombs = new Set<number>()
  while (bombs.size < numberOfBomb) {
    const x = Math.floor(Math.random() * width)
    const y = Math.floor(Math.random() * height)
    bombs.add(x * height + y)
  }
  const tiles: Tile[][] = []
  for (let y = 0; y < height; y += 1) {
    const tt: Tile[] = []
    for (let x = 0; x < width; x += 1) {
      tt.push(new Tile(x, y, bombs.has(x * height + y)))
    }
    tiles.push(tt)
  }
  return new Board(tiles)
}

export default RandomBoardGenerator
