import React, { useContext, useEffect, useState } from "react"
import { DirectoriesContext } from "../../../services/directories/directoriesContext"
import { AuthContext } from "../../../services/auth/authContext"
import { FlatList, BackHandler, Text, Button } from "react-native"
import { Directory } from "../../../components/Directory.component"
import { getDirectories } from "../../../services/directories/directories.service"
import { ActivityIndicator } from "react-native-paper"
import { FloatingMenu } from "../components/FloatingMenu.component"
import { AppModal } from "../../../ui/AppModal.component"

export const DirectoryScreen = ({ route, navigation }) => {
  const { directories, onDirectoriesLoad, clearDirectories } =
    useContext(DirectoriesContext)
  const { token } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [directoryList, setDirectoryList] = useState([])
  const directoryId = route?.params?.directoryId || null
  const directoriesLength = directories.length

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

  return (
    <>
      <AppModal
        opened={newDirModalOpened}
        onClose={() => setNewDirModalOpened(false)}
      >
        <Text>Modal</Text>
        <Button title="Close" onPress={() => setNewDirModalOpened(false)} />
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
      <FloatingMenu onNewDirClick={newDirClickHandler} />
    </>
  )
}
