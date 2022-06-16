import React, { FC, useState } from 'react'
import OpenTileResult from './core/tile/OpenTileResult'
import generateBoard from './core/generateBoard'

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
  const [board, setBoard] = useState(() => generateBoard(30, 16, 99))
  return (
    <div>
      {board.tiles.map((tt) => (
        <div className="flex">
          {tt.map((t) => {
            let text
            let color
            if (t.isOpen) {
              const bomb = board.countAroundBomb(t.x, t.y)
              text = bomb.toString()
              color = getColor(bomb)
            } else {
              text = '-'
            }
            return (
              <button
                type="button"
                className={`w-8 h-8 border ${color}`}
                onClick={() => {
                  const result = board.openTile(t.x, t.y)
                  if (result === OpenTileResult.GameOver) {
                    alert('Game Over') // eslint-disable-line no-alert
                    window.location.reload()
                  }
                  setBoard(board.clone())
                }}
              >
                {text}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default App
