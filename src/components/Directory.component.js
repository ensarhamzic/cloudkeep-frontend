import React from "react"
import { Entypo, AntDesign } from "@expo/vector-icons"
import { DirectoryName, DirectoryPressable } from "../styles/directories.styles"
import { SelectedDirectoryView } from "../styles/ui.styles"
import { ContentType } from "../utils/contentType"

export const Directory = ({
  id,
  name,
  onDirectoryPress,
  onDirectoryLongPress,
  selected,
}) => {
  const handleDirectoryPress = () => {
    onDirectoryPress(id)
  }

  const handleDirectoryLongPress = () => {
    onDirectoryLongPress({ id, type: ContentType.DIRECTORY })
  }

  return (
    <DirectoryPressable
      onPress={id > 0 ? handleDirectoryPress : null}
      onLongPress={id > 0 ? handleDirectoryLongPress : null}
    >
      {selected.find((item) => item.id === id) && (
        <SelectedDirectoryView>
          <AntDesign name="checkcircle" size={35} color="lightgreen" />
        </SelectedDirectoryView>
      )}
      <Entypo
        name="folder"
        size={120}
        color={id > 0 ? "gray" : "transparent"}
      />
      <DirectoryName>{name}</DirectoryName>
    </DirectoryPressable>
  )
}
