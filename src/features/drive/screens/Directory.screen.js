import React, { useContext, useEffect, useState } from "react"
import { DirectoriesContext } from "../../../services/directories/directoriesContext"
import { AuthContext } from "../../../services/auth/authContext"
import { FlatList, BackHandler, Text } from "react-native"
import { Directory } from "../../../components/Directory.component"
import { getDirectories } from "../../../services/directories/directories.service"
import { ActivityIndicator } from "react-native-paper"
import { FloatingMenu } from "../components/FloatingMenu.component"
import { AddDirectoryModal } from "../components/AddDirectoryModal.component"
import * as DocumentPicker from "expo-document-picker"
import * as ImagePicker from "expo-image-picker"
import { API_URL } from "../../../../env"
import axios from "axios"

export const DirectoryScreen = ({ route, navigation }) => {
  const { directories, onDirectoriesLoad, clearDirectories } =
    useContext(DirectoriesContext)
  const { token } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [directoryList, setDirectoryList] = useState([])
  const directoryId = route?.params?.directoryId || null
  const directoriesLength = directories.length

  const [floatingMenuOpened, setFloatingMenuOpened] = useState(false)
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
    setFloatingMenuOpened(false)
    setNewDirModalOpened(true)
  }

  const onNewDirectoryCreated = () => {
    setNewDirModalOpened(false)
  }

  const uploadMediaHandler = async () => {
    setFloatingMenuOpened(false)
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
    })

    console.log(result)
  }

  const uploadFileHandler = async () => {
    setFloatingMenuOpened(false)
    const file = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      multiple: true,
    })

    const formData = new FormData()
    formData.append("file", {
      uri: file.uri,
      type: file.mimeType,
      name: file.name,
    })
    formData.append("name", "ensar")

    try {
      const response = await axios.post(
        "http://192.168.1.4:8080/directory/1/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )

      console.log(response.data)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <>
      <AddDirectoryModal
        opened={newDirModalOpened}
        onClose={() => setNewDirModalOpened(false)}
        onAdd={onNewDirectoryCreated}
        parentDirectoryId={directoryId}
      />
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
        opened={floatingMenuOpened}
        onNewDirClick={newDirClickHandler}
        onUploadMediaClick={uploadMediaHandler}
        onUploadFileClick={uploadFileHandler}
        onToggle={() => setFloatingMenuOpened((prev) => !prev)}
      />
    </>
  )
}
