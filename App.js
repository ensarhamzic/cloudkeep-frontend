import React from "react"
import { ThemeProvider } from "styled-components"
import { theme } from "./src/infrastructure/theme"
import { Navigation } from "./src/infrastructure/navigation"
import { AuthContextProvider } from "./src/services/auth/authContext"
import { DirectoriesContextProvider } from "./src/services/directories/directoriesContext"
import { enableFreeze } from "react-native-screens"
import { RootSiblingParent } from "react-native-root-siblings"
import { NotConnectedText, NotConnectedView } from "./src/styles/ui.styles"
import { UtilsContextProvider } from "./src/services/other/utils.context"
enableFreeze(true)

export default function App() {
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
