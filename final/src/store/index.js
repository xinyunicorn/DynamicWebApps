import {configureStore} from "@reduxjs/toolkit"
import expensesReducer from "./slices/expensesSlice"
import themeReducer from "./slices/themeSlice"

// creates the main redux store that holds all global state
export default configureStore({
  reducer: {
    // handles all expense data (list, filters, async actions)
    expenses: expensesReducer,

    // handles the theme mode stored in redux
    theme: themeReducer
  }
})
