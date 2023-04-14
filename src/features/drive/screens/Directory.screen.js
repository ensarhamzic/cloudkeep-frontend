import React, { useContext, useEffect, useState } from "react"
import { DirectoriesContext } from "../../../services/directories/directoriesContext"
import { AuthContext } from "../../../services/auth/authContext"
import { FlatList, BackHandler, Text } from "react-native"
import { Directory } from "../../../components/Directory.component"
import { getDirectories } from "../../../services/directories/directories.service"
import { ActivityIndicator } from "react-native-paper"

export const DirectoryScreen = ({ route, navigation }) => {
  const { directories, onDirectoriesLoad, clearDirectories } =
    useContext(DirectoriesContext)
  const { token } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const directoryId = route?.params?.directoryId || null
  const directory = directories.find((dir) => dir.id === directoryId)
  const directoriesLength = directories.length
  console.log("DIRECTORYD ID", directoryId)

  useEffect(() => {
    clearDirectories()
    setIsLoaded(false)
    // console.log("CLEAR DIRS", directoryId)
    // console.log()
  }, [directoryId])

  useEffect(() => {
    ;(async () => {
      // console.log("isLoading: ", isLoading)
      // console.log("isLoaded: ", isLoaded)
      // console.log()
      if (isLoading || !token || isLoaded) return
      console.log("slanje zahteva")
      setIsLoading(true)
      const data = await getDirectories(token, directoryId)
      onDirectoriesLoad(data)
      setIsLoading(false)
      setIsLoaded(true)
    })()
  }, [token, directoriesLength, isLoaded])

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

  const loadingContent = (
    <ActivityIndicator animating={true} color="#000" size="large" />
  )

  return (
    <>
      {isLoading && loadingContent}
      {!isLoading && directories.length === 0 && <Text>No directories</Text>}
      {!isLoading && directories.length > 0 && (
        <FlatList
          data={directories}
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
      )}
    </>
  )
}
