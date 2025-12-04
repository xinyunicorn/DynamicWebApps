import {createSlice} from "@reduxjs/toolkit"

const themeSlice = createSlice({
  name: "theme",
  initialState: {mode: "light"},
  reducers: {
    toggleThemeRedux: state => {
      state.mode = state.mode === "light" ? "dark" : "light"
    }
  }
})

export const {toggleThemeRedux} = themeSlice.actions
export default themeSlice.reducer
