import styled, { ThemeProvider } from "styled-components"
import { theme } from "./src/infrastructure/theme"
import { LoginScreen } from "./src/features/auth/screens/Login.screen"
import { Navigation } from "./src/infrastructure/navigation"

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navigation />
    </ThemeProvider>
  )
}
