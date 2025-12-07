import {createSlice} from "@reduxjs/toolkit"

// slice for handling theme mode (light/dark) using redux
const themeSlice = createSlice({
  name: "theme",
  initialState: {mode: "light"}, // default to light mode
  reducers: {
    toggleThemeRedux: state => {
      // flip between light and dark whenever button is clicked
      state.mode = state.mode === "light" ? "dark" : "light"
    }
  }
})

export const {toggleThemeRedux} = themeSlice.actions
export default themeSlice.reducer
