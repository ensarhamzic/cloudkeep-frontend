import React, { useContext, useEffect, useState } from "react"
import { DirectoriesContext } from "../../../services/directories/directoriesContext"
import { AuthContext } from "../../../services/auth/authContext"
import { FlatList, BackHandler, Text, TouchableOpacity } from "react-native"
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
import { HeaderRightOptionsView } from "../../../styles/ui.styles"
import {
  MaterialIcons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons"
import { ContentType } from "../../../utils/contentType"
import {
  addRemoveFavorites,
  deleteContent,
} from "../../../services/contents/contents.service"
import { RenameContentModal } from "../components/RenameContentModal.component"
import { DriveMode } from "../../../utils/driveMode"

export const DirectoryScreen = ({ route, navigation }) => {
  const {
    directories,
    files,
    currentDirectory,
    currentFavoritesDirectory,
    favorites,
    favoritesFiles,
    onDirectoriesLoad,
    onContentDelete,
    onFilesAdd,
    onAddRemoveFavorites,
    clearDirectories,
  } = useContext(DirectoriesContext)
  const { token } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [directoryList, setDirectoryList] = useState([])
  const directoryId = route?.params?.directoryId || null
  const mode = route?.params?.mode || null
  console.log("MODE", mode)

  const [floatingMenuOpened, setFloatingMenuOpened] = useState(false)
  const [newDirModalOpened, setNewDirModalOpened] = useState(false)
  const [renameModalOpened, setRenameModalOpened] = useState(false)

  const [selectedContent, setSelectedContent] = useState([])
  const selectedContentLength = selectedContent.length
  const selectedDirectories = selectedContent.filter(
    (item) => item.type === ContentType.DIRECTORY
  )
  const selectedFiles = selectedContent.filter(
    (item) => item.type === ContentType.FILE
  )

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

  const setDefaultHeader = () => {
    navigation.setOptions({
      title:
        mode === DriveMode.DRIVE
          ? currentDirectory?.name || "Drive"
          : currentFavoritesDirectory?.name || "Favorites",
      headerTitleAlign: "center",
      headerLeft: () =>
        (directoryId && <BackButton onBackPress={goBack} />) || null,
      headerRight: null,
    })
  }

  const deleteContentHandler = async () => {
    await deleteContent(token, selectedContent)
    onContentDelete(selectedContent, mode)
    setSelectedContent([])
  }

  const renamePressHandler = () => {
    setRenameModalOpened(true)
  }

  let canAddToFavorites = true
  let canRemoveFromFavorites = true

  for (let i = 0; i < selectedContent.length; i++) {
    if (
      selectedContent[i].type === ContentType.DIRECTORY &&
      directories.find((dir) => dir.id === selectedContent[i].id)?.favorite
    ) {
      canAddToFavorites = false
      break
    }
    if (
      selectedContent[i].type === ContentType.FILE &&
      files.find((file) => file.id === selectedContent[i].id)?.favorite
    ) {
      canAddToFavorites = false
      break
    }
  }

  for (let i = 0; i < selectedContent.length; i++) {
    if (
      selectedContent[i].type === ContentType.DIRECTORY &&
      !directories.find((dir) => dir.id === selectedContent[i].id)?.favorite
    ) {
      canRemoveFromFavorites = false
      break
    }
    if (
      selectedContent[i].type === ContentType.FILE &&
      !files.find((file) => file.id === selectedContent[i].id)?.favorite
    ) {
      canRemoveFromFavorites = false
      break
    }
  }

  const addRemoveFavoritesHandler = async () => {
    onAddRemoveFavorites(selectedContent, mode)
    const response = await addRemoveFavorites(token, selectedContent)
    if (response.error) return
    setSelectedContent([])
  }

  const HeaderRight = (
    <HeaderRightOptionsView>
      {canAddToFavorites && (
        <TouchableOpacity onPress={addRemoveFavoritesHandler}>
          <AntDesign name="star" size={24} color="black" />
        </TouchableOpacity>
      )}
      {canRemoveFromFavorites && (
        <TouchableOpacity onPress={addRemoveFavoritesHandler}>
          <MaterialCommunityIcons name="star-off" size={24} color="black" />
        </TouchableOpacity>
      )}
      {selectedContentLength === 1 && (
        <TouchableOpacity onPress={renamePressHandler}>
          <MaterialIcons
            name="drive-file-rename-outline"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={deleteContentHandler}>
        <MaterialIcons name="delete" size={24} color="black" />
      </TouchableOpacity>
    </HeaderRightOptionsView>
  )

  useEffect(() => {
    if (selectedContentLength === 0) {
      setDefaultHeader()
      return
    }
    navigation.setOptions({
      title: `${selectedContentLength} selected`,
      headerTitleAlign: "left",
      headerLeft: () => <BackButton onBackPress={goBack} cancel />,
      headerRight: () => HeaderRight,
    })
  }, [selectedContentLength])

  useEffect(() => {
    ;(async () => {
      if (isLoading || !token || isLoaded) return
      setIsLoading(true)
      const data = await getDirectories(token, directoryId)
      console.log("DATA", data)
      let title = mode === DriveMode.DRIVE ? "Drive" : "Favorites"
      if (data.currentDirectory) title = data.currentDirectory?.name
      navigation.setOptions({
        title,
        headerTitleAlign: "center",
        headerLeft: () =>
          (directoryId && <BackButton onBackPress={goBack} />) || null,
      })
      onDirectoriesLoad(data, mode)
      setIsLoading(false)
      setIsLoaded(true)
    })()
  }, [token, isLoaded])

  const handleDirectoryPress = (directoryId) => {
    if (selectedContent.length > 0) {
      handleContentLongPress({ id: directoryId, type: ContentType.DIRECTORY })
      return
    }
    navigation.navigate("Directory", { directoryId })
  }

  const handleFilePress = (fileId) => {
    if (selectedContent.length > 0) {
      handleContentLongPress({ id: fileId, type: ContentType.FILE })
      return
    }
  }

  const goBack = () => {
    if (selectedContent.length > 0) {
      setSelectedContent([])
      return true
    }
    navigation.navigate("Directory", {
      directoryId: directoryList[directoryList.length - 2],
    })
    return true
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      goBack
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
    onFilesAdd(response.data, mode)
  }

  const uploadFileHandler = async () => {
    setFloatingMenuOpened(false)
    const file = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      multiple: true,
    })

    if (file.type === "cancel") return

    const response = await uploadFiles(token, [file], directoryId)
    onFilesAdd(response.data, mode)
  }

  let dirs = []
  let fs = []

  if (mode === DriveMode.DRIVE) {
    dirs = [
      ...directories.map((directory) => ({
        ...directory,
        type: ContentType.DIRECTORY,
      })),
    ]
    if (dirs.length % 2 === 1)
      dirs.push({ id: -1, name: "", type: ContentType.DIRECTORY })

    fs = [...files.map((file) => ({ ...file, type: ContentType.FILE }))]
    if (fs.length % 2 === 1)
      fs.push({ id: -1, name: "", type: ContentType.FILE })
  } else {
    dirs = [
      ...favorites.map((directory) => ({
        ...directory,
        type: ContentType.DIRECTORY,
      })),
    ]
    if (dirs.length % 2 === 1)
      dirs.push({ id: -1, name: "", type: ContentType.DIRECTORY })

    fs = [
      ...favoritesFiles.map((file) => ({ ...file, type: ContentType.FILE })),
    ]
    if (fs.length % 2 === 1)
      fs.push({ id: -1, name: "", type: ContentType.FILE })
  }

  const content = [...dirs, ...fs]

  const handleContentLongPress = (content) => {
    setSelectedContent((prev) => {
      const foundItem = prev.find(
        (item) => item.id === content.id && item.type === content.type
      )
      if (foundItem) return prev.filter((item) => item !== foundItem)
      return [...prev, content]
    })
  }

  return (
    <>
      <AddDirectoryModal
        opened={newDirModalOpened}
        onClose={() => setNewDirModalOpened(false)}
        onAdd={onNewDirectoryCreated}
        parentDirectoryId={directoryId}
        mode={mode}
      />
      <RenameContentModal
        opened={renameModalOpened}
        onClose={() => setRenameModalOpened(false)}
        parentDirectoryId={directoryId}
        name={
          content.find(
            (item) =>
              item.id === selectedContent[0]?.id &&
              item.type === selectedContent[0]?.type
          )?.name
        }
        content={selectedContent[0]}
        onRename={() => {
          setRenameModalOpened(false)
          setSelectedContent([])
        }}
        mode={mode}
      />
      {isLoading && loadingContent}
      {!isLoading && content.length === 0 && <Text>No content</Text>}
      {!isLoading && content.length > 0 && (
        <FlatList
          data={content}
          renderItem={({ item }) => {
            if (item.type === ContentType.DIRECTORY)
              return (
                <Directory
                  directory={item}
                  onDirectoryPress={handleDirectoryPress}
                  onDirectoryLongPress={handleContentLongPress}
                  selected={selectedDirectories}
                />
              )
            return (
              <File
                file={item}
                onFilePress={handleFilePress}
                onFileLongPress={handleContentLongPress}
                selected={selectedFiles}
              />
            )
          }}
          keyExtractor={(item) =>
            item.type === ContentType.DIRECTORY ? `d${item.id}` : `f${item.id}`
          }
          showsHorizontalScrollIndicator={false}
          numColumns={2}
        />
      )}
      {mode === DriveMode.DRIVE && (
        <FloatingMenu
          modalOpened={newDirModalOpened}
          opened={floatingMenuOpened}
          onNewDirClick={newDirClickHandler}
          onUploadMediaClick={uploadMediaHandler}
          onUploadFileClick={uploadFileHandler}
          onToggle={() => setFloatingMenuOpened((prev) => !prev)}
        />
      )}
    </>
  )
}
