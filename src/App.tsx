import React, { FC, useState } from 'react'
import { Box, Button, Flex } from '@chakra-ui/react'
import { Token } from '@chakra-ui/styled-system/dist/declarations/src/utils'
import * as CSS from 'csstype'
import OpenTileResult from './core/tile/OpenTileResult'
import Solver from './core/solver/Solver'
import Board from './core/board/Board'
import RandomTilesGenerator from './core/generator/tile/RandomTilesGenerator'

const getColor = (bomb: number): Token<CSS.Property.Color, 'colors'> => {
  switch (bomb) {
    case 0:
      return 'white'
    case 1:
      return 'blue.600'
    case 2:
      return 'green.600'
    case 3:
      return 'red.600'
    case 4:
      return 'blue.800'
    case 5:
      return 'red.800'
    case 6:
      return 'cyan.600'
    case 7:
      return 'black'
    case 8:
      return 'gray.600'
    default:
      return ''
  }
}

const App: FC = () => {
  const [board, setBoard] = useState<Board>(new Board(30, 16, new RandomTilesGenerator(30, 16, 99, true)))
  return (
    <Box mt={2}>
      {board.tiles.map((tt) => (
        <Flex justify="center">
          {tt.map((t) => {
            let text: string
            let color: Token<CSS.Property.Color, 'colors'> = 'black'
            if (t.isOpen) {
              if (t.isBomb) {
                text = 'X'
                color = 'red.400'
              } else {
                const bomb = board.countAroundBomb(t.x, t.y)
                text = bomb.toString()
                color = getColor(bomb)
              }
            } else if (t.hasFlag) {
              text = 'X'
            } else {
              text = '-'
            }
            return (
              <Button
                w={10}
                h={10}
                flexShrink={0}
                color={color}
                variant="outline"
                rounded="none"
                transition="none"
                cursor={t.isOpen ? 'default' : undefined}
                _hover={t.isOpen ? {} : undefined}
                onClick={(event) => {
                  if (event.shiftKey) {
                    board.toggleFlag(t.x, t.y)
                  } else {
                    const result = board.openTile(t.x, t.y)
                    if (result === OpenTileResult.GameOver) {
                      alert('Game Over') // eslint-disable-line no-alert
                      window.location.reload()
                    }
                  }
                  setBoard(board.clone())
                }}
                onContextMenu={(event) => {
                  event.preventDefault()
                  board.toggleFlag(t.x, t.y)
                  setBoard(board.clone())
                }}
              >
                {text}
              </Button>
            )
          })}
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
