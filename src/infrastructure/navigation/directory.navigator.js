import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { DirectoryScreen } from "../../features/drive/screens/Directory.screen"
import { DriveMode } from "../../utils/driveMode"

const Stack = createStackNavigator()

export const DirectoryNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Directory"
        component={DirectoryScreen}
        options={{
          title: "Drive",
          headerTitleAlign: "center",
        }}
        initialParams={{
          mode: DriveMode.DRIVE,
        }}
      />
    </Stack.Navigator>
  )
}
