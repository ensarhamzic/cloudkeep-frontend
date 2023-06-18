import React, { useRef, useState, useEffect } from "react"
import { ThemeProvider } from "styled-components"
import { theme } from "./src/infrastructure/theme"
import { Navigation } from "./src/infrastructure/navigation"
import { AuthContextProvider } from "./src/services/auth/authContext"
import { DirectoriesContextProvider } from "./src/services/directories/directoriesContext"
import { enableFreeze } from "react-native-screens"
import { RootSiblingParent } from "react-native-root-siblings"
import { NotConnectedText, NotConnectedView } from "./src/styles/ui.styles"
import { UtilsContextProvider } from "./src/services/other/utils.context"
import { AppState } from "react-native"
enableFreeze(true)

export default function App() {
  const appState = useRef(AppState.currentState)
  const [appStateVisible, setAppStateVisible] = useState(appState.current)

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!")
      }

      appState.current = nextAppState
      setAppStateVisible(appState.current)
      console.log("AppState", appState.current)
    })

    return () => {
      subscription.remove()
    }
  }, [])
  return (
    <RootSiblingParent>
      <ThemeProvider theme={theme}>
        <DirectoriesContextProvider>
          <AuthContextProvider>
            <UtilsContextProvider>
              <Navigation />
            </UtilsContextProvider>
          </AuthContextProvider>
        </DirectoriesContextProvider>
      </ThemeProvider>
    </RootSiblingParent>
  )
}
