import React from "react"
import { Entypo, AntDesign, MaterialIcons } from "@expo/vector-icons"
import {
  DirectoryName,
  DirectoryTouchableOpacity,
} from "../styles/directories.styles"
import {
  FavoriteDirectoryView,
  SelectedDirectoryView,
  SharedDirectoryView,
} from "../styles/ui.styles"
import { ContentType } from "../utils/contentType"
import * as Haptics from "expo-haptics"
import { DriveMode } from "../utils/driveMode"

export const Directory = ({
  directory,
  onDirectoryPress,
  onDirectoryLongPress,
  selected,
  mode,
}) => {
  const handleDirectoryPress = () => {
    onDirectoryPress(directory.id)
  }

  const handleDirectoryLongPress = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
    onDirectoryLongPress({ id: directory.id, type: ContentType.DIRECTORY })
  }

  const isSelected = selected.find((item) => item.id === directory.id)
  return (
    <DirectoryTouchableOpacity
      onPress={directory.id > 0 ? handleDirectoryPress : null}
      onLongPress={directory.id > 0 ? handleDirectoryLongPress : null}
    >
      {isSelected && (
        <SelectedDirectoryView>
          <AntDesign name="checkcircle" size={35} color="lightgreen" />
        </SelectedDirectoryView>
      )}
      {mode !== DriveMode.SHARED && directory.favorite && (
        <FavoriteDirectoryView>
          <AntDesign name="star" size={25} color="gold" />
        </FavoriteDirectoryView>
      )}
      {mode !== DriveMode.SHARED && directory.shared && (
        <SharedDirectoryView>
          <MaterialIcons
            name="supervisor-account"
            size={25}
            color={isSelected ? "gray" : "black"}
          />
        </SharedDirectoryView>
      )}
      <Entypo
        name="folder"
        size={120}
        color={
          directory.id > 0 ? (isSelected ? "black" : "gray") : "transparent"
        }
      />
      <DirectoryName numberOfLines={2}>{directory.name}</DirectoryName>
    </DirectoryTouchableOpacity>
  )
}
