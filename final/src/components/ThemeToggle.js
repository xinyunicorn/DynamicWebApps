import React, {useContext} from "react"
import {ThemeContext} from "./ThemeContext"

export default function ThemeToggle() {
  const {theme, toggleLightDark, switchColor} = useContext(ThemeContext)

  return (
    <div style={{marginBottom:"20px", display:"flex", gap:"10px"}}>
      <button onClick={toggleLightDark}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>

      <button onClick={switchColor}>
        Switch to Color Mode
      </button>
    </div>
  )
}
