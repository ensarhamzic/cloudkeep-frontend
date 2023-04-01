import React, { useContext, useEffect, useState } from "react"
import { getDirectories } from "../../../services/directories/directories.service"
import { DirectoriesContext } from "../../../services/directories/directoriesContext"
import { AuthContext } from "../../../services/auth/authContext"
import { FlatList } from "react-native"
import { Directory } from "../../../components/Directory.component"

export const DriveScreen = () => {
  const { onDirectoriesLoad, directories } = useContext(DirectoriesContext)
  const { token } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [parentDirectory, setParentDirectory] = useState(null)

  useEffect(() => {
    ;(async () => {
      if (isLoading || !token) return
      const data = await getDirectories(token)
      onDirectoriesLoad(data)
      setIsLoading(false)
    })()
  }, [isLoading, token])

  const filteredDirectories = directories.filter(
    (dir) => dir.parentDirectory === parentDirectory
  )

  const handleDirectoryPress = (id) => {
    setParentDirectory(id)
  }

  return (
    <FlatList
      data={filteredDirectories}
      renderItem={({ item }) => (
        <Directory
          id={item.id}
          name={item.name}
          onDirectoryPress={handleDirectoryPress}
        />
      )}
      keyExtractor={(item) => `${item.id}`}
      showsHorizontalScrollIndicator={false}
      numColumns={2}
    />
  )
}
