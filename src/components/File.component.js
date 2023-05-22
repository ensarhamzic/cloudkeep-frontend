import React from "react"
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons"
import {
  DirectoryName,
  FileTouchableOpacity,
} from "../styles/directories.styles"
import { FileType } from "../utils/fileType"

export const File = ({ file }) => {
  const handleFilePress = () => {
    //
  }

  const size = 50
  const color = file.id > 0 ? "gray" : "transparent"

  const fileType = FileType[file.fileType]

  let FileIcon
  switch (fileType) {
    case FileType.IMAGE:
      FileIcon = <Feather name="image" size={size} color={color} />
      break
    case FileType.VIDEO:
      FileIcon = <Feather name="video" size={size} color={color} />
      break
    case FileType.AUDIO:
      FileIcon = <AntDesign name="sound" size={size} color={color} />
      break
    case FileType.DOCUMENT:
      FileIcon = (
        <Ionicons name="document-text-outline" size={size} color={color} />
      )
      break
    case FileType.PDF:
      FileIcon = <AntDesign name="pdffile1" size={size} color={color} />
      break
    case FileType.PRESENTATION:
      FileIcon = (
        <MaterialCommunityIcons
          name="presentation-play"
          size={size}
          color={color}
        />
      )
      break
    case FileType.SPREADSHEET:
      FileIcon = <AntDesign name="table" size={size} color={color} />
      break
    case FileType.ARCHIVE:
      FileIcon = <FontAwesome5 name="file-archive" size={size} color={color} />
      break
    default:
      FileIcon = <AntDesign name="file1" size={size} color={color} />
  }

  return (
    <FileTouchableOpacity onPress={file.id > 0 ? handleFilePress : null}>
      {FileIcon}
      <DirectoryName>{file.name}</DirectoryName>
    </FileTouchableOpacity>
  )
}
