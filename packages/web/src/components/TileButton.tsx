import React, { FC } from 'react'
import { Button } from '@chakra-ui/react'
import Tile from '../core/tile/Tile'

const getColor = (bomb: number) => {
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

const getTileDisplay = (tile: Tile, countAroundBomb: () => number): { text: string; color: string } => {
  if (tile.isOpen) {
    if (tile.isBomb) {
      return { text: 'X', color: 'red.400' }
    }
    const bomb = countAroundBomb()
    return { text: bomb.toString(), color: getColor(bomb) }
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
      w={10}
      h={10}
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
