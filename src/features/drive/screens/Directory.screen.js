import React, { useContext, useEffect, useState } from "react"
import { DirectoriesContext } from "../../../services/directories/directoriesContext"
import { AuthContext } from "../../../services/auth/authContext"
import {
  FlatList,
  BackHandler,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native"
import { Directory } from "../../../components/Directory.component"
import { getDirectories } from "../../../services/directories/directories.service"
import { ActivityIndicator, ProgressBar } from "react-native-paper"
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
  moveContent,
} from "../../../services/contents/contents.service"
import { RenameContentModal } from "../components/RenameContentModal.component"
import { DriveMode } from "../../../utils/driveMode"
import { MoveButton } from "../../../styles/directories.styles"
import * as Permissions from "expo-permissions"
import * as FileSystem from "expo-file-system"
import * as IntentLauncher from "expo-intent-launcher"
import { shareAsync } from "expo-sharing"

const downloadFile = async (fileUrl, destinationPath) => {
  try {
    // eslint-disable-next-line import/namespace
    let filePath = FileSystem.cacheDirectory + destinationPath
    // remove spaces from filePath
    filePath = filePath.replace(/\s/g, "")
    // eslint-disable-next-line import/namespace
    const result = await FileSystem.downloadAsync(fileUrl, filePath)

    // Linking.openURL(newUri)
    if (Platform.OS === "android") {
      try {
        // eslint-disable-next-line import/namespace
        const cUri = await FileSystem.getContentUriAsync(result.uri)
        await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
          data: cUri,
          flags: 1,
        })
      } catch {
        shareAsync(result.uri)
      }
    } else {
      shareAsync(result.uri)
    }
  } catch {}
}

