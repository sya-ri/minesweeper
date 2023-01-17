import React, { FC, useEffect, useState } from 'react'
import RandomTilesGenerator from 'minesweeper-core/dist/generator/tile/RandomTilesGenerator'
import RandomWithSimplexNoiseTilesGenerator from 'minesweeper-core/dist/generator/tile/RandomWithSimplexNoiseTilesGenerator'
import Board from 'minesweeper-core/dist/Board'
import { Box, Button, Center, Flex, NumberInput, NumberInputField, useDisclosure } from '@chakra-ui/react'
import { TilePosition } from 'minesweeper-core/dist/Tile'
import Solver from 'minesweeper-core/dist/solver/Solver'
import BombSwapper from 'minesweeper-core/dist/swapper/BombSwapper'
import GameOverModal from './GameOverModal'
import BoardView from './BoardView'

const PlayApp: FC = () => {
  const [width, setWidth] = useState(30)
  const [height, setHeight] = useState(16)
  const [bomb, setBomb] = useState(99)
  const [step, setStep] = useState(0.1)
  const [candidate, setCandidate] = useState(0.7)
  const generateTiles = () => {
    if (step === 0 || candidate === 0) {
      return new RandomTilesGenerator(width, height, bomb, true)
    }
    return new RandomWithSimplexNoiseTilesGenerator(width, height, bomb, step, candidate, true)
  }
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
        <NumberInput defaultValue={width} onChange={(_value, value) => setWidth(value)}>
          <NumberInputField placeholder="Width" />
        </NumberInput>
        <NumberInput defaultValue={height} onChange={(_value, value) => setHeight(value)}>
          <NumberInputField placeholder="Height" />
        </NumberInput>
        <NumberInput defaultValue={bomb} onChange={(_value, value) => setBomb(value)}>
          <NumberInputField placeholder="Bomb" />
        </NumberInput>
        <NumberInput defaultValue={step} onChange={(_value, value) => setStep(value)}>
          <NumberInputField placeholder="Simplex Noise Step" />
        </NumberInput>
        <NumberInput defaultValue={candidate} onChange={(_value, value) => setCandidate(value)}>
          <NumberInputField placeholder="Simplex Noise Candidates" />
        </NumberInput>
      </Flex>
      <Flex m={2} justify="center" gap={1}>
        <Button onClick={() => setBoard(new Board(generateTiles()))}>Regenerate</Button>
        <Button
          onClick={() => {
            if (!board.isGenerated) {
              board.openTile(Math.floor(board.width / 2), Math.floor(board.height / 2))
            }
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
        <Button
          onClick={() => {
            const swapper = new BombSwapper(board)
            swapper.swap()
            setBoard(board.clone())
          }}
        >
          Swap
        </Button>
      </Flex>
    </Box>
  )
}

export default PlayApp
