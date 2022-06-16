import React, { FC, useState } from 'react'
import Board from './core/Board'
import OpenTileResult from './core/tile/OpenTileResult'
import Tile from './core/tile/Tile'

const tile = (x: number, y: number) => new Tile(x, y)
const bomb = (x: number, y: number) => new Tile(x, y, true)

const App: FC = () => {
  const [board, setBoard] = useState(
    new Board([
      [bomb(0, 0), bomb(1, 0), tile(2, 0), tile(3, 0), tile(4, 0)],
      [tile(0, 1), tile(1, 1), bomb(2, 1), bomb(3, 1), bomb(4, 1)],
      [tile(0, 2), bomb(1, 2), tile(2, 2), tile(3, 2), bomb(4, 2)],
      [bomb(0, 3), tile(1, 3), tile(2, 3), tile(3, 3), tile(4, 3)],
      [tile(0, 4), bomb(1, 4), tile(2, 4), tile(3, 4), tile(4, 4)]
    ])
  )
  return (
    <div>
      {board.tiles.map((tt) => (
        <div className="flex">
          {tt.map((t) => (
            <button
              type="button"
              className="w-8 h-8 border"
              onClick={() => {
                const result = board.openTile(t.x, t.y)
                if (result === OpenTileResult.GameOver) {
                  alert('Game Over') // eslint-disable-line no-alert
                  window.location.reload()
                }
                setBoard(new Board(board.tiles))
              }}
            >
              {t.isOpen ? board.countAroundBomb(t.x, t.y) : '-'}
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}

export default App
