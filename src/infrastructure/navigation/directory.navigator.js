import React, { useEffect, useState, useContext } from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { DirectoryScreen } from "../../features/drive/screens/Directory.screen"
import { AuthContext } from "../../services/auth/authContext"
import { DirectoriesContext } from "../../services/directories/directoriesContext"
import { getDirectories } from "../../services/directories/directories.service"

const Stack = createStackNavigator()

export const DirectoryNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Directory" component={DirectoryScreen} />
    </Stack.Navigator>
  )
}
