import Board from '../Board'
import Tile from '../tile/Tile'

it('should get the tile', () => {
  expect(new Board([[new Tile(1), new Tile(2)]]).getTile(1, 0)).toEqual(new Tile(2))
})

it('should determine whether inside of the board', () => {
  const board2x2 = new Board([
    [new Tile(0), new Tile(1)],
    [new Tile(2), new Tile(3)]
  ])
  expect(new Board([]).isInside(0, 0)).toEqual(false)
  expect(board2x2.isInside(0, 0)).toEqual(true)
  expect(board2x2.isInside(0, 1)).toEqual(true)
  expect(board2x2.isInside(1, 0)).toEqual(true)
  expect(board2x2.isInside(1, 1)).toEqual(true)
  expect(board2x2.isInside(0, -1)).toEqual(false)
  expect(board2x2.isInside(-1, 0)).toEqual(false)
  expect(board2x2.isInside(-1, -1)).toEqual(false)
  expect(board2x2.isInside(0, 2)).toEqual(false)
  expect(board2x2.isInside(2, 0)).toEqual(false)
  expect(board2x2.isInside(2, 2)).toEqual(false)
})

it('should get the around tiles', () => {
  const board3x3 = new Board([
    [new Tile(0), new Tile(1), new Tile(2)],
    [new Tile(3), new Tile(4), new Tile(5)],
    [new Tile(6), new Tile(7), new Tile(8)]
  ])
  expect(board3x3.getAroundTiles(0, 0)).toEqual(expect.arrayContaining([new Tile(1), new Tile(3), new Tile(4)]))
})

it('should get empty around, for the blank tiles', () => {
  expect(new Board([]).getAroundTiles(0, 0)).toEqual([])
})
