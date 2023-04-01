import React from "react"
import { Entypo } from "@expo/vector-icons"
import {
  DirectoryName,
  DirectoryTouchableOpacity,
} from "../features/drive/components/directories.styles"

export const Directory = ({ id, name, onDirectoryPress }) => {
  const handleDirectoryPress = () => {
    onDirectoryPress(id)
  }

  return (
    <DirectoryTouchableOpacity onPress={handleDirectoryPress}>
      <Entypo name="folder" size={120} color="gray" />
      <DirectoryName>{name}</DirectoryName>
    </DirectoryTouchableOpacity>
  )
}
