import React from "react"
import { AppModal } from "../../../ui/AppModal.component"
import { Text } from "react-native"
import { HorizontalLine } from "../../../styles/directories.styles"
import { Spacer } from "../../../components/Spacer.component"
import {
  AcceptButton,
  CancelButton,
  ModalActionsView,
} from "../../../styles/ui.styles"

export const DeleteContentModal = ({ opened, onClose, onDelete }) => {
  return (
    <AppModal opened={opened} onClose={onClose}>
      <Text>Are you sure you want to delete content?</Text>
      <HorizontalLine />
      <Spacer size="large">
        <ModalActionsView>
          <AcceptButton onPress={onClose}>
            <Text>Cancel</Text>
          </AcceptButton>
          <CancelButton onPress={onDelete}>
            <Text>Delete</Text>
          </CancelButton>
        </ModalActionsView>
      </Spacer>
    </AppModal>
  )
}
