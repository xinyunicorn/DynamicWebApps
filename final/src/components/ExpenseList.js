import React, {useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import {fetchExpenses, deleteExpenseAsync} from "../store/slices/expensesSlice"

export default function ExpenseList({setEditingExpense}) {
  const dispatch = useDispatch()
  const {expenses, filters} = useSelector(state => state.expenses)

  useEffect(()=>{
    dispatch(fetchExpenses())
  }, [dispatch])

  let filtered = expenses.filter(exp => {
    if(filters.category && exp.category !== filters.category) return false
    if(filters.search && !exp.description.toLowerCase().includes(filters.search.toLowerCase()))
      return false
    return true
  })

  filtered = filtered.sort((a, b) => {
    if(filters.sortOrder === "recent") return new Date(b.date) - new Date(a.date)
    return new Date(a.date) - new Date(b.date)
  })

  return (
    <div style={{marginTop:"10px"}}>
      {filtered.length === 0 && <p>No expenses found</p>}

      {filtered.map(e => (
        <div key={e.id} style={{borderBottom:"1px solid #aaa", padding:"10px 0"}}>
          <p><strong>[{e.category}]</strong></p>
          <p><strong>Date:</strong> {e.date}</p>
          <p><strong>Amount:</strong> ${e.amount}</p>
          <p><strong>Note:</strong> {e.description}</p>

          <button
            className="submit-button2"
            onClick={() => dispatch(deleteExpenseAsync(e.id))}
          >
            Delete
          </button>

          <button
            className="submit-button2"
            onClick={() => setEditingExpense(e)}
          >
            Update
          </button>
        </div>
      ))}
    </div>
  )
}
