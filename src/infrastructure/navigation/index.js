import React, { useContext, useEffect, useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { AuthNavigator } from "./auth.navigator"
import { AuthContext } from "../../services/auth/authContext"
import { AppNavigator } from "./app.navigator"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { verifyTokenRequest } from "../../services/auth/auth.service"
import { ActivityIndicator } from "react-native-paper"
import { Text } from "react-native"
import { CenteredActivityIndicator } from "../../styles/ui.styles"
import { MoveContentNavigator } from "./moveContent.navigator"

export const Navigation = () => {
  const [isInitial, setIsInitial] = useState(true)

  const { onAuth } = useContext(AuthContext)
  useEffect(() => {
    ;(async () => {
      const token = await AsyncStorage.getItem("token")
      if (token) {
        const response = await verifyTokenRequest(token)
        if (!response.error) {
          onAuth(response)
          setIsInitial(false)
          return
        }
      }
      await AsyncStorage.removeItem("token")
      setIsInitial(false)
    })()
  }, [])

  const { user, isAuth } = useContext(AuthContext)
  return (
    <NavigationContainer>
      {isInitial && <CenteredActivityIndicator />}
      {!isInitial && isAuth && user.verified ? (
        <AppNavigator />
      ) : (
        !isInitial && <AuthNavigator />
      )}
    </NavigationContainer>
  )
}
