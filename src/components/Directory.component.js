import React from "react"
import { Entypo } from "@expo/vector-icons"
import {
  DirectoryName,
  DirectoryTouchableOpacity,
} from "../styles/directories.styles"

export const Directory = ({ id, name, onDirectoryPress }) => {
  const handleDirectoryPress = () => {
    onDirectoryPress(id)
  }

  return (
    <DirectoryTouchableOpacity onPress={id > 0 ? handleDirectoryPress : null}>
      <Entypo
        name="folder"
        size={120}
        color={id > 0 ? "gray" : "transparent"}
      />
      <DirectoryName>{name}</DirectoryName>
    </DirectoryTouchableOpacity>
  )
}
