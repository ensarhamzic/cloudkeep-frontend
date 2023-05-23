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
import { uploadFiles } from "../../../services/files/files.service"
import { File } from "../../../components/File.component"
import { BackButton } from "../../../components/BackButton.component"
import { ref, getDownloadURL } from "firebase/storage"
import { storage } from "../../../../config"

export const DirectoryScreen = ({ route, navigation }) => {
  const {
    directories,
    files,
    onDirectoriesLoad,
    onFilesAdd,
    clearDirectories,
  } = useContext(DirectoriesContext)
  const { token } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [directoryList, setDirectoryList] = useState([])
  const directoryId = route?.params?.directoryId || null
  const directoriesLength = directories.length

  const [floatingMenuOpened, setFloatingMenuOpened] = useState(false)
  const [newDirModalOpened, setNewDirModalOpened] = useState(false)

  // example usage of firebase storage
  // useEffect(() => {
  //   ;(async () => {
  //     console.log("storage", storage)
  //     const fileUrl = await getDownloadURL(
  //       ref(storage, "48907b03-286b-4fc6-b534-494b17d42586")
  //     )
  //     console.log(fileUrl)
  //   })()
  // }, [])

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
      navigation.setOptions({
        title: data.currentDirectory?.name || "Drive",
        headerLeft: () =>
          (directoryId && <BackButton onBackPress={goToPreviousDirectory} />) ||
          null,
      })
      onDirectoriesLoad(data)
      setIsLoading(false)
      setIsLoaded(true)
    })()
  }, [token, directoriesLength, isLoaded])

  const handleDirectoryPress = (directoryId) => {
    navigation.navigate("Directory", { directoryId })
  }

  const goToPreviousDirectory = () => {
    navigation.navigate("Directory", {
      directoryId: directoryList[directoryList.length - 2],
    })
    return true
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      goToPreviousDirectory
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
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
    })

    if (result.canceled) return

    const response = await uploadFiles(token, result.assets, directoryId)
    onFilesAdd(response.data)
  }

  const uploadFileHandler = async () => {
    setFloatingMenuOpened(false)
    const file = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      multiple: true,
    })

    if (file.type === "cancel") return

    const response = await uploadFiles(token, [file], directoryId)
    onFilesAdd(response.data)
  }

  const dirs = [
    ...directories.map((directory) => ({ ...directory, type: "directory" })),
  ]
  if (dirs.length % 2 === 1) dirs.push({ id: -1, name: "", type: "directory" })

  const fs = [...files.map((file) => ({ ...file, type: "file" }))]
  if (fs.length % 2 === 1) fs.push({ id: -1, name: "", type: "file" })

  const content = [...dirs, ...fs]

  return (
    <>
      <AddDirectoryModal
        opened={newDirModalOpened}
        onClose={() => setNewDirModalOpened(false)}
        onAdd={onNewDirectoryCreated}
        parentDirectoryId={directoryId}
      />
      {isLoading && loadingContent}
      {!isLoading && content.length === 0 && <Text>No content</Text>}
      {!isLoading && content.length > 0 && (
        <FlatList
          data={content}
          renderItem={({ item }) => {
            if (item.type === "directory")
              return (
                <Directory
                  id={item.id}
                  name={item.name}
                  onDirectoryPress={handleDirectoryPress}
                />
              )
            return <File file={item} />
          }}
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
