import React from "react"
import { Modal } from "react-native"
import { InnerModalView, ModalView } from "../styles/ui.styles"

export const AppModal = ({ children, opened, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={opened}
      onRequestClose={onClose}
    >
      <ModalView>
        <InnerModalView>{children}</InnerModalView>
      </ModalView>
    </Modal>
  )
}
