import React, {useState, useEffect} from "react"
import {useDispatch} from "react-redux"
import {addExpenseAsync, updateExpenseAsync} from "../store/slices/expensesSlice"

export default function ExpenseForm({expenseToEdit, onEditComplete}) {
  const dispatch = useDispatch()

  const [date, setDate] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("Cash")
  const [description, setDescription] = useState("")

  useEffect(()=>{
    if(expenseToEdit){
      setDate(expenseToEdit.date)
      setAmount(expenseToEdit.amount)
      setCategory(expenseToEdit.category)
      setDescription(expenseToEdit.description)
    }
  }, [expenseToEdit])

  const handleSubmit = e => {
    e.preventDefault()

    if(expenseToEdit){
      dispatch(updateExpenseAsync({
        ...expenseToEdit,
        date,
        amount: parseFloat(amount),
        category,
        description
      }))
      onEditComplete()
    } else {
      dispatch(addExpenseAsync({
        date,
        amount: parseFloat(amount),
        category,
        description
      }))
    }

    setDate("")
    setAmount("")
    setDescription("")
  }

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        required
      />

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

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <button
        type="submit"
        className="submit-button"
      >
        {expenseToEdit ? "Update" : "Add Expense"}
      </button>
    </form>
  )
}
