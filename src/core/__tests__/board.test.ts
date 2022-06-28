import OpenTileResult from '../tile/OpenTileResult'
import { boardFromSize, boardFromStrings } from './utils'

it('should get the tile', () => {
  expect(boardFromSize(2, 1).getTile(1, 0).position).toEqual({ x: 1, y: 0 })
})

it('should determine whether inside of the board', () => {
  const board2x2 = boardFromSize(2, 2)
  expect(boardFromSize(0, 0).isInside(0, 0)).toEqual(false)
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
  const board3x3 = boardFromSize(3, 3)
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
  expect(boardFromSize(0, 0).getAroundTiles(0, 0)).toEqual([])
})

it('should count the bombs', () => {
  const board3x3 = boardFromStrings([
    ' XX', //
    'X  ', //
    'X  ' //
  ])
  expect(board3x3.countAroundBomb(0, 0)).toEqual(2)
  expect(board3x3.countAroundBomb(1, 1)).toEqual(4)
  expect(board3x3.countAroundBomb(2, 2)).toEqual(0)
})

it('should open the tile', () => {
  const board = boardFromStrings([' X'])
  expect(board.openTile(0, 0)).toEqual(OpenTileResult.Success)
  expect(board.openTile(0, 0)).toEqual(OpenTileResult.Failure)
  expect(board.openTile(1, 0)).toEqual(OpenTileResult.GameOver)
})

it('should open surrounding tiles if there are no bombs around', () => {
  const board = boardFromStrings([
    '   ', //
    '  X', //
    ' X ' //
  ])
  expect(board.openTile(0, 0)).toEqual(OpenTileResult.Success)
  expect(board.flatTiles.filter((t) => t.isOpen).map((t) => t.position)).toEqual(
    expect.arrayContaining([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 }
    ])
  )
})
