import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import { LoginScreen } from "../../features/auth/screens/Login.screen"
import { RegisterScreen } from "../../features/auth/screens/Register.screen"

const Stack = createStackNavigator()

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  )
}
