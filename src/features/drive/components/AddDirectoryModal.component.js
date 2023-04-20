import React, { useState } from "react"
import { AppModal } from "../../../ui/AppModal.component"
import { Text } from "react-native"
import { HorizontalLine } from "../../../styles/directories.styles"
import { Spacer } from "../../../components/Spacer.component"
import {
  AcceptButton,
  CancelButton,
  ModalActionsView,
} from "../../../styles/ui.styles"
import { FormInput } from "../../../styles/auth.styles"

export const AddDirectoryModal = ({ opened, onClose, onAdd }) => {
  const [newDirectoryName, setNewDirectoryName] = useState("")

  const addDirHandler = () => {
    onAdd(newDirectoryName)
    setNewDirectoryName("")
  }
  return (
    <AppModal opened={opened} onClose={onClose}>
      <Text>Create new directory</Text>
      <HorizontalLine />
      <FormInput
        placeholder="Directory name"
        onChangeText={setNewDirectoryName}
        value={newDirectoryName}
        label="Directory name"
      />
      <Spacer size="large">
        <ModalActionsView>
          <AcceptButton onPress={addDirHandler}>
            <Text>Create</Text>
          </AcceptButton>
          <CancelButton onPress={onClose}>
            <Text>Close</Text>
          </CancelButton>
        </ModalActionsView>
      </Spacer>
    </AppModal>
  )
}
