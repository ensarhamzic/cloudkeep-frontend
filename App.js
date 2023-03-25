import { ThemeProvider } from "styled-components"
import { theme } from "./src/infrastructure/theme"
import { Navigation } from "./src/infrastructure/navigation"
import { AuthContextProvider } from "./src/services/auth/authContext"

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </ThemeProvider>
  )
}
