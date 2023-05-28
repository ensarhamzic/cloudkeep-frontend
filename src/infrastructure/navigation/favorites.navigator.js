import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { DirectoryScreen } from "../../features/drive/screens/Directory.screen"
import { DriveMode } from "../../utils/driveMode"

const Stack = createStackNavigator()

export const FavoritesNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FavoriteDirectory"
        component={DirectoryScreen}
        options={{
          title: "Favorites",
          headerTitleAlign: "center",
        }}
        initialParams={{
          mode: DriveMode.FAVORITES,
        }}
      />
    </Stack.Navigator>
  )
}
