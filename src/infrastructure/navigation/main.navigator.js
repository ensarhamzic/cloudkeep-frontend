import React, { useCallback } from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
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
import { SharedNavigator } from "./shared.navigator"
import { SearchNavigator } from "./search.navigator"

const Tab = createBottomTabNavigator()

const TAB_ICONS = {
  Drive: ({ size, color }) => (
    <Entypo name="onedrive" size={size} color={color} />
  ),
  Search: ({ size, color }) => (
    <FontAwesome name="search" size={size} color={color} />
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

export const MainNavigator = () => {
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
        tabBarHideOnKeyboard: true,
        tabBarStyle: [{ display: "flex" }, null],
      }
    },
    [theme]
  )

  return (
    <Tab.Navigator screenOptions={createScreenOptions} backBehavior="none">
      <Tab.Screen name="Drive" component={DirectoryNavigator} />
      <Tab.Screen name="Search" component={SearchNavigator} />
      <Tab.Screen name="Shared" component={SharedNavigator} />
      <Tab.Screen name="Favorites" component={FavoritesNavigator} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  )
}
