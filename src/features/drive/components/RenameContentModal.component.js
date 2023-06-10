import React, { useState, useContext, useEffect } from "react"
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
import { renameContent } from "../../../services/directories/directories.service"
import { DirectoriesContext } from "../../../services/directories/directoriesContext"
import { AuthContext } from "../../../services/auth/authContext"
import { ActivityIndicator } from "react-native-paper"
import { ContentType } from "../../../utils/contentType"

export const RenameContentModal = ({
  content,
  opened,
  onClose,
  parentDirectoryId,
  onRename,
  mode,
}) => {
  const { onContentRename, directories, files } = useContext(DirectoriesContext)
  const { token } = useContext(AuthContext)
  const [newName, setNewName] = useState("")
  const [newNameError, setNewNameError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formSubmitted, setFormSubmitted] = useState(false)

  let name = ""
  if (content?.type === ContentType.DIRECTORY) {
    const dir = directories?.find((dir) => dir?.id === content?.id)
    name = dir?.name
  } else {
    const file = files?.find((file) => file?.id === content?.id)
    name = file?.name
  }

  useEffect(() => {
    setNewName(name)
  }, [name])

  const renameHandler = async () => {
    if (name === newName) {
      onRename()
      return
    }

    setFormSubmitted(true)
    if (!newName) setNewNameError("Content name is required")
    else if (newName.length < 3)
      setNewNameError("Content name must be at least 3 characters long")
    else if (newName.length > 100)
      setNewNameError("Content name must be at most 100 characters long")
    else setNewNameError(null)
  }

  const onModalClose = () => {
    setNewName("")
    setError(null)
    onClose()
  }

  useEffect(() => {
    ;(async () => {
      if (isLoading) return
      setFormSubmitted(false)
      if (formSubmitted && !newNameError) {
        setIsLoading(true)
        setError(null)
        const data = await renameContent(
          token,
          content,
          newName,
          parentDirectoryId
        )
        if (data.error) {
          setError(data.message)
          setIsLoading(false)
          return
        }
        onContentRename(content, data.name, mode)
        setIsLoading(false)
        setNewName("")
        onRename()
      }
    })()
  }, [formSubmitted, newNameError])

  return (
    <AppModal opened={opened} onClose={onClose}>
      <Text>Rename</Text>
      <HorizontalLine />
      <FormInput
        placeholder="Content name"
        onChangeText={setNewName}
        value={newName}
        label="Content name"
      />
      {error && (
        <Spacer size="medium">
          <ErrorText>{error}</ErrorText>
        </Spacer>
      )}
      {newNameError && (
        <Spacer size="medium">
          <ErrorText>{newNameError}</ErrorText>
        </Spacer>
      )}
      <Spacer size="large">
        <ModalActionsView>
          <CancelButton onPress={onModalClose} disabled={isLoading}>
            <Text>Cancel</Text>
          </CancelButton>
          <AcceptButton onPress={renameHandler} disabled={isLoading}>
            <Text>Rename</Text>
          </AcceptButton>
          {isLoading && <ActivityIndicator />}
        </ModalActionsView>
      </Spacer>
    </AppModal>
  )
}
