import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { DirectoryScreen } from "../../features/drive/screens/Directory.screen"

const Stack = createStackNavigator()

export const DirectoryNavigator = () => {
  return (
    <Stack.Navigator
    // screenOptions={{
    //   headerShown: false,
    // }}
    >
      <Stack.Screen
        name="Directory"
        component={DirectoryScreen}
        options={{
          title: "Drive",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  )
}
