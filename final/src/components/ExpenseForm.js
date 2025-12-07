import {useState, useEffect} from "react"
import {useDispatch} from "react-redux"
import {addExpenseAsync, updateExpenseAsync} from "../store/slices/expensesSlice"

// expense form handles both adding new expenses and editing existing ones
export default function ExpenseForm({expenseToEdit, onEditComplete}) {
  const dispatch = useDispatch()

  // form field states
  const [date, setDate] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("Cash")
  const [description, setDescription] = useState("")

  // if editing mode is active, load the existing expense values into the form
  useEffect(()=>{
    if(expenseToEdit){
      setDate(expenseToEdit.date)
      setAmount(expenseToEdit.amount)
      setCategory(expenseToEdit.category)
      setDescription(expenseToEdit.description)
    }
  }, [expenseToEdit])

  // handles both add + update depending on whether expenseToEdit exists
  const handleSubmit = e => {
    e.preventDefault()

    if(expenseToEdit){
      // update existing expense
      dispatch(updateExpenseAsync({
        ...expenseToEdit,
        date,
        amount: parseFloat(amount),
        category,
        description
      }))
      onEditComplete() // closes editing panel in app.js
    } else {
      // add a brand new expense
      dispatch(addExpenseAsync({
        date,
        amount: parseFloat(amount),
        category,
        description
      }))
    }

    // reset form fields after submit
    setDate("")
    setAmount("")
    setDescription("")
  }

  return (
    <form onSubmit={handleSubmit} className="expense-form">

      {/* date input */}
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        required
      />

      {/* amount input */}
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        required
      />

      {/* category dropdown */}
      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        required
      >
        <option value="Cash">Cash</option>
        <option value="Groceries/Food">Groceries/Food</option>
        <option value="Activities">Activities</option>
        <option value="Bills">Bills</option>
        <option value="Misc">Misc</option>
      </select>

      {/* description input */}
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      {/* button text changes depending on add vs edit mode */}
      <button
        type="submit"
        className="submit-button"
      >
        {expenseToEdit ? "Update" : "Add Expense"}
      </button>
    </form>
  )
}
