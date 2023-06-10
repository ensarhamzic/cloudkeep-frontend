import React from "react"
import { ThemeProvider } from "styled-components"
import { theme } from "./src/infrastructure/theme"
import { Navigation } from "./src/infrastructure/navigation"
import { AuthContextProvider } from "./src/services/auth/authContext"
import { DirectoriesContextProvider } from "./src/services/directories/directoriesContext"
import { enableFreeze } from "react-native-screens"
enableFreeze(true)

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <DirectoriesContextProvider>
        <AuthContextProvider>
          <Navigation />
        </AuthContextProvider>
      </DirectoriesContextProvider>
    </ThemeProvider>
  )
}
