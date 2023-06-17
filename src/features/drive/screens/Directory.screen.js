import React, { useContext, useEffect, useState } from "react"
import { DirectoriesContext } from "../../../services/directories/directoriesContext"
import { AuthContext } from "../../../services/auth/authContext"
import { BackHandler } from "react-native"
import { getDirectories } from "../../../services/directories/directories.service"
import { ActivityIndicator, ProgressBar } from "react-native-paper"
import { FloatingMenu } from "../components/FloatingMenu.component"
import { AddDirectoryModal } from "../components/AddDirectoryModal.component"
import * as DocumentPicker from "expo-document-picker"
import * as ImagePicker from "expo-image-picker"
import { uploadFiles } from "../../../services/files/files.service"
import { BackButton } from "../../../components/BackButton.component"
import { ref, getDownloadURL } from "firebase/storage"
import { storage } from "../../../../config"
import { AntDesign } from "@expo/vector-icons"
import { ContentType } from "../../../utils/contentType"
import {
  addRemoveFavorites,
  deleteContent,
  moveContent,
  restoreContents,
} from "../../../services/contents/contents.service"
import { RenameContentModal } from "../components/RenameContentModal.component"
import { DriveMode } from "../../../utils/driveMode"
import { MoveButton } from "../../../styles/directories.styles"
import { SortType } from "../../../utils/sortType"
import { SortOrder } from "../../../utils/sortOrder"
import { SortBar } from "../components/SortBar.component"
import { ContentList } from "../components/ContentList"
import { downloadFile } from "../../../utils/functions"
import { HeaderRight } from "../components/HeaderRight"
import { BasicFormInput } from "../../../styles/ui.styles"
import { Spacer } from "../../../components/Spacer.component"
import Toast from "react-native-root-toast"
import { useTheme } from "styled-components"
import { DeleteContentModal } from "../components/DeleteContentModal.component"

