import React, { useState, createContext } from "react"
import { ContentType } from "../../utils/contentType"
import { DriveMode } from "../../utils/driveMode"

export const DirectoriesContext = createContext()

export const DirectoriesContextProvider = ({ children }) => {
  const [recentMode, setRecentMode] = useState(DriveMode.DRIVE)
  const [currentDirectory, setCurrentDirectory] = useState(null)
  const [directories, setDirectories] = useState([])
  const [files, setFiles] = useState([])

  const [currentFavoritesDirectory, setCurrentFavoritesDirectory] =
    useState(null)
  const [favorites, setFavorites] = useState([])
  const [favoritesFiles, setFavoritesFiles] = useState([])

  const onTabPress = (mode) => {
    setRecentMode(mode)
  }

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
    }
  }

  const onDirectoryAdd = (directory, mode) => {
    if (currentDirectory?.id === currentFavoritesDirectory?.id) {
      setDirectories((prevDirs) => [...prevDirs, directory])
      setFavorites((prevDirs) => [...prevDirs, directory])
    } else {
      switch (mode) {
        case DriveMode.DRIVE:
          setDirectories((prevDirs) => [...prevDirs, directory])
          break
        case DriveMode.FAVORITES:
          setFavorites((prevDirs) => [...prevDirs, directory])
          break
      }
    }
  }

  const onFilesAdd = (files, mode) => {
    if (currentDirectory?.id === currentFavoritesDirectory?.id) {
      setFiles((prevFiles) => [...prevFiles, ...files])
      setFavoritesFiles((prevFiles) => [...prevFiles, ...files])
    } else {
      switch (mode) {
        case DriveMode.DRIVE:
          setFiles((prevFiles) => [...prevFiles, ...files])
          break
        case DriveMode.FAVORITES:
          setFavoritesFiles((prevFiles) => [...prevFiles, ...files])
          break
      }
    }
  }

  const onContentDelete = (contents, mode) => {
    const dirs = contents.filter((c) => c.type === ContentType.DIRECTORY)
    const fs = contents.filter((c) => c.type === ContentType.FILE)

    if (currentDirectory?.id === currentFavoritesDirectory?.id) {
      setDirectories((prevDirs) =>
        prevDirs.filter((dir) => !dirs.find((d) => d.id === dir.id))
      )
      setFiles((prevFiles) =>
        prevFiles.filter((file) => !fs.find((f) => f.id === file.id))
      )
      setFavorites((prevDirs) =>
        prevDirs.filter((dir) => !dirs.find((d) => d.id === dir.id))
      )
      setFavoritesFiles((prevFiles) =>
        prevFiles.filter((file) => !fs.find((f) => f.id === file.id))
      )
    } else {
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
  }

  const onContentRename = (content, name, mode) => {
    if (content.type === ContentType.DIRECTORY) {
      if (currentDirectory?.id === currentFavoritesDirectory?.id) {
        setDirectories((prevDirs) =>
          prevDirs.map((dir) => {
            if (dir.id === content.id) return { ...dir, name }
            return dir
          })
        )
        setFavorites((prevDirs) =>
          prevDirs.map((dir) => {
            if (dir.id === content.id) return { ...dir, name }
            return dir
          })
        )
      } else {
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
      }
    } else {
      if (currentDirectory?.id === currentFavoritesDirectory?.id) {
        setFiles((prevFiles) =>
          prevFiles.map((file) => {
            if (file.id === content.id) return { ...file, name }
            return file
          })
        )
        setFavoritesFiles((prevFiles) =>
          prevFiles.map((file) => {
            if (file.id === content.id) return { ...file, name }
            return file
          })
        )
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
  }

  const onAddRemoveFavorites = (contents) => {
    const dirs = contents.filter((c) => c.type === ContentType.DIRECTORY)
    const fs = contents.filter((c) => c.type === ContentType.FILE)

    let newDirs = [...directories]
    let newFiles = [...files]

    let newFavorites = [...favorites]
    let newFavoritesFiles = [...favoritesFiles]

    newDirs = newDirs.map((dir) => {
      if (dirs.find((d) => d.id === dir.id))
        return { ...dir, favorite: !dir.favorite }
      return dir
    })

    newFiles = newFiles.map((file) => {
      if (fs.find((f) => f.id === file.id))
        return { ...file, favorite: !file.favorite }
      return file
    })

    if (!currentFavoritesDirectory) {
      newFavorites = newFavorites.map((dir) => {
        if (dirs.find((d) => d.id === dir.id))
          return { ...dir, favorite: !dir.favorite }
        return dir
      })

      newFavorites = newFavorites.filter((dir) => dir.favorite)

      for (const dir of newDirs) {
        const index = newFavorites.findIndex(
          (d) => d.id === dir.id && dir.favorite
        )
        if (index === -1) {
          newFavorites.push({ ...dir })
        }
      }

      newFavoritesFiles = newFavoritesFiles.map((file) => {
        if (fs.find((f) => f.id === file.id))
          return { ...file, favorite: !file.favorite }
        return file
      })

      newFavoritesFiles = newFavoritesFiles.filter((file) => file.favorite)

      for (const file of newFiles) {
        const index = newFavoritesFiles.findIndex(
          (f) => f.id === file.id && file.favorite
        )
        if (index === -1) {
          newFavoritesFiles.push({ ...file })
        }
      }
    }

    setDirectories(newDirs)
    setFiles(newFiles)
    setFavorites(newFavorites)
    setFavoritesFiles(newFavoritesFiles)
  }

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
    }
  }

  return (
    <DirectoriesContext.Provider
      value={{
        recentMode,
        currentDirectory,
        directories,
        files,
        currentFavoritesDirectory,
        favorites,
        favoritesFiles,
        onTabPress,
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
