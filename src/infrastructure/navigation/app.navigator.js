import React, { useCallback, useContext } from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { DriveScreen } from "../../features/drive/screens/Drive.screen"
import {
  Entypo,
  FontAwesome,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons"
import { useTheme } from "styled-components"
import { DirectoryNavigator } from "./directory.navigator"
import { SettingsScreen } from "../../features/settings/screens/Settings.screen"
import { FavoritesNavigator } from "./favorites.navigator"
import { DirectoriesContext } from "../../services/directories/directoriesContext"
import { DriveMode } from "../../utils/driveMode"

const Tab = createBottomTabNavigator()

const TAB_ICONS = {
  Drive: ({ size, color }) => (
    <Entypo name="onedrive" size={size} color={color} />
  ),
  Shared: ({ size, color }) => (
    <FontAwesome name="share-alt" size={size} color={color} />
  ),
  Favorites: ({ size, color }) => (
    <MaterialIcons name="favorite" size={size} color={color} />
  ),
  Settings: ({ size, color }) => (
    <Ionicons name="settings" size={size} color={color} />
  ),
}

export const AppNavigator = () => {
  const { onTabPress } = useContext(DirectoriesContext)
  const theme = useTheme()

  const createScreenOptions = useCallback(
    ({ route }) => {
      const TabBarIcon = TAB_ICONS[route.name]
      return {
        tabBarIcon: ({ size, color }) => (
          <TabBarIcon size={size} color={color} />
        ),
        tabBarActiveTintColor: theme.colors.brand.primary,
        tabBarInactiveTintColor: theme.colors.darkGray,
        headerShown: false,
      }
    },
    [theme]
  )

  return (
    <Tab.Navigator screenOptions={createScreenOptions} backBehavior="none">
      <Tab.Screen
        name="Drive"
        component={DirectoryNavigator}
        listeners={{ tabPress: () => onTabPress(DriveMode.DRIVE) }}
      />
      <Tab.Screen name="Shared" component={DriveScreen} />
      <Tab.Screen
        name="Favorites"
        component={FavoritesNavigator}
        listeners={{ tabPress: () => onTabPress(DriveMode.FAVORITES) }}
      />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  )
}
