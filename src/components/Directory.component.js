import React from "react"
import { Entypo } from "@expo/vector-icons"
import {
  DirectoryName,
  DirectoryView,
} from "../features/drive/components/directories.styles"

export const Directory = ({ name }) => {
  return (
    <DirectoryView>
      <Entypo name="folder" size={120} color="gray" />
      <DirectoryName>{name}</DirectoryName>
    </DirectoryView>
  )
}
