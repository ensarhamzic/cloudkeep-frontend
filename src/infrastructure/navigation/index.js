import React, { useContext, useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { AuthNavigator } from "./auth.navigator"
import { AuthContext } from "../../services/auth/authContext"
import { AppNavigator } from "./app.navigator"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { verifyTokenRequest } from "../../services/auth/auth.service"

export const Navigation = () => {
  const { onAuth } = useContext(AuthContext)
  useEffect(() => {
    ;(async () => {
      const token = await AsyncStorage.getItem("token")
      if (token) {
        const response = await verifyTokenRequest(token)
        if (!response.error) {
          onAuth(response)
          return
        }
      }
      await AsyncStorage.removeItem("token")
    })()
  }, [])

  const { user, isAuth } = useContext(AuthContext)
  return (
    <NavigationContainer>
      {isAuth && user.verified ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  )
}
