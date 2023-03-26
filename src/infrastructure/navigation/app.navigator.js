import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { DriveScreen } from "../../features/drive/screens/Drive.screen"
import {
  Entypo,
  FontAwesome,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons"
import { useTheme } from "styled-components"

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

const createScreenOptions = ({ route }) => {
  const theme = useTheme()
  const TabBarIcon = TAB_ICONS[route.name]
  return {
    tabBarIcon: ({ size, color }) => <TabBarIcon size={size} color={color} />,
    tabBarActiveTintColor: theme.colors.brand.primary,
    tabBarInactiveTintColor: theme.colors.darkGray,
  }
}

export const AppNavigator = () => {
  const theme = useTheme()
  return (
    <Tab.Navigator screenOptions={createScreenOptions}>
      <Tab.Screen name="Drive" component={DriveScreen} />
      <Tab.Screen name="Shared" component={DriveScreen} />
      <Tab.Screen name="Favorites" component={DriveScreen} />
      <Tab.Screen name="Settings" component={DriveScreen} />
    </Tab.Navigator>
  )
}
