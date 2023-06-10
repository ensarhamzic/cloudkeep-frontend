import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { DirectoryScreen } from "../../features/drive/screens/Directory.screen"
import { DriveMode } from "../../utils/driveMode"

const Stack = createStackNavigator()

export const SearchNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchDirectory"
        component={DirectoryScreen}
        options={{
          title: "Search",
          headerTitleAlign: "center",
        }}
        initialParams={{
          mode: DriveMode.SEARCH,
        }}
      />
    </Stack.Navigator>
  )
}
