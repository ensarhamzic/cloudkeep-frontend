import { ThemeProvider } from "styled-components"
import { theme } from "./src/infrastructure/theme"
import { Navigation } from "./src/infrastructure/navigation"

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navigation />
    </ThemeProvider>
  )
}
