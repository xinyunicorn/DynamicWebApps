import {createContext, useState} from "react"

// create a context so the whole app can read the current theme
export const ThemeContext = createContext()

export function ThemeContextProvider({children}) {
  const [theme, setTheme] = useState("light") // light mode by default

  // toggles only between light and dark, ignoring color mode
  const toggleLightDark = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"))
  }

  // switches theme straight into the pastel color mode
  const switchColor = () => {
    setTheme("color")
  }

  return (
    // provide the theme value and functions to the rest of the app
    <ThemeContext.Provider value={{theme, toggleLightDark, switchColor}}>
      {children}
    </ThemeContext.Provider>
  )
}
