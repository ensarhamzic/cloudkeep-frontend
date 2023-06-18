import React, { useContext } from "react"
import { HeaderRightOptionsView } from "../../../styles/ui.styles"
import { TouchableOpacity } from "react-native"
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons"
import { DriveMode } from "../../../utils/driveMode"
import { ContentType } from "../../../utils/contentType"
import { DirectoriesContext } from "../../../services/directories/directoriesContext"

export const HeaderRight = ({
  selectedContent,
  onAddRemoveFavorites,
  onRenamePress,
  onShareContent,
  mode,
  onMoveContentClick,
  onDeleteContent,
  onRestoreContent,
  onFileShare,
}) => {
  const { directories, files } = useContext(DirectoriesContext)
  let canAddToFavorites = true
  let canRemoveFromFavorites = true

  let dirs = directories ? [...directories] : []
  let fs = files ? [...files] : []

  if (mode === DriveMode.FAVORITES) {
    dirs = dirs.filter((dir) => dir.favorite)
    fs = fs.filter((file) => file.favorite)
  }

  for (let i = 0; i < selectedContent.length; i++) {
    if (
      selectedContent[i].type === ContentType.DIRECTORY &&
      dirs.find((dir) => dir.id === selectedContent[i].id)?.favorite
    ) {
      canAddToFavorites = false
      break
    }
    if (
      selectedContent[i].type === ContentType.FILE &&
      fs.find((file) => file.id === selectedContent[i].id)?.favorite
    ) {
      canAddToFavorites = false
      break
    }
  }

  for (let i = 0; i < selectedContent.length; i++) {
    if (
      selectedContent[i].type === ContentType.DIRECTORY &&
      !dirs.find((dir) => dir.id === selectedContent[i].id)?.favorite
    ) {
      canRemoveFromFavorites = false
      break
    }
    if (
      selectedContent[i].type === ContentType.FILE &&
      !fs.find((file) => file.id === selectedContent[i].id)?.favorite
    ) {
      canRemoveFromFavorites = false
      break
    }
  }

  return (
    <HeaderRightOptionsView>
      {selectedContent.length === 1 &&
        selectedContent[0].type === ContentType.FILE &&
        mode !== DriveMode.TRASH &&
        mode !== DriveMode.MOVE && (
          <TouchableOpacity onPress={onFileShare}>
            <FontAwesome name="share-alt" size={24} color="black" />
          </TouchableOpacity>
        )}
      {mode !== DriveMode.TRASH && canAddToFavorites && (
        <TouchableOpacity onPress={onAddRemoveFavorites}>
          <AntDesign name="star" size={24} color="black" />
        </TouchableOpacity>
      )}
      {mode !== DriveMode.TRASH && canRemoveFromFavorites && (
        <TouchableOpacity onPress={onAddRemoveFavorites}>
          <MaterialCommunityIcons name="star-off" size={24} color="black" />
        </TouchableOpacity>
      )}
      {mode !== DriveMode.TRASH && selectedContent.length === 1 && (
        <TouchableOpacity onPress={onRenamePress}>
          <MaterialIcons
            name="drive-file-rename-outline"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      )}
      {mode !== DriveMode.TRASH && selectedContent.length === 1 && (
        <TouchableOpacity onPress={onShareContent}>
          <MaterialIcons name="supervisor-account" size={24} color="black" />
        </TouchableOpacity>
      )}
      {mode === DriveMode.DRIVE && (
        <TouchableOpacity onPress={onMoveContentClick}>
          <MaterialCommunityIcons name="folder-move" size={24} color="black" />
        </TouchableOpacity>
      )}
      {mode === DriveMode.TRASH && (
        <TouchableOpacity onPress={onRestoreContent}>
          <MaterialCommunityIcons name="restore" size={24} color="black" />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={onDeleteContent}>
        <MaterialIcons name="delete" size={24} color="black" />
      </TouchableOpacity>
    </HeaderRightOptionsView>
  )
}
