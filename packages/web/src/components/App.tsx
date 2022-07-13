import React, { FC, useEffect, useState } from 'react'
import { Box, Button, Center, Flex, useDisclosure } from '@chakra-ui/react'
import { TilePosition } from 'minesweeper-core/dist/Tile'
import Solver from 'minesweeper-core/dist/solver/Solver'
import Board from 'minesweeper-core/dist/Board'
import RandomTilesGenerator from 'minesweeper-core/dist/generator/tile/RandomTilesGenerator'
import BoardView from './BoardView'
import GameOverModal from './GameOverModal'

const App: FC = () => {
  const generateTiles = () => new RandomTilesGenerator(30, 16, 99, true)
  const [board, setBoard] = useState(new Board(generateTiles()))
  const [isGameOver, setGameOver] = useState(false)
  const { isOpen: isOpenGameOverModal, onOpen: onOpenGameOverModal, onClose: onCloseGameOverModal } = useDisclosure()
  useEffect(() => {
    setGameOver(board.flatTiles.some((t) => t.isOpen && t.isBomb))
  }, [board])
  useEffect(() => {
    if (isGameOver) {
      onOpenGameOverModal()
    }
  }, [isGameOver, onOpenGameOverModal])
  const openTile = (tile: TilePosition) => {
    board.openTile(tile.x, tile.y)
    setBoard(board.clone())
  }
  const toggleFlag = (tile: TilePosition) => {
    board.toggleFlag(tile.x, tile.y)
    setBoard(board.clone())
  }
  return (
    <Box m={2}>
      <GameOverModal onClose={onCloseGameOverModal} isOpen={isOpenGameOverModal} />
      <Center overflow="auto">
        <BoardView board={board} openTile={openTile} toggleFlag={toggleFlag} isGameOver={isGameOver} />
      </Center>
      <Flex m={2} justify="center" gap={1}>
        <Button onClick={() => setBoard(new Board(generateTiles()))}>Regenerate</Button>
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
