import {ThemeContextProvider} from "./components/ThemeContext"
import AppContent from "./components/AppContent" // updated path

export default function App() {
  return (
    <ThemeContextProvider>
      <AppContent />
    </ThemeContextProvider>
  )
}
