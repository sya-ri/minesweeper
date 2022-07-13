import React, { FC, useState } from 'react'
import { Box, Button, Center, Flex } from '@chakra-ui/react'
import { OpenTileResult, TilePosition } from 'minesweeper-core/dist/Tile'
import Solver from 'minesweeper-core/dist/solver/Solver'
import Board from 'minesweeper-core/dist/Board'
import RandomTilesGenerator from 'minesweeper-core/dist/generator/tile/RandomTilesGenerator'
import BoardView from './BoardView'

const App: FC = () => {
  const [board, setBoard] = useState<Board>(new Board(new RandomTilesGenerator(30, 16, 99, true)))
  const openTile = (tile: TilePosition) => {
    const result = board.openTile(tile.x, tile.y)
    if (result === OpenTileResult.GameOver) {
      alert('Game Over') // eslint-disable-line no-alert
      window.location.reload()
    }
    setBoard(board.clone())
  }
  const toggleFlag = (tile: TilePosition) => {
    board.toggleFlag(tile.x, tile.y)
    setBoard(board.clone())
  }
  return (
    <Box m={2}>
      <Center overflow="auto">
        <BoardView board={board} openTile={openTile} toggleFlag={toggleFlag} />
      </Center>
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
