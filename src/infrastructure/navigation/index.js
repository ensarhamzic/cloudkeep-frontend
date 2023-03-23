import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { AuthNavigator } from "./auth.navigator"

export const Navigation = () => {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  )
}
