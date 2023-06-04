import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { DirectoryScreen } from "../../features/drive/screens/Directory.screen"
import { DriveMode } from "../../utils/driveMode"

const Stack = createStackNavigator()

export const MoveContentNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MoveContentDirectory"
        component={DirectoryScreen}
        options={{
          title: "Move Content",
          headerTitleAlign: "center",
        }}
        initialParams={{
          mode: DriveMode.MOVE,
        }}
      />
    </Stack.Navigator>
  )
}
