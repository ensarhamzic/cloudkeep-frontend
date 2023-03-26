import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { AuthNavigator } from "./auth.navigator"
import { useContext } from "react"
import { AuthContext } from "../../services/auth/authContext"
import { AppNavigator } from "./app.navigator"

export const Navigation = () => {
  const { user, isAuth } = useContext(AuthContext)
  return (
    <NavigationContainer>
      {isAuth && user.verified ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  )
}
