import React, { FC } from 'react'
import { Button } from '@chakra-ui/react'
import Tile from '../core/Tile'

const getTileDisplay = (tile: Tile, countAroundBomb: () => number): { text: string; color: string } => {
  if (tile.isOpen) {
    if (tile.isBomb) {
      return { text: 'X', color: 'red.400' }
    }
    const bomb = countAroundBomb()
    const colors = [
      'white', // 0
      'blue.600', // 1
      'green.600', // 2
      'red.600', // 3
      'blue.800', // 4
      'red.800', // 5
      'cyan.600', // 6
      'black', // 7
      'gray.600' // 8
    ]
    return { text: bomb.toString(), color: colors[bomb] }
  }
  if (tile.hasFlag) {
    return { text: 'X', color: 'black' }
  }
  return { text: '-', color: 'black' }
}

export type TileButtonProps = {
  tile: Tile
  countAroundBomb: () => number
  openTile: () => void
  toggleFlag: () => void
}

const TileButton: FC<TileButtonProps> = ({ tile, countAroundBomb, openTile, toggleFlag }) => {
  const { text, color } = getTileDisplay(tile, countAroundBomb)
  return (
    <Button
      w={8}
      h={8}
      size="sm"
      flexShrink={0}
      color={color}
      variant="outline"
      rounded="none"
      transition="none"
      cursor={tile.isOpen ? 'default' : undefined}
      _hover={tile.isOpen ? {} : undefined}
      onClick={(event) => {
        if (event.shiftKey) {
          toggleFlag()
        } else {
          openTile()
        }
      }}
      onContextMenu={(event) => {
        event.preventDefault()
        toggleFlag()
      }}
    >
      {text}
    </Button>
  )
}

export default TileButton
