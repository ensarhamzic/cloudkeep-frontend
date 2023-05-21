import React from "react"
import { AntDesign } from "@expo/vector-icons"
import {
  DirectoryName,
  FileTouchableOpacity,
} from "../styles/directories.styles"

export const File = ({ file }) => {
  const handleFilePress = () => {
    //
  }

  return (
    <FileTouchableOpacity onPress={file.id > 0 ? handleFilePress : null}>
      <AntDesign
        name="filetext1"
        size={50}
        color={file.id > 0 ? "gray" : "transparent"}
      />
      <DirectoryName>{file.name}</DirectoryName>
    </FileTouchableOpacity>
  )
}
