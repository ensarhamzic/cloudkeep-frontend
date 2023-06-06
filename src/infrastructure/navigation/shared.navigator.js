import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { DirectoryScreen } from "../../features/drive/screens/Directory.screen"
import { DriveMode } from "../../utils/driveMode"

const Stack = createStackNavigator()

export const SharedNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SharedDirectory"
        component={DirectoryScreen}
        options={{
          title: "Shared",
          headerTitleAlign: "center",
        }}
        initialParams={{
          mode: DriveMode.SHARED,
        }}
      />
    </Stack.Navigator>
  )
}