export const DirectoryScreen = ({ route, navigation }) => {
  const theme = useTheme()
  const {
    directories,
    files,
    onDirectoriesLoad,
    onContentDelete,
    onFilesAdd,
    onAddRemoveFavorites,
    clearDirectories,
    onContentRestore,
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
  const [deleteModalOpened, setDeleteModalOpened] = useState(false)

  const [sortType, setSortType] = useState(SortType.NAME)
  const [sortOrder, setSortOrder] = useState(SortOrder.ASCENDING)
  const [sortMenuOpened, setSortMenuOpened] = useState(false)

  const [searchQuery, setSearchQuery] = useState("")

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
    if (
      !uploaded ||
      targetDirectoryId === -1 ||
      uploadedDirectoriesLength === 0 ||
      targetDirectoryId !== directoryId
    )
      return
    onFilesAdd(uploadedDirectories)
    setUploaded(false)
    setTargetDirectoryId(-1)
    setUploadedDirectories([])
  }, [uploaded, targetDirectoryId, directoryId, uploadedDirectoriesLength])

  useEffect(() => {
    ;(async () => {
      if (!token) return
      setDirectoryList([null])
      if (searchQuery.length < 3 && mode === DriveMode.SEARCH) {
        clearDirectories()
        return
      }
      setIsLoading(true)
      if (!directoryId) setDirectoryList([null])
      const data = await getDirectories(token, directoryId, mode, {
        query: searchQuery,
      })
      let title = "Drive"
      if (mode === DriveMode.FAVORITES) title = "Favorites"
      if (mode === DriveMode.MOVE) title = "Move"
      if (mode === DriveMode.SHARED) title = "Shared"
      if (mode === DriveMode.SEARCH) title = "Search"
      if (mode === DriveMode.TRASH) title = "Trash"
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
      onDirectoriesLoad(data)
      setIsLoading(false)
    })()
  }, [token, searchQuery, directoryId, mode])

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      clearDirectories()
      setIsLoading(true)
      if (!directoryId) setDirectoryList([null])
      const data = await getDirectories(token, directoryId, mode, {
        query: searchQuery,
      })
      let title = "Drive"
      if (mode === DriveMode.FAVORITES) title = "Favorites"
      if (mode === DriveMode.MOVE) title = "Move"
      if (mode === DriveMode.SHARED) title = "Shared"
      if (mode === DriveMode.SEARCH) title = "Search"
      if (mode === DriveMode.TRASH) title = "Trash"
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
      onDirectoriesLoad(data)
      setIsLoading(false)
    })

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe
  }, [token, navigation, mode, directoryId, searchQuery])

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
    let title = directories?.find((dir) => dir.id === directoryId)?.name
    if (!title)
      switch (mode) {
        case DriveMode.DRIVE:
          title = "Drive"
          break
        case DriveMode.FAVORITES:
          title = "Favorites"
          break
        case DriveMode.MOVE:
          title = "Move"
          break
        case DriveMode.SHARED:
          title = "Shared"
          break
        case DriveMode.SEARCH:
          title = "Search"
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
    setDeleteModalOpened(false)
    setSelectedContent([])
    await deleteContent(token, selectedContent, mode)
    onContentDelete(selectedContent)
  }

  const deleteContentPressHandler = () => {
    setDeleteModalOpened(true)
  }

  const renamePressHandler = () => {
    setRenameModalOpened(true)
  }

  const shareContentHandler = () => {
    setSelectedContent([])
    navigation.navigate("Share", {
      content: selectedContent[0],
    })
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

  const addRemoveFavoritesHandler = async () => {
    onAddRemoveFavorites(selectedContent)
    const response = await addRemoveFavorites(token, selectedContent)
    if (response.error) return
    setSelectedContent([])
  }

  const handleProgressChange = (progress) => {
    // divide progress by 100 and make it with one decimal point
    const newProgress = Math.round(progress / 10) / 10
    setUploadProgress((prev) => (prev !== newProgress ? newProgress : prev))
  }

  const restoreContentHandler = async () => {
    await restoreContents(token, selectedContent)
    onContentRestore(selectedContent)
    setSelectedContent([])
  }

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
    let screenName = "Directory"
    if (mode === DriveMode.FAVORITES) screenName = "FavoriteDirectory"
    if (mode === DriveMode.SHARED) screenName = "SharedDirectory"
    if (mode === DriveMode.SEARCH) screenName = "SearchDirectory"
    if (mode === DriveMode.TRASH) screenName = "Settings"

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
      headerRight: () => (
        <HeaderRight
          selectedContent={selectedContent}
          onAddRemoveFavorite={addRemoveFavoritesHandler}
          onRenamePress={renamePressHandler}
          onShareContent={shareContentHandler}
          mode={mode}
          onMoveContentClick={moveContentClickHandler}
          onDeleteContent={deleteContentPressHandler}
          onRestoreContent={restoreContentHandler}
        />
      ),
    })
  }, [selectedContentLength])

  useEffect(() => {
    ;(async () => {
      if (isLoading || !token || isLoaded) return
      clearDirectories()
      if (!directoryId && mode === DriveMode.SEARCH) return
      setIsLoading(true)
      const data = await getDirectories(token, directoryId, mode)
      let title = "Drive"
      if (mode === DriveMode.FAVORITES) title = "Favorites"
      if (mode === DriveMode.MOVE) title = "Move"
      if (mode === DriveMode.SHARED) title = "Shared"
      if (mode === DriveMode.SEARCH) title = "Search"
      if (mode === DriveMode.TRASH) title = "Trash"
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
      onDirectoriesLoad(data)
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
    if (mode === DriveMode.TRASH) return

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

    let screenName = "Directory"
    if (mode === DriveMode.FAVORITES) screenName = "FavoriteDirectory"
    if (mode === DriveMode.SHARED) screenName = "SharedDirectory"
    if (mode === DriveMode.SEARCH) screenName = "SearchDirectory"
    if (mode === DriveMode.TRASH) screenName = "Settings"
    navigation.navigate(screenName, { directoryId, mode })
  }

  const handleFilePress = async (fileId) => {
    if (selectedContent.length > 0) {
      handleContentLongPress({ id: fileId, type: ContentType.FILE })
      return
    }
    if (mode === DriveMode.MOVE || mode === DriveMode.TRASH) return
    const file = files.find((file) => file.id === fileId)

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
    <Spacer size="large">
      <ActivityIndicator animating color={theme.colors.primary} size="large" />
    </Spacer>
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

    try {
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
    } catch (error) {
      Toast.show(error.message, Toast.durations.LONG)
    }
  }

  const uploadFileHandler = async () => {
    setFloatingMenuOpened(false)
    const file = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      multiple: true,
    })

    if (file.type === "cancel") return

    try {
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
    } catch (error) {
      Toast.show(error.message, Toast.durations.LONG)
    }
  }

  const handleContentLongPress = (content) => {
    if (mode === DriveMode.MOVE || mode === DriveMode.SHARED) return
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

  const sortOrderChangeHandler = (order) => {
    setSortOrder(order)
    setSortMenuOpened(false)
  }
  const sortTypeChangeHandler = (type) => {
    setSortType(type)
    setSortMenuOpened(false)
  }

  return (
    <>
      {mode === DriveMode.DRIVE && (
        <ProgressBar progress={uploadProgress} color="blue" />
      )}
      {mode === DriveMode.SEARCH && !directoryId && (
        <Spacer>
          <BasicFormInput
            placeholder="Search query"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </Spacer>
      )}
      <SortBar
        sortType={sortType}
        sortOrder={sortOrder}
        onSortTypeChange={sortTypeChangeHandler}
        onSortOrderChange={sortOrderChangeHandler}
        sortMenuOpened={sortMenuOpened}
        onSortTypePress={() => setSortMenuOpened(!sortMenuOpened)}
      />
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
        content={selectedContent[0]}
        onRename={() => {
          setRenameModalOpened(false)
          setSelectedContent([])
        }}
        mode={mode}
      />
      <DeleteContentModal
        opened={deleteModalOpened}
        onClose={() => setDeleteModalOpened(false)}
        onDelete={deleteContentHandler}
      />
      {isLoading && loadingContent}
      {!isLoading && (
        <ContentList
          handleDirectoryPress={handleDirectoryPress}
          handleContentLongPress={handleContentLongPress}
          selectedDirectories={selectedDirectories}
          handleFilePress={handleFilePress}
          selectedFiles={selectedFiles}
          mode={mode}
          contentToMove={contentToMove}
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
