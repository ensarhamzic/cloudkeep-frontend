import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

const Stack = createStackNavigator()

export const DirectoryNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Drive" component={DirectoriesScreen} />
    </Stack.Navigator>
  )
}
