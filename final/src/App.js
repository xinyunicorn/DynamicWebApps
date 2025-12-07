import {ThemeContextProvider} from "./components/ThemeContext"
import AppContent from "./components/AppContent"

export default function App() {
  return (
    <ThemeContextProvider>
      <AppContent />
    </ThemeContextProvider>
  )
}
