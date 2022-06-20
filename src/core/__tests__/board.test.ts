import Board from '../board/Board'
import Tile from '../tile/Tile'
import OpenTileResult from '../tile/OpenTileResult'

const tile = (x: number, y: number) => new Tile(x, y)
const bomb = (x: number, y: number) => new Tile(x, y, true)

it('should get the tile', () => {
  expect(new Board([[tile(0, 0), tile(1, 0)]]).getTile(1, 0)).toEqual(tile(1, 0))
})

it('should determine whether inside of the board', () => {
  const board2x2 = new Board([
    [tile(0, 0), tile(1, 0)],
    [tile(0, 1), tile(1, 1)]
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
    [tile(0, 0), tile(1, 0), tile(2, 0)],
    [tile(0, 1), tile(1, 1), tile(2, 1)],
    [tile(0, 2), tile(1, 2), tile(2, 2)]
  ])
  expect(board3x3.getAroundTiles(0, 0).map((t) => t.position)).toEqual(
    expect.arrayContaining([
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 }
    ])
  )
  expect(board3x3.getAroundTiles(0, 1).map((t) => t.position)).toEqual(
    expect.arrayContaining([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 2 },
      { x: 1, y: 2 }
    ])
  )
  expect(board3x3.getAroundTiles(1, 1).map((t) => t.position)).toEqual(
    expect.arrayContaining([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: 1 },
      { x: 2, y: 1 },
      { x: 0, y: 2 },
      { x: 1, y: 2 },
      { x: 2, y: 2 }
    ])
  )
})

it('should get empty around, for the blank tiles', () => {
  expect(new Board([]).getAroundTiles(0, 0)).toEqual([])
})

it('should count the bombs', () => {
  const board3x3 = new Board([
    [tile(0, 0), bomb(1, 0), bomb(2, 0)],
    [bomb(0, 1), tile(1, 1), tile(2, 1)],
    [bomb(0, 2), tile(1, 2), tile(2, 2)]
  ])
  expect(board3x3.countAroundBomb(0, 0)).toEqual(2)
  expect(board3x3.countAroundBomb(1, 1)).toEqual(4)
  expect(board3x3.countAroundBomb(2, 2)).toEqual(0)
})

it('should open the tile', () => {
  const board = new Board([[tile(0, 0), bomb(1, 0)]])
  expect(board.openTile(0, 0)).toEqual(OpenTileResult.Success)
  expect(board.openTile(0, 0)).toEqual(OpenTileResult.Failure)
  expect(board.openTile(1, 0)).toEqual(OpenTileResult.GameOver)
})

it('should open surrounding tiles if there are no bombs around', () => {
  const board = new Board([
    [tile(0, 0), tile(1, 0), tile(2, 0)],
    [tile(0, 1), tile(1, 1), bomb(2, 1)],
    [tile(0, 2), bomb(1, 2), tile(2, 2)]
  ])
  expect(board.openTile(0, 0)).toEqual(OpenTileResult.Success)
  expect(board.tiles.flatMap((tt) => tt.filter((t) => t.isOpen)).map((t) => t.position)).toEqual(
    expect.arrayContaining([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 }
    ])
  )
})
