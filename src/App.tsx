import React, { FC, useState } from 'react'
import OpenTileResult from './core/tile/OpenTileResult'
import Solver from './core/solver/Solver'
import Board from './core/board/Board'
import RandomTilesGenerator from './core/generator/tile/RandomTilesGenerator'

const getColor = (bomb: number): string => {
  switch (bomb) {
    case 0:
      return 'text-white'
    case 1:
      return 'text-blue-600'
    case 2:
      return 'text-green-600'
    case 3:
      return 'text-red-600'
    case 4:
      return 'text-blue-800'
    case 5:
      return 'text-red-800'
    case 6:
      return 'text-cyan-600'
    case 7:
      return 'text-black'
    case 8:
      return 'text-gray-600'
    default:
      return ''
  }
}

const App: FC = () => {
  const [board, setBoard] = useState<Board>(new Board(30, 16, new RandomTilesGenerator(99, true)))
  return (
    <div className="mt-2">
      {board.tiles.map((tt) => (
        <div className="flex justify-center">
          {tt.map((t) => {
            let text: string
            let color: string = 'text-black'
            if (t.isOpen) {
              if (t.isBomb) {
                text = 'X'
                color = 'bg-red-400'
              } else {
                const bomb = board.countAroundBomb(t.x, t.y)
                text = bomb.toString()
                color = getColor(bomb)
              }
            } else if (t.hasFlag) {
              text = 'X'
            } else {
              text = '-'
            }
            return (
              <button
                type="button"
                className={`w-8 h-8 shrink-0 border ${color}`}
                onClick={(event) => {
                  if (event.shiftKey) {
                    board.toggleFlag(t.x, t.y)
                  } else {
                    const result = board.openTile(t.x, t.y)
                    if (result === OpenTileResult.GameOver) {
                      alert('Game Over') // eslint-disable-line no-alert
                      window.location.reload()
                    }
                  }
                  setBoard(board.clone())
                }}
                onContextMenu={(event) => {
                  event.preventDefault()
                  board.toggleFlag(t.x, t.y)
                  setBoard(board.clone())
                }}
              >
                {text}
              </button>
            )
          })}
        </div>
      ))}
      <div className="m-2 flex justify-center gap-2">
        <button
          type="button"
          className="p-1 border border-black hover:bg-gray-200"
          onClick={() => {
            board.flatTiles.forEach((t) => {
              if (t.isBomb) {
                if (!t.hasFlag) t.toggleFlag()
              } else {
                t.open()
              }
            })
            setBoard(board.clone())
          }}
        >
          Show Board
        </button>
        <button
          type="button"
          className="p-1 border border-black hover:bg-gray-200"
          onClick={() => {
            const solver = new Solver(board)
            solver.solve()
            setBoard(board.clone())
          }}
        >
          Solve
        </button>
      </div>
    </div>
  )
}

export default App
