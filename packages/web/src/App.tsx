import React, { FC, useState } from 'react'
import { Box, Button, Flex } from '@chakra-ui/react'
import OpenTileResult from './core/tile/OpenTileResult'
import Solver from './core/solver/Solver'
import Board from './core/board/Board'
import RandomTilesGenerator from './core/generator/tile/RandomTilesGenerator'
import TileButton from './components/TileButton'

const App: FC = () => {
  const [board, setBoard] = useState<Board>(new Board(new RandomTilesGenerator(30, 16, 99, true)))
  return (
    <Box mt={2}>
      {board.tiles.map((tt) => (
        <Flex justify="center">
          {tt.map((tile) => (
            <TileButton
              tile={tile}
              countAroundBomb={() => board.countAroundBomb(tile.x, tile.y)}
              openTile={() => {
                const result = board.openTile(tile.x, tile.y)
                if (result === OpenTileResult.GameOver) {
                  alert('Game Over') // eslint-disable-line no-alert
                  window.location.reload()
                }
                setBoard(board.clone())
              }}
              toggleFlag={() => {
                board.toggleFlag(tile.x, tile.y)
                setBoard(board.clone())
              }}
            />
          ))}
        </Flex>
      ))}
      <Flex m={2} justify="center" gap={1}>
        <Button
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
        </Button>
        <Button
          onClick={() => {
            const solver = new Solver(board)
            solver.solve()
            setBoard(board.clone())
          }}
        >
          Solve
        </Button>
      </Flex>
    </Box>
  )
}

export default App
