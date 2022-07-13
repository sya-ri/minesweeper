import React, { FC } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { OpenTileResult, TilePosition } from 'minesweeper-core/dist/Tile'
import Board from 'minesweeper-core/dist/Board'
import TileButton from './TileButton'

export type BoardViewProps = {
  board: Board
  openTile: (tile: TilePosition) => void
  toggleFlag: (tile: TilePosition) => void
  isGameOver: boolean
}

const BoardView: FC<BoardViewProps> = ({ board, openTile, toggleFlag, isGameOver }) => {
  return (
    <Box maxW="full">
      {board.tiles.map((tt) => (
        <Flex>
          {tt.map((tile) => (
            <TileButton
              tile={tile}
              countAroundBomb={() => board.countAroundBomb(tile.x, tile.y)}
              openTile={() => openTile(tile.position)}
              toggleFlag={() => toggleFlag(tile.position)}
              isGameOver={isGameOver}
            />
          ))}
        </Flex>
      ))}
    </Box>
  )
}

export default BoardView
