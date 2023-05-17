import React from "react"
import { AntDesign } from "@expo/vector-icons"
import {
  DirectoryName,
  DirectoryTouchableOpacity,
} from "../styles/directories.styles"

export const File = ({ file }) => {
  const handleFilePress = () => {
    //
  }

  return (
    <DirectoryTouchableOpacity onPress={handleFilePress}>
      <AntDesign name="filetext1" size={50} color="gray" />
      <DirectoryName>{file.name}</DirectoryName>
    </DirectoryTouchableOpacity>
  )
}
