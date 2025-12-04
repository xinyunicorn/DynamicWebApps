import {configureStore} from "@reduxjs/toolkit"
import expensesReducer from "./slices/expensesSlice"
import themeReducer from "./slices/themeSlice"

export default configureStore({
  reducer: {
    expenses: expensesReducer,
    theme: themeReducer
  }
})
