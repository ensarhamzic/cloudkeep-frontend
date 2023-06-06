import React from "react"
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons"
import { DirectoryName, FilePressable } from "../styles/directories.styles"
import { FileType } from "../utils/fileType"
import {
  FavoriteFileView,
  SelectedFileView,
  SharedFileView,
} from "../styles/ui.styles"
import { ContentType } from "../utils/contentType"
import * as Haptics from "expo-haptics"
import { DriveMode } from "../utils/driveMode"

export const File = ({
  file,
  onFilePress,
  onFileLongPress,
  selected,
  mode,
}) => {
  const handleFilePress = () => {
    onFilePress(file.id)
  }

  const handleFileLongPress = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
    onFileLongPress({ id: file.id, type: ContentType.FILE })
  }

  const isSelected = selected.find((item) => item.id === file.id)

  const size = 50
  const color = file.id > 0 ? (isSelected ? "black" : "gray") : "transparent"

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
    <FilePressable
      onPress={file.id > 0 ? handleFilePress : null}
      onLongPress={file.id > 0 ? handleFileLongPress : null}
    >
      {isSelected && (
        <SelectedFileView>
          <AntDesign name="checkcircle" size={35} color="lightgreen" />
        </SelectedFileView>
      )}
      {mode !== DriveMode.SHARED && file.favorite && (
        <FavoriteFileView>
          <AntDesign name="star" size={25} color="gold" />
        </FavoriteFileView>
      )}
      {mode !== DriveMode.SHARED && file.shared && (
        <SharedFileView>
          <MaterialIcons
            name="supervisor-account"
            size={25}
            color={isSelected ? "gray" : "black"}
          />
        </SharedFileView>
      )}
      {FileIcon}
      <DirectoryName numberOfLines={2}>{file.name}</DirectoryName>
    </FilePressable>
  )
}
