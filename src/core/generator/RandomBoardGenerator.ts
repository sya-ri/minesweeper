import TilePosition from '../tile/TilePosition'
import BoardGenerator from './BoardGenerator'
import IBoard from '../board/IBoard'

const RandomBoardGenerator = (numberOfBomb: number) => {
  return (width: number, height: number, opened: TilePosition[], flags: TilePosition[]): IBoard => {
    const openedId = opened.map(({ x, y }) => x * height + y)
    const bombs = new Set<number>()
    while (bombs.size < numberOfBomb) {
      const x = Math.floor(Math.random() * width)
      const y = Math.floor(Math.random() * height)
      const id = x * height + y
      if (!openedId.includes(id)) {
        bombs.add(id)
      }
    }
    const generator = BoardGenerator(({ x, y }) => bombs.has(x * height + y))
    return generator(width, height, opened, flags)
  }
}

export default RandomBoardGenerator
