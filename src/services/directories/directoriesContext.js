import React, { useState, createContext } from "react"
import { ContentType } from "../../utils/contentType"

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
        onContentDelete,
        clearDirectories,
      }}
    >
      {children}
    </DirectoriesContext.Provider>
  )
}
