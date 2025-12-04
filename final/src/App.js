import React, {useContext, useEffect} from "react"
import ExpenseForm from "./components/ExpenseForm"
import ExpenseList from "./components/ExpenseList"
import FilterBar from "./components/FilterBar"
import ThemeToggle from "./components/ThemeToggle"

import {ThemeContextProvider, ThemeContext} from "./components/ThemeContext"

function AppWrapper() {
  return (
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  )
}

function App() {
  const {theme} = useContext(ThemeContext)

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  return (
    <div className={theme}>
      <div className="container">
        <h1>Personal Financial Tracker</h1>

        <ThemeToggle />
        <FilterBar />
        <ExpenseForm />
        <ExpenseList />
      </div>
    </div>
  )
}

export default AppWrapper
