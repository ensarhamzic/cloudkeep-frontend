import React from "react"
import { Entypo, AntDesign, MaterialIcons } from "@expo/vector-icons"
import { DirectoryName, DirectoryPressable } from "../styles/directories.styles"
import {
  FavoriteDirectoryView,
  SelectedDirectoryView,
  SharedDirectoryView,
} from "../styles/ui.styles"
import { ContentType } from "../utils/contentType"
import * as Haptics from "expo-haptics"

export const Directory = ({
  directory,
  onDirectoryPress,
  onDirectoryLongPress,
  selected,
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
    <DirectoryPressable
      onPress={directory.id > 0 ? handleDirectoryPress : null}
      onLongPress={directory.id > 0 ? handleDirectoryLongPress : null}
    >
      {isSelected && (
        <SelectedDirectoryView>
          <AntDesign name="checkcircle" size={35} color="lightgreen" />
        </SelectedDirectoryView>
      )}
      {directory.favorite && (
        <FavoriteDirectoryView>
          <AntDesign name="star" size={25} color="gold" />
        </FavoriteDirectoryView>
      )}
      {directory.shared && (
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
    </DirectoryPressable>
  )
}
