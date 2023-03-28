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

  return (
    <DirectoriesContext.Provider
      value={{
        directories,
        onDirectoriesLoad,
        onDirectoryAdd,
      }}
    >
      {children}
    </DirectoriesContext.Provider>
  )
}
