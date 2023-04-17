import React from "react"
import { ModalView } from "../styles/ui.styles"
import { Modal } from "react-native"

export const AppModal = ({ children, opened, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={opened}
      onRequestClose={onClose}
    >
      <ModalView>{children}</ModalView>
    </Modal>
  )
}
