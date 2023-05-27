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
import { createDirectory } from "../../../services/directories/directories.service"
import { DirectoriesContext } from "../../../services/directories/directoriesContext"
import { AuthContext } from "../../../services/auth/authContext"
import { ActivityIndicator } from "react-native-paper"

export const AddDirectoryModal = ({
  opened,
  onClose,
  onAdd,
  parentDirectoryId,
  mode,
}) => {
  const { onDirectoryAdd } = useContext(DirectoriesContext)
  const { token } = useContext(AuthContext)
  const [name, setName] = useState("")
  const [nameError, setNameError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const addDirHandler = async () => {
    setFormSubmitted(true)
    if (!name) setNameError("Directory name is required")
    else if (name.length < 3)
      setNameError("Directory name must be at least 3 characters long")
    else if (name.length > 100)
      setNameError("Directory name must be at most 100 characters long")
    else setNameError(null)
  }

  useEffect(() => {
    ;(async () => {
      if (isLoading) return
      setFormSubmitted(false)
      if (formSubmitted && !nameError) {
        setIsLoading(true)
        setError(null)
        const data = await createDirectory(token, name, parentDirectoryId)
        if (data.error) {
          setError(data.message)
          setIsLoading(false)
          return
        }
        onDirectoryAdd(data.data, mode)
        onAdd()
        setIsLoading(false)
        setName("")
      }
    })()
  }, [formSubmitted, nameError])

  const onModalClose = () => {
    setName("")
    setError(null)
    onClose()
  }

  return (
    <AppModal opened={opened} onClose={onClose}>
      <Text>Create new directory</Text>
      <HorizontalLine />
      <FormInput
        placeholder="Directory name"
        onChangeText={setName}
        value={name}
        label="Directory name"
      />
      {error && (
        <Spacer size="medium">
          <ErrorText>{error}</ErrorText>
        </Spacer>
      )}
      {nameError && (
        <Spacer size="medium">
          <ErrorText>{nameError}</ErrorText>
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
