import {useContext, useState} from "react"
import ExpenseForm from "./ExpenseForm"
import ExpenseList from "./ExpenseList"
import FilterBar from "./FilterBar"
import ThemeToggle from "./ThemeToggle"
import ExpenseChart from "./ExpenseChart"
import {useSelector} from "react-redux"
import {ThemeContext} from "./ThemeContext"

export default function AppContent() {
  const {theme} = useContext(ThemeContext) // get current theme
  const [editingExpense, setEditingExpense] = useState(null) // track editing expense
  const expenses = useSelector(state => state.expenses.expenses) // get all expenses from Redux

  // style for the editing panel based on theme
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

  // background for entire app based on theme
  const appBackground = {
    minHeight: "100vh",
    backgroundColor:
      theme === "light" ? "#ffffff" :
      theme === "dark" ? "#222222" :
      "#fff0f5",
    color:
      theme === "light" ? "#222222" :
      theme === "dark" ? "#ffffff" :
      "#333333"
  }

  return (
    <div className={theme} style={appBackground}>
      <div className="container">
        <h1>Personal Financial Tracker</h1>

        <ThemeToggle />
        <FilterBar />

        <div style={{marginTop: "20px"}}>
          <h3>Add New Expense</h3>
          <ExpenseForm />
        </div>

        {/* expenses list and editing panel */}
        <div style={{marginTop: "40px"}}>
          <h2>Expenses</h2>

          {/* show editing panel only when editingExpense is set */}
          {editingExpense &&
            <div style={editingPanelStyle}>
              <h3>Editing Expense</h3>
              <ExpenseForm
                expenseToEdit={editingExpense}
                onEditComplete={() => setEditingExpense(null)} // clear editing after update
              />
            </div>
          }

          {/* display all expenses */}
          <ExpenseList setEditingExpense={setEditingExpense} />
        </div>

        {/* summary graphs */}
        <ExpenseChart expenses={expenses} />
      </div>
    </div>
  )
}
