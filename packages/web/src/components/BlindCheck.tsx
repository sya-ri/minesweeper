import React, { FC, useEffect, useState } from 'react'
import RandomTilesGenerator from 'minesweeper-core/dist/generator/tile/RandomTilesGenerator'
import RandomWithSimplexNoiseTilesGenerator from 'minesweeper-core/dist/generator/tile/RandomWithSimplexNoiseTilesGenerator'
import Board from 'minesweeper-core/dist/Board'
import { Box, Button, Center, Flex, Text, useDisclosure } from '@chakra-ui/react'
import { TilePosition } from 'minesweeper-core/dist/Tile'
import GameOverModal from './GameOverModal'
import BoardView from './BoardView'

const BlindCheck: FC = () => {
  const blankList = [0, 100, 150, 200]
  const randomBlanks = () => blankList[Math.floor(Math.random() * blankList.length)]
  const [blanks, setBlanks] = useState(randomBlanks())
  const generateTiles = () => {
    if (blanks === 0) {
      return new RandomTilesGenerator(30, 16, 99, true)
    }
    return new RandomWithSimplexNoiseTilesGenerator(30, 16, 99, 0.1, blanks, true)
  }
  const [beginTime, setBeginTime] = useState<Date | null>(null)
  const [endTime, setEndTime] = useState<Date | null>(null)
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
    if (beginTime == null) setBeginTime(new Date())
    board.openTile(tile.x, tile.y)
    setBoard(board.clone())
  }
  const toggleFlag = (tile: TilePosition) => {
    board.toggleFlag(tile.x, tile.y)
    setBoard(board.clone())
  }
  return (
    <Box m={2}>
      <GameOverModal
        onClose={() => {
          onCloseGameOverModal()
          setEndTime(new Date())
        }}
        isOpen={isOpenGameOverModal}
      />
      <Center overflow="auto">
        <BoardView board={board} openTile={openTile} toggleFlag={toggleFlag} isGameOver={isGameOver} />
      </Center>
      <Flex m={2} justify="center" gap={1}>
        <Button
          onClick={() => {
            setBlanks(randomBlanks())
            setBeginTime(null)
            setEndTime(null)
            setBoard(new Board(generateTiles()))
          }}
        >
          Restart
        </Button>
      </Flex>
      {beginTime != null && endTime != null && (
        <Center>
          <Text>
            Tiles: {board.flatTiles.filter((t) => t.isOpen).length}
            <br />
            Time: {Math.floor(endTime.getTime() / 1000 - beginTime.getTime() / 1000)}
            <br />
            Blanks: {blanks}
          </Text>
        </Center>
      )}
    </Box>
  )
}

export default BlindCheck
