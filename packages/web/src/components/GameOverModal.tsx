import React, { FC } from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react'

export type GameOverModalProps = {
  onClose: () => void
  isOpen: boolean
}

const GameOverModal: FC<GameOverModalProps> = ({ onClose, isOpen }) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Game Over</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>:(</Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default GameOverModal
