import React, { useState, useEffect } from "react"
import { ThemeProvider } from "styled-components"
import { theme } from "./src/infrastructure/theme"
import { Navigation } from "./src/infrastructure/navigation"
import { AuthContextProvider } from "./src/services/auth/authContext"
import { DirectoriesContextProvider } from "./src/services/directories/directoriesContext"
import { enableFreeze } from "react-native-screens"
import { RootSiblingParent } from "react-native-root-siblings"
import NetInfo from "@react-native-community/netinfo"
enableFreeze(true)

export default function App() {
  const [isConnected, setIsConnected] = useState(true)

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  console.log("isConnected", isConnected)

  return (
    <RootSiblingParent>
      <ThemeProvider theme={theme}>
        <DirectoriesContextProvider>
          <AuthContextProvider>
            <Navigation />
          </AuthContextProvider>
        </DirectoriesContextProvider>
      </ThemeProvider>
    </RootSiblingParent>
  )
}
