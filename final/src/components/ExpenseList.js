import {useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import {fetchExpenses, deleteExpenseAsync} from "../store/slices/expensesSlice"

// displays the list of expenses and handles filtering, sorting, deleting, and starting edit mode
export default function ExpenseList({setEditingExpense}) {
  const dispatch = useDispatch()

  // get all expenses + filter settings from redux store
  const {expenses, filters} = useSelector(state => state.expenses)

  // load expenses from json server when component mounts
  useEffect(()=>{
    dispatch(fetchExpenses())
  }, [dispatch])

  // apply category + search filters
  let filtered = expenses.filter(exp => {
    // filter by category if one is selected
    if(filters.category && exp.category !== filters.category) return false

    // filter by description search text
    if(filters.search && !exp.description.toLowerCase().includes(filters.search.toLowerCase()))
      return false

    return true
  })

  // sort by newest or oldest depending on filter setting
  filtered = filtered.sort((a, b) => {
    if(filters.sortOrder === "recent") return new Date(b.date) - new Date(a.date)
    return new Date(a.date) - new Date(b.date)
  })

  return (
    <div style={{marginTop:"10px"}}>
      
      {/* if no expenses match filters, show a message */}
      {filtered.length === 0 && <p>No expenses found</p>}

      {/* render each expense entry */}
      {filtered.map(e => (
        <div key={e.id} style={{borderBottom:"1px solid #aaa", padding:"10px 0"}}>

          {/* category */}
          <p><strong>[{e.category}]</strong></p>

          {/* date */}
          <p><strong>Date:</strong> {e.date}</p>

          {/* amount */}
          <p><strong>Amount:</strong> ${e.amount}</p>

          {/* description */}
          <p><strong>Note:</strong> {e.description}</p>

          {/* delete button */}
          <button
            className="submit-button2"
            onClick={() => dispatch(deleteExpenseAsync(e.id))}
          >
            Delete
          </button>

          {/* update button - opens edit form */}
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
