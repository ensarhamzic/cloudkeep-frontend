import React, { useState, createContext } from "react"
import { ContentType } from "../../utils/contentType"
import { DriveMode } from "../../utils/driveMode"

export const DirectoriesContext = createContext()

export const DirectoriesContextProvider = ({ children }) => {
  const [directories, setDirectories] = useState([])
  const [files, setFiles] = useState([])

  const onDirectoriesLoad = (data) => {
    setDirectories(data.directories)
    setFiles(data.files)
  }

  const onDirectoryAdd = (directory) => {
    setDirectories((prevDirs) => [...prevDirs, directory])
  }

  const onFilesAdd = (files) => {
    setFiles((prevFiles) => [...prevFiles, ...files])
  }

  const onContentDelete = (contents) => {
    const dirs = contents.filter((c) => c.type === ContentType.DIRECTORY)
    const fs = contents.filter((c) => c.type === ContentType.FILE)

    setDirectories((prevDirs) =>
      prevDirs.filter((dir) => !dirs.find((d) => d.id === dir.id))
    )
    setFiles((prevFiles) =>
      prevFiles.filter((file) => !fs.find((f) => f.id === file.id))
    )
  }

  const onContentRename = (content, name) => {
    if (content.type === ContentType.DIRECTORY) {
      setDirectories((prevDirs) =>
        prevDirs.map((dir) => {
          if (dir.id === content.id)
            return { ...dir, name, dateModified: new Date() }
          return dir
        })
      )
    } else {
      setFiles((prevFiles) =>
        prevFiles.map((file) => {
          if (file.id === content.id)
            return { ...file, name, dateModified: new Date() }
          return file
        })
      )
    }
  }

  const onAddRemoveFavorites = (contents) => {
    const dirs = contents.filter((c) => c.type === ContentType.DIRECTORY)
    const fs = contents.filter((c) => c.type === ContentType.FILE)

    setDirectories((prevDirs) =>
      prevDirs.map((dir) => {
        if (dirs.find((d) => d.id === dir.id))
          return { ...dir, favorite: !dir.favorite }
        return dir
      })
    )

    setFiles((prevFiles) =>
      prevFiles.map((file) => {
        if (fs.find((f) => f.id === file.id))
          return { ...file, favorite: !file.favorite }
        return file
      })
    )
  }

  const clearDirectories = () => {
    setDirectories([])
    setFiles([])
  }

  return (
    <DirectoriesContext.Provider
      value={{
        directories,
        files,
        onDirectoriesLoad,
        onDirectoryAdd,
        onFilesAdd,
        onContentRename,
        onContentDelete,
        onAddRemoveFavorites,
        clearDirectories,
      }}
    >
      {children}
    </DirectoriesContext.Provider>
  )
}
