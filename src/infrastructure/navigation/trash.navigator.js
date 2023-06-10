import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { DirectoryScreen } from "../../features/drive/screens/Directory.screen"
import { DriveMode } from "../../utils/driveMode"

const Stack = createStackNavigator()

export const TrashNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TrashDirectory"
        component={DirectoryScreen}
        options={{
          title: "Trash",
          headerTitleAlign: "center",
        }}
        initialParams={{
          mode: DriveMode.TRASH,
        }}
      />
    </Stack.Navigator>
  )
}
