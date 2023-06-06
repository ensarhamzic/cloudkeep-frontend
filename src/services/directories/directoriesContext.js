import React, { useState, createContext } from "react"
import { ContentType } from "../../utils/contentType"
import { DriveMode } from "../../utils/driveMode"

export const DirectoriesContext = createContext()

export const DirectoriesContextProvider = ({ children }) => {
  const [currentDirectory, setCurrentDirectory] = useState(null)
  const [directories, setDirectories] = useState([])
  const [files, setFiles] = useState([])

  const [currentFavoritesDirectory, setCurrentFavoritesDirectory] =
    useState(null)
  const [favorites, setFavorites] = useState([])
  const [favoritesFiles, setFavoritesFiles] = useState([])

  const [currentMoveDirectory, setCurrentMoveDirectory] = useState(null)
  const [moveDirectories, setMoveDirectories] = useState([])

  const onDirectoriesLoad = (data, mode) => {
    switch (mode) {
      case DriveMode.DRIVE:
        setCurrentDirectory(data.currentDirectory)
        setDirectories(data.directories)
        setFiles(data.files)
        break
      case DriveMode.FAVORITES:
        setCurrentFavoritesDirectory(data.currentDirectory)
        setFavorites(data.directories)
        setFavoritesFiles(data.files)
        break
      case DriveMode.MOVE:
        setCurrentMoveDirectory(data.currentDirectory)
        setMoveDirectories(data.directories)
        break
    }
  }

  const onDirectoryAdd = (directory, mode) => {
    switch (mode) {
      case DriveMode.DRIVE:
        setDirectories((prevDirs) => [...prevDirs, directory])
        break
      case DriveMode.FAVORITES:
        setFavorites((prevDirs) => [...prevDirs, directory])
        break
    }
  }

  const onFilesAdd = (files, mode) => {
    switch (mode) {
      case DriveMode.DRIVE:
        setFiles((prevFiles) => [...prevFiles, ...files])
        break
      case DriveMode.FAVORITES:
        setFavoritesFiles((prevFiles) => [...prevFiles, ...files])
        break
    }
  }

  const onContentDelete = (contents, mode) => {
    const dirs = contents.filter((c) => c.type === ContentType.DIRECTORY)
    const fs = contents.filter((c) => c.type === ContentType.FILE)

    switch (mode) {
      case DriveMode.DRIVE:
        setDirectories((prevDirs) =>
          prevDirs.filter((dir) => !dirs.find((d) => d.id === dir.id))
        )
        setFiles((prevFiles) =>
          prevFiles.filter((file) => !fs.find((f) => f.id === file.id))
        )
        break
      case DriveMode.FAVORITES:
        setFavorites((prevDirs) =>
          prevDirs.filter((dir) => !dirs.find((d) => d.id === dir.id))
        )
        setFavoritesFiles((prevFiles) =>
          prevFiles.filter((file) => !fs.find((f) => f.id === file.id))
        )
        break
    }
  }

  const onContentRename = (content, name, mode) => {
    if (content.type === ContentType.DIRECTORY) {
      switch (mode) {
        case DriveMode.DRIVE:
          setDirectories((prevDirs) =>
            prevDirs.map((dir) => {
              if (dir.id === content.id) return { ...dir, name }
              return dir
            })
          )
          break
        case DriveMode.FAVORITES:
          setFavorites((prevDirs) =>
            prevDirs.map((dir) => {
              if (dir.id === content.id) return { ...dir, name }
              return dir
            })
          )
          break
      }
    } else {
      switch (mode) {
        case DriveMode.DRIVE:
          setFiles((prevFiles) =>
            prevFiles.map((file) => {
              if (file.id === content.id) return { ...file, name }
              return file
            })
          )
          break
        case DriveMode.FAVORITES:
          setFavoritesFiles((prevFiles) =>
            prevFiles.map((file) => {
              if (file.id === content.id) return { ...file, name }
              return file
            })
          )
          break
      }
    }
  }

  const onAddRemoveFavorites = (contents, mode) => {
    const dirs = contents.filter((c) => c.type === ContentType.DIRECTORY)
    const fs = contents.filter((c) => c.type === ContentType.FILE)

    switch (mode) {
      case DriveMode.DRIVE:
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
        break
      case DriveMode.FAVORITES:
        setFavorites((prevDirs) =>
          prevDirs.map((dir) => {
            if (dirs.find((d) => d.id === dir.id))
              return { ...dir, favorite: !dir.favorite }
            return dir
          })
        )

        setFavoritesFiles((prevFiles) =>
          prevFiles.map((file) => {
            if (fs.find((f) => f.id === file.id))
              return { ...file, favorite: !file.favorite }
            return file
          })
        )
        break
    }
  }

  const onContentShare = (content, users, mode) => {}

  const clearDirectories = (mode) => {
    switch (mode) {
      case DriveMode.DRIVE:
        setCurrentDirectory(null)
        setDirectories([])
        setFiles([])
        break
      case DriveMode.FAVORITES:
        setCurrentFavoritesDirectory(null)
        setFavorites([])
        setFavoritesFiles([])
        break
      case DriveMode.MOVE:
        setCurrentMoveDirectory(null)
        setMoveDirectories([])
    }
  }

  return (
    <DirectoriesContext.Provider
      value={{
        currentDirectory,
        directories,
        files,
        currentFavoritesDirectory,
        favorites,
        favoritesFiles,
        currentMoveDirectory,
        moveDirectories,
        onDirectoriesLoad,
        onDirectoryAdd,
        onFilesAdd,
        onContentRename,
        onContentDelete,
        onAddRemoveFavorites,
        clearDirectories,
        onContentShare,
      }}
    >
      {children}
    </DirectoriesContext.Provider>
  )
}
