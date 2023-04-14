import React, { useState, createContext } from "react"

export const DirectoriesContext = createContext()

export const DirectoriesContextProvider = ({ children }) => {
  const [directories, setDirectories] = useState([])

  const onDirectoriesLoad = (directories) => {
    setDirectories(directories)
  }

  const onDirectoryAdd = (directory) => {
    setDirectories([...directories, directory])
  }

  const clearDirectories = () => {
    setDirectories([])
  }

  return (
    <DirectoriesContext.Provider
      value={{
        directories,
        onDirectoriesLoad,
        onDirectoryAdd,
        clearDirectories,
      }}
    >
      {children}
    </DirectoriesContext.Provider>
  )
}
