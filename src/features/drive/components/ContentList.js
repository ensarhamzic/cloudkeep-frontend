import React, { useContext } from "react"
import { FlatList, Text } from "react-native"
import { Directory } from "../../../components/Directory.component"
import { File } from "../../../components/File.component"
import { ContentType } from "../../../utils/contentType"
import { DriveMode } from "../../../utils/driveMode"
import { DirectoriesContext } from "../../../services/directories/directoriesContext"
import { sortData } from "../../../utils/functions"

export const ContentList = ({
  handleDirectoryPress,
  handleContentLongPress,
  selectedDirectories,
  handleFilePress,
  selectedFiles,
  mode,
  contentToMove,
}) => {
  const {
    directories,
    files,
    favorites,
    favoritesFiles,
    moveDirectories,
    moveFiles,
    sharedDirectories,
    sharedFiles,
    sortType,
    sortOrder,
  } = useContext(DirectoriesContext)
  let dirs = []
  let fs = []
  let content = []

  switch (mode) {
    case DriveMode.DRIVE:
      dirs = directories ? [...directories] : []
      fs = files ? [...files] : []
      break
    case DriveMode.FAVORITES:
      dirs = favorites ? [...favorites] : []
      fs = favoritesFiles ? [...favoritesFiles] : []
      dirs = dirs.filter((dir) => dir.favorite)
      fs = fs.filter((file) => file.favorite)
      break
    case DriveMode.MOVE:
      dirs = moveDirectories ? [...moveDirectories] : []
      fs = moveFiles ? [...moveFiles] : []
      // filter just dirs that are not in contentToMove
      dirs = dirs.filter(
        (dir) =>
          !contentToMove.find(
            (item) => item.id === dir.id && item.type === ContentType.DIRECTORY
          )
      )
      // filter just files that are not in contentToMove
      fs = fs.filter(
        (file) =>
          !contentToMove.find(
            (item) => item.id === file.id && item.type === ContentType.FILE
          )
      )
      break
    case DriveMode.SHARED:
      dirs = sharedDirectories ? [...sharedDirectories] : []
      fs = sharedFiles ? [...sharedFiles] : []
      break
  }

  dirs = [
    ...dirs.map((directory) => ({
      ...directory,
      type: ContentType.DIRECTORY,
    })),
  ]
  dirs = sortData(dirs, sortType, sortOrder)
  if (dirs.length % 2 === 1)
    dirs.push({ id: -1, name: "", type: ContentType.DIRECTORY })

  fs = [...fs.map((file) => ({ ...file, type: ContentType.FILE }))]
  fs = sortData(fs, sortType, sortOrder)
  if (fs.length % 2 === 1) fs.push({ id: -1, name: "", type: ContentType.FILE })

  content = [...dirs, ...fs]
  return (
    <>
      {content.length === 0 && <Text>No content</Text>}
      {content.length > 0 && (
        <FlatList
          data={content}
          renderItem={({ item }) => {
            if (item.type === ContentType.DIRECTORY)
              return (
                <Directory
                  directory={item}
                  onDirectoryPress={handleDirectoryPress}
                  onDirectoryLongPress={handleContentLongPress}
                  selected={selectedDirectories}
                  mode={mode}
                />
              )
            return (
              <File
                file={item}
                onFilePress={handleFilePress}
                onFileLongPress={handleContentLongPress}
                selected={selectedFiles}
                mode={mode}
              />
            )
          }}
          keyExtractor={(item) =>
            item.type === ContentType.DIRECTORY ? `d${item.id}` : `f${item.id}`
          }
          showsHorizontalScrollIndicator={false}
          numColumns={2}
        />
      )}
    </>
  )
}
