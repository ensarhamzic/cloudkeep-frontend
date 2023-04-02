import React, { useContext, useEffect } from "react"
import { DirectoriesContext } from "../../../services/directories/directoriesContext"
import { FlatList, BackHandler } from "react-native"
import { Directory } from "../../../components/Directory.component"

export const DirectoryScreen = ({ route, navigation }) => {
  const { directories } = useContext(DirectoriesContext)
  const directoryId = route?.params?.directoryId || null
  const directory = directories.find((dir) => dir.id === directoryId)

  const filteredDirs = directories.filter(
    (dir) => dir.parentDirectory === directoryId
  )

  const handleDirectoryPress = (directoryId) => {
    navigation.navigate("Directory", { directoryId })
  }

  useEffect(() => {
    const backButtonHandler = () => {
      navigation.navigate("Directory", {
        directoryId: directory?.parentDirectory,
      })
      return true
    }
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backButtonHandler
    )

    // Remove back button listener on unmount
    return () => backHandler.remove()
  })

  return (
    <FlatList
      data={filteredDirs}
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
