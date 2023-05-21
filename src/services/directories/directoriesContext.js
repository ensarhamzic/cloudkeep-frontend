import React, { useState, createContext } from "react"

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
        clearDirectories,
      }}
    >
      {children}
    </DirectoriesContext.Provider>
  )
}
