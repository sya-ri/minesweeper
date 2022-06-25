import Board from '../board/Board'
import Tile from '../tile/Tile'

export const getTileByChar = (char: string, x: number, y: number): Tile => {
  switch (char) {
    case 'X':
      return new Tile(x, y, true)
    default:
      return new Tile(x, y, false)
  }
}

export const boardFromStrings = (line: string[]): Board => {
  const tiles = line.map((text, y) => {
    return [...text].map((char, x) => getTileByChar(char, x, y))
  })
  return new Board(tiles)
}

export const boardFromSize = (width: number, height: number): Board => {
  const tiles = Array.from({ length: height }, (_y, y) =>
    Array.from({ length: width }, (_x, x) => {
      return new Tile(x, y)
    })
  )
  return new Board(tiles)
}

it('should works', () => {
  expect(getTileByChar(' ', 1, 2)).toEqual(new Tile(1, 2, false))
  expect(getTileByChar('X', 3, 1)).toEqual(new Tile(3, 1, true))
  expect(
    boardFromStrings([
      ' X ', //
      '  X', //
      'X X' //
    ])
  ).toEqual(
    new Board([
      [new Tile(0, 0), new Tile(1, 0, true), new Tile(2, 0)],
      [new Tile(0, 1), new Tile(1, 1), new Tile(2, 1, true)],
      [new Tile(0, 2, true), new Tile(1, 2), new Tile(2, 2, true)]
    ])
  )
  expect(boardFromSize(3, 4)).toEqual(
    new Board([
      [new Tile(0, 0), new Tile(1, 0), new Tile(2, 0)],
      [new Tile(0, 1), new Tile(1, 1), new Tile(2, 1)],
      [new Tile(0, 2), new Tile(1, 2), new Tile(2, 2)],
      [new Tile(0, 3), new Tile(1, 3), new Tile(2, 3)]
    ])
  )
})
