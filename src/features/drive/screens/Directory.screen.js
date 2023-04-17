import React, { useContext, useEffect, useState } from "react"
import { DirectoriesContext } from "../../../services/directories/directoriesContext"
import { AuthContext } from "../../../services/auth/authContext"
import { FlatList, BackHandler, Text } from "react-native"
import { Directory } from "../../../components/Directory.component"
import {
  getDirectories,
  createDirectory,
} from "../../../services/directories/directories.service"
import { ActivityIndicator } from "react-native-paper"
import { FloatingMenu } from "../components/FloatingMenu.component"
import { AppModal } from "../../../ui/AppModal.component"
import { HorizontalLine } from "../../../styles/directories.styles"
import { FormInput } from "../../../styles/auth.styles"
import { Spacer } from "../../../components/Spacer.component"
import {
  AcceptButton,
  CancelButton,
  ModalActionsView,
} from "../../../styles/ui.styles"

export const DirectoryScreen = ({ route, navigation }) => {
  const { directories, onDirectoriesLoad, clearDirectories, onDirectoryAdd } =
    useContext(DirectoriesContext)
  const { token } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [directoryList, setDirectoryList] = useState([])
  const directoryId = route?.params?.directoryId || null
  const directoriesLength = directories.length

  const [newDirectoryName, setNewDirectoryName] = useState("")

  const [newDirModalOpened, setNewDirModalOpened] = useState(false)

  useEffect(() => {
    clearDirectories()
    setIsLoaded(false)
    setDirectoryList((prevList) => {
      const index = prevList.indexOf(directoryId)
      if (index === -1) return [...prevList, directoryId]
      return prevList.slice(0, index + 1)
    })
  }, [directoryId])

  useEffect(() => {
    ;(async () => {
      if (isLoading || !token || isLoaded) return
      setIsLoading(true)
      const data = await getDirectories(token, directoryId)
      onDirectoriesLoad(data)
      setIsLoading(false)
      setIsLoaded(true)
    })()
  }, [token, directoriesLength, isLoaded])

  const handleDirectoryPress = (directoryId) => {
    navigation.navigate("Directory", { directoryId })
  }

  useEffect(() => {
    const backButtonHandler = () => {
      navigation.navigate("Directory", {
        directoryId: directoryList[directoryList.length - 2],
      })
      return true
    }
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backButtonHandler
    )

    // Remove back button listener on unmount
    return () => backHandler.remove()
  })

  const loadingContent = (
    <ActivityIndicator animating color="#000" size="large" />
  )

  const newDirClickHandler = () => {
    setNewDirModalOpened(true)
  }

  const createNewDirectory = async () => {
    const data = await createDirectory(token, newDirectoryName, directoryId)
    if (data.error) {
      return
    }
    onDirectoryAdd(data.data)
    setNewDirModalOpened(false)
    setNewDirectoryName("")
  }

  return (
    <>
      <AppModal
        opened={newDirModalOpened}
        onClose={() => setNewDirModalOpened(false)}
      >
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
            <AcceptButton onPress={createNewDirectory}>
              <Text>Create</Text>
            </AcceptButton>
            <CancelButton onPress={() => setNewDirModalOpened(false)}>
              <Text>Close</Text>
            </CancelButton>
          </ModalActionsView>
        </Spacer>
      </AppModal>
      {isLoading && loadingContent}
      {!isLoading && directories.length === 0 && <Text>No directories</Text>}
      {!isLoading && directories.length > 0 && (
        <FlatList
          data={directories}
          renderItem={({ item }) => (
            <Directory
              id={item.id}
              name={item.name}
              onDirectoryPress={handleDirectoryPress}
            />
          )}
          keyExtractor={(item) => `${item.id}`}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
        />
      )}
      <FloatingMenu
        modalOpened={newDirModalOpened}
        onNewDirClick={newDirClickHandler}
      />
    </>
  )
}
