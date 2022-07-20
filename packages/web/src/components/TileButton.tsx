import React, { FC } from 'react'
import { Button } from '@chakra-ui/react'
import Tile from 'minesweeper-core/dist/Tile'

const getTileDisplay = (tile: Tile, countAroundBomb: () => number): { text: string; color: string; bg: string } => {
  if (tile.isOpen) {
    if (tile.isBomb) {
      return { text: '●', color: 'black', bg: 'red.400' }
    }
    const bomb = countAroundBomb()
    const colors = [
      'gray.100', // 0
      'blue.600', // 1
      'green.600', // 2
      'red.600', // 3
      'blue.800', // 4
      'red.800', // 5
      'cyan.600', // 6
      'black', // 7
      'gray.600' // 8
    ]
    return { text: bomb.toString(), color: colors[bomb], bg: 'gray.100' }
  }
  if (tile.hasFlag) {
    return { text: '▶︎', color: 'red', bg: 'gray.200' }
  }
  return { text: '-', color: 'black', bg: 'gray.200' }
}

export type TileButtonProps = {
  tile: Tile
  countAroundBomb: () => number
  openTile: () => void
  toggleFlag: () => void
  isGameOver: boolean
}

const TileButton: FC<TileButtonProps> = ({ tile, countAroundBomb, openTile, toggleFlag, isGameOver }) => {
  const { text, color, bg } = getTileDisplay(tile, countAroundBomb)
  return (
    <Button
      w={8}
      h={8}
      size="sm"
      fontWeight="black"
      flexShrink={0}
      color={color}
      bg={bg}
      borderColor="gray.300"
      variant="outline"
      rounded="none"
      transition="none"
      cursor={tile.isOpen || isGameOver ? 'default' : undefined}
      _hover={tile.isOpen || isGameOver ? {} : undefined}
      _active={tile.isOpen || isGameOver ? {} : undefined}
      onClick={(event) => {
        if (isGameOver) return
        if (event.shiftKey) {
          toggleFlag()
        } else {
          openTile()
        }
      }}
      onContextMenu={(event) => {
        if (isGameOver) return
        event.preventDefault()
        toggleFlag()
      }}
    >
      {text}
    </Button>
  )
}

export default TileButton
