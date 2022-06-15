import Board from '../Board'
import Tile from '../tile/Tile'

const tile = (id: number) => new Tile(id)
const bomb = (id: number) => new Tile(id, true)

it('should get the tile', () => {
  expect(new Board([[tile(1), tile(2)]]).getTile(1, 0)).toEqual(tile(2))
})

it('should determine whether inside of the board', () => {
  const board2x2 = new Board([
    [tile(0), tile(1)],
    [tile(2), tile(3)]
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
    [tile(0), tile(1), tile(2)],
    [tile(3), tile(4), tile(5)],
    [tile(6), tile(7), tile(8)]
  ])
  expect(board3x3.getAroundTiles(0, 0).map((t) => t.id)).toEqual(expect.arrayContaining([1, 3, 4]))
  expect(board3x3.getAroundTiles(0, 1).map((t) => t.id)).toEqual(expect.arrayContaining([0, 1, 4, 6, 7]))
  expect(board3x3.getAroundTiles(1, 1).map((t) => t.id)).toEqual(expect.arrayContaining([0, 1, 2, 3, 5, 6, 7, 8]))
})

it('should get empty around, for the blank tiles', () => {
  expect(new Board([]).getAroundTiles(0, 0)).toEqual([])
})

it('should count the bombs', () => {
  const board3x3 = new Board([
    [tile(0), bomb(1), bomb(2)],
    [bomb(3), tile(4), tile(5)],
    [bomb(6), tile(7), tile(8)]
  ])
  expect(board3x3.countAroundBomb(0, 0)).toEqual(2)
  expect(board3x3.countAroundBomb(1, 1)).toEqual(4)
  expect(board3x3.countAroundBomb(2, 2)).toEqual(0)
})

it('should open the tile', () => {
  const board = new Board([[tile(0)]])
  expect(board.openTile(0, 0)).toEqual(true)
  expect(board.openTile(0, 0)).toEqual(false)
})

it('should open surrounding tiles if there are no bombs around', () => {
  const tiles = [
    [tile(0), tile(1), tile(2)],
    [tile(3), tile(4), bomb(5)],
    [tile(6), bomb(7), tile(8)]
  ]
  expect(new Board(tiles).openTile(0, 0)).toEqual(true)
  expect(tiles.flatMap((tt) => tt.filter((t) => t.isOpen)).map((t) => t.id)).toEqual(
    expect.arrayContaining([0, 1, 3, 4])
  )
})
