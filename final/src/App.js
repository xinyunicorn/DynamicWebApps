import React, {useContext, useState} from "react"
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
  const [editingExpense, setEditingExpense] = useState(null)

  const editingPanelStyle = {
    marginTop: "10px",
    padding: "10px",
    borderRadius: "5px",
    border: theme === "color" ? "1px solid #8a5451" : "1px solid #ccc",
    backgroundColor:
      theme === "light" ? "#f5f5f5" :
      theme === "dark" ? "#2a2a2a" :
      "#dab9b7ff",
    color: theme === "dark" ? "#f5f5f5" : "#333"
  }

  return (
    <div className={theme} style={{minHeight:"100vh"}}>
      <div className="container">
        <h1>Personal Financial Tracker</h1>

        <ThemeToggle />

        <FilterBar />

        <div style={{marginTop:"20px"}}>
          <h3>Add New Expense</h3>
          <ExpenseForm />
        </div>

        <div style={{marginTop:"40px"}}>
          <h2>Expenses</h2>

          {editingExpense && 
            <div style={editingPanelStyle}>
              <h3>Editing Expense</h3>
              <ExpenseForm
                expenseToEdit={editingExpense}
                onEditComplete={() => setEditingExpense(null)}
              />
            </div>
          }

          <ExpenseList setEditingExpense={setEditingExpense} />
        </div>
      </div>
    </div>
  )
}

export default AppWrapper
