import {useContext} from "react"
import {ThemeContext} from "./ThemeContext"

export default function ThemeToggle() {
  const {theme, toggleLightDark, switchColor} = useContext(ThemeContext) 

  return (
    <div style={{marginBottom: "20px", display: "flex", gap: "10px"}}>
      
      {/* button that switches only between light and dark */}
      <button onClick={toggleLightDark}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>

      {/* button that switches to the pastel color theme */}
      <button onClick={switchColor}>
        Switch to Color Mode
      </button>
    </div>
  )
}
