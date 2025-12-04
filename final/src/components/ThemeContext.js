import React, {createContext, useState} from "react"

export const ThemeContext = createContext()

export function ThemeContextProvider({children}) {
  const [theme, setTheme] = useState("light") // default light

  const toggleLightDark = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"))
  }

  const switchColor = () => {
    setTheme("color")
  }

  return (
    <ThemeContext.Provider value={{theme, toggleLightDark, switchColor}}>
      {children}
    </ThemeContext.Provider>
  )
}
