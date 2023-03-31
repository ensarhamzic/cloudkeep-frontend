import React, { useContext, useEffect, useState } from "react"
import { getDirectories } from "../../../services/directories/directories.service"
import { DirectoriesContext } from "../../../services/directories/directoriesContext"
import { AuthContext } from "../../../services/auth/authContext"
import { Text, View } from "react-native"

export const DriveScreen = () => {
  const { onDirectoriesLoad, directories } = useContext(DirectoriesContext)
  const { token } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      if (isLoading || !token) return
      const data = await getDirectories(token)
      onDirectoriesLoad(data)
      setIsLoading(false)
    })()
  }, [isLoading, token])

  console.log(directories)
  return (
    <View>
      <Text>This is My drive screen</Text>
    </View>
  )
}
