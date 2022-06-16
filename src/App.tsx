import React, { FC, useState } from 'react'
import OpenTileResult from './core/tile/OpenTileResult'
import generateBoard from './core/generateBoard'

const App: FC = () => {
  const [board, setBoard] = useState(() => generateBoard(30, 16, 99))
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
                setBoard(board.clone())
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
