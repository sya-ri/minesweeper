import React, { FC } from 'react'
import Board from 'minesweeper-core/dist/Board'
import { Box, Flex } from '@chakra-ui/react'
import RandomWithSimplexNoiseBombPlacer from 'minesweeper-core/dist/generator/bomb/RandomWithSimplexNoiseBombPlacer'

export type NoiseViewProps = {
  board: Board
}

const NoiseView: FC<NoiseViewProps> = ({ board }) => {
  const { bombPlacer } = board.tilesGenerator
  if (bombPlacer instanceof RandomWithSimplexNoiseBombPlacer) {
    return (
      <Box maxW="full">
        {board.tiles.map((tt) => (
          <Flex>
            {tt.map(({ x, y }) => (
              <Box w={8} h={8} bg={`hsl(0, 0%, ${(100 * bombPlacer.noise(x, y) + 1) / 2.0}%)`} flexShrink={0} />
            ))}
          </Flex>
        ))}
      </Box>
    )
  }
  return <Box>null</Box>
}

export default NoiseView