export const DirectoryScreen = ({ route, navigation }) => {
  const {
    directories,
    files,
    currentDirectory,
    currentFavoritesDirectory,
    favorites,
    favoritesFiles,
    currentMoveDirectory,
    moveDirectories,
    onDirectoriesLoad,
    onContentDelete,
    onFilesAdd,
    onAddRemoveFavorites,
    clearDirectories,
  } = useContext(DirectoriesContext)
  const { token } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [directoryList, setDirectoryList] = useState([null])
  const directoryId = route?.params?.directoryId || null
  const mode = route?.params?.mode || null
  const contentToMove = route?.params?.content || []

  const [floatingMenuOpened, setFloatingMenuOpened] = useState(false)
  const [newDirModalOpened, setNewDirModalOpened] = useState(false)
  const [renameModalOpened, setRenameModalOpened] = useState(false)

  const [uploadProgress, setUploadProgress] = useState(null)
  const [targetDirectoryId, setTargetDirectoryId] = useState(-1)
  const [uploaded, setUploaded] = useState(false)
  const [uploadedDirectories, setUploadedDirectories] = useState([])

  const [selectedContent, setSelectedContent] = useState([])
  const selectedContentLength = selectedContent.length
  const selectedDirectories = selectedContent.filter(
    (item) => item.type === ContentType.DIRECTORY
  )
  const selectedFiles = selectedContent.filter(
    (item) => item.type === ContentType.FILE
  )
  const cancelMoveHandler = () => {
    navigation.navigate("Main", {
      screen: "Drive",
      params: {
        screen: "Directory",
        params: { mode: DriveMode.DRIVE },
      },
    })
  }

  const uploadedDirectoriesLength = uploadedDirectories.length
  useEffect(() => {
    console.log("uploaded", uploaded)
    console.log("targetDirectoryId", targetDirectoryId, directoryId)
    console.log("uploadedDirectoriesLength", uploadedDirectoriesLength)
    console.log()
    if (
      !uploaded ||
      targetDirectoryId === -1 ||
      uploadedDirectoriesLength === 0 ||
      targetDirectoryId !== directoryId
    )
      return
    onFilesAdd(uploadedDirectories, mode)
    setUploaded(false)
    setTargetDirectoryId(-1)
    setUploadedDirectories([])
  }, [uploaded, targetDirectoryId, directoryId, uploadedDirectoriesLength])

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      setIsLoading(true)
      clearDirectories(mode)
      if (!directoryId) setDirectoryList([null])
      const data = await getDirectories(
        token,
        directoryId,
        mode === DriveMode.FAVORITES
      )
      let title = "Drive"
      if (mode === DriveMode.FAVORITES) title = "Favorites"
      if (mode === DriveMode.MOVE) title = "Move"
      if (data.currentDirectory) title = data.currentDirectory?.name
      navigation.setOptions({
        title,
        headerTitleAlign: "center",
        headerLeft: () =>
          (directoryId && <BackButton onBackPress={goBack} />) || null,
        headerRight: () =>
          mode === DriveMode.MOVE ? (
            <AntDesign
              onPress={cancelMoveHandler}
              name="close"
              size={40}
              color="black"
            />
          ) : null,
      })
      onDirectoriesLoad(data, mode)
      setIsLoading(false)
    })

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe
  }, [navigation, mode, directoryId])

  useEffect(() => {
    clearDirectories(mode)
    setIsLoaded(false)
    setDirectoryList((prevList) => {
      const index = prevList.indexOf(directoryId)
      if (index === -1) return [...prevList, directoryId]
      return prevList.slice(0, index + 1)
    })
  }, [directoryId])

  const setDefaultHeader = () => {
    let title = ""
    switch (mode) {
      case DriveMode.DRIVE:
        title = currentDirectory?.name || "Drive"
        break
      case DriveMode.FAVORITES:
        title = currentFavoritesDirectory?.name || "Favorites"
        break
      case DriveMode.MOVE:
        title = currentMoveDirectory?.name || "Move"
        break
    }
    navigation.setOptions({
      title,
      headerTitleAlign: "center",
      headerLeft: () =>
        (directoryId && <BackButton onBackPress={goBack} />) || null,
      headerRight: () =>
        mode === DriveMode.MOVE ? (
          <AntDesign
            onPress={cancelMoveHandler}
            name="close"
            size={40}
            color="black"
          />
        ) : null,
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

  const moveContentClickHandler = () => {
    setSelectedContent([])
    setDirectoryList([null])
    setIsLoaded(false)
    navigation.navigate("Move", {
      screen: "MoveContentDirectory",
      params: {
        mode: DriveMode.MOVE,
        content: selectedContent,
      },
    })
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

  const handleProgressChange = (progress) => {
    // divide progress by 100 and make it with one decimal point
    const newProgress = Math.round(progress / 10) / 10
    setUploadProgress((prev) => (prev !== newProgress ? newProgress : prev))
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
      {mode === DriveMode.DRIVE && (
        <TouchableOpacity onPress={moveContentClickHandler}>
          <MaterialCommunityIcons name="folder-move" size={24} color="black" />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={deleteContentHandler}>
        <MaterialIcons name="delete" size={24} color="black" />
      </TouchableOpacity>
    </HeaderRightOptionsView>
  )

  const goBack = () => {
    setUploaded(false)
    if (selectedContent.length > 0) {
      setSelectedContent([])
      return true
    }
    if (mode === DriveMode.MOVE) {
      navigation.navigate("Move", {
        screen: "MoveContentDirectory",
        params: {
          mode: DriveMode.MOVE,
          directoryId: directoryList[directoryList.length - 2],
          content: route?.params?.content,
        },
      })
      return true
    }
    const screenName =
      mode === DriveMode.DRIVE ? "Directory" : "FavoriteDirectory"
    navigation.navigate(screenName, {
      directoryId: directoryList[directoryList.length - 2],
      mode,
    })
    return true
  }

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
      clearDirectories(mode)
      const data = await getDirectories(
        token,
        directoryId,
        mode === DriveMode.FAVORITES
      )
      let title = "Drive"
      if (mode === DriveMode.FAVORITES) title = "Favorites"
      if (mode === DriveMode.MOVE) title = "Move"
      if (data.currentDirectory) title = data.currentDirectory?.name
      navigation.setOptions({
        title,
        headerTitleAlign: "center",
        headerLeft: () =>
          (directoryId && <BackButton onBackPress={goBack} />) || null,
        headerRight: () =>
          mode === DriveMode.MOVE ? (
            <AntDesign
              onPress={cancelMoveHandler}
              name="close"
              size={40}
              color="black"
            />
          ) : null,
      })
      onDirectoriesLoad(data, mode)
      setIsLoading(false)
      setIsLoaded(true)
    })()
  }, [token, isLoaded, directoryId])

  const handleDirectoryPress = (directoryId) => {
    setUploaded(false)
    if (selectedContent.length > 0) {
      handleContentLongPress({ id: directoryId, type: ContentType.DIRECTORY })
      return
    }

    if (mode === DriveMode.MOVE) {
      navigation.navigate("Move", {
        screen: "MoveContentDirectory",
        params: {
          mode: DriveMode.MOVE,
          directoryId,
          content: route?.params?.content,
        },
      })
      return
    }

    const screenName =
      mode === DriveMode.DRIVE ? "Directory" : "FavoriteDirectory"
    navigation.navigate(screenName, { directoryId, mode })
  }

  const handleFilePress = async (fileId) => {
    if (selectedContent.length > 0) {
      handleContentLongPress({ id: fileId, type: ContentType.FILE })
      return
    }

    let file = files.find((file) => file.id === fileId)
    if (!file) file = favoritesFiles.find((file) => file.id === fileId)

    const fileUrl = await getDownloadURL(ref(storage, file.path))
    // get file extension from url
    const fileExtension = fileUrl.split(".").pop()
    downloadFile(fileUrl, file.name + "." + fileExtension)
  }
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      goBack
    )

    // Remove back button listener on unmount
    return () => backHandler.remove()
  }, [goBack])

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
    const { status: permissionStatus } = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.MEDIA_LIBRARY
    )
    if (permissionStatus !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!")
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
    })

    if (result.canceled) return

    const response = await uploadFiles(
      token,
      result.assets,
      directoryId,
      handleProgressChange
    )
    setTargetDirectoryId(directoryId)
    setUploadedDirectories(response.data)
    setUploaded(true)
    setUploadProgress(null)
  }

  const uploadFileHandler = async () => {
    setFloatingMenuOpened(false)
    const { status: permissionStatus } = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.MEDIA_LIBRARY
    )
    if (permissionStatus !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!")
      return
    }
    const file = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      multiple: true,
    })

    if (file.type === "cancel") return

    const response = await uploadFiles(
      token,
      [file],
      directoryId,
      handleProgressChange
    )
    setTargetDirectoryId(directoryId)
    setUploadedDirectories(response.data)
    setUploaded(true)
    setUploadProgress(null)
  }

  let dirs = []
  let fs = []
  let content = []

  switch (mode) {
    case DriveMode.DRIVE:
      dirs = directories ? [...directories] : []
      fs = files ? [...files] : []
      break
    case DriveMode.FAVORITES:
      dirs = favorites ? [...favorites] : []
      fs = favoritesFiles ? [...favoritesFiles] : []
      dirs = dirs.filter((dir) => dir.favorite)
      fs = fs.filter((file) => file.favorite)
      break
    case DriveMode.MOVE:
      dirs = moveDirectories ? [...moveDirectories] : []
      // filter just dirs that are not in contentToMove
      dirs = dirs.filter(
        (dir) =>
          !contentToMove.find(
            (item) => item.id === dir.id && item.type === ContentType.DIRECTORY
          )
      )
      break
  }

  dirs = [
    ...dirs.map((directory) => ({
      ...directory,
      type: ContentType.DIRECTORY,
    })),
  ]
  if (dirs.length % 2 === 1)
    dirs.push({ id: -1, name: "", type: ContentType.DIRECTORY })

  fs = [...fs.map((file) => ({ ...file, type: ContentType.FILE }))]
  if (fs.length % 2 === 1) fs.push({ id: -1, name: "", type: ContentType.FILE })

  content = [...dirs, ...fs]

  const handleContentLongPress = (content) => {
    if (mode === DriveMode.MOVE) return
    setSelectedContent((prev) => {
      const foundItem = prev.find(
        (item) => item.id === content.id && item.type === content.type
      )
      if (foundItem) return prev.filter((item) => item !== foundItem)
      return [...prev, content]
    })
  }

  const moveContentHandler = async () => {
    const response = await moveContent(token, contentToMove, directoryId)
    if (response.error) return
    navigation.navigate("Main", {
      screen: "Drive",
      params: {
        screen: "Directory",
        params: { mode: DriveMode.DRIVE },
      },
    })
  }

  return (
    <>
      <ProgressBar progress={uploadProgress} color="blue" />
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

      {mode === DriveMode.MOVE && (
        <MoveButton onPress={moveContentHandler} mode="contained">
          Move Content here
        </MoveButton>
      )}
    </>
  )
}
