import React, { useState, useContext } from "react"
import { AppModal } from "../../../ui/AppModal.component"
import { Text } from "react-native"
import { HorizontalLine } from "../../../styles/directories.styles"
import { Spacer } from "../../../components/Spacer.component"
import {
  AcceptButton,
  CancelButton,
  ModalActionsView,
} from "../../../styles/ui.styles"
import { ErrorText, FormInput } from "../../../styles/auth.styles"
import { createDirectory } from "../../../services/directories/directories.service"
import { DirectoriesContext } from "../../../services/directories/directoriesContext"
import { AuthContext } from "../../../services/auth/authContext"
import { ActivityIndicator } from "react-native-paper"

export const AddDirectoryModal = ({
  opened,
  onClose,
  onAdd,
  parentDirectoryId,
}) => {
  const { onDirectoryAdd } = useContext(DirectoriesContext)
  const { token } = useContext(AuthContext)
  const [newDirectoryName, setNewDirectoryName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const addDirHandler = async () => {
    setIsLoading(true)
    setError(null)
    const data = await createDirectory(
      token,
      newDirectoryName,
      parentDirectoryId
    )
    if (data.error) {
      setError(data.message)
      setIsLoading(false)
      return
    }
    onDirectoryAdd(data.data)
    onAdd()
    setIsLoading(false)
    setNewDirectoryName("")
  }

  const onModalClose = () => {
    setNewDirectoryName("")
    setError(null)
    onClose()
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
      {error && (
        <Spacer size="medium">
          <ErrorText>{error}</ErrorText>
        </Spacer>
      )}
      <Spacer size="large">
        <ModalActionsView>
          <CancelButton onPress={onModalClose} disabled={isLoading}>
            <Text>Cancel</Text>
          </CancelButton>
          <AcceptButton onPress={addDirHandler} disabled={isLoading}>
            <Text>Create</Text>
          </AcceptButton>
          {isLoading && <ActivityIndicator />}
        </ModalActionsView>
      </Spacer>
    </AppModal>
  )
}
