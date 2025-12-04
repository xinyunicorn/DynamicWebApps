import React,{useState} from "react"
import {useDispatch} from "react-redux"
import {addExpenseAsync} from "../store/slices/expensesSlice"

export default function ExpenseForm() {
  const dispatch = useDispatch()

  const [date,setDate] = useState("")
  const [amount,setAmount] = useState("")
  const [category,setCategory] = useState("Cash")
  const [description,setDescription] = useState("")

  const handleSubmit = e=>{
    e.preventDefault()
    const expense = {date, amount:parseFloat(amount), category, description}
    dispatch(addExpenseAsync(expense))
    setDate("")
    setAmount("")
    setDescription("")
    // keep category
  }

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <input type="date" value={date} onChange={e=>setDate(e.target.value)} required/>
      <input type="number" placeholder="Amount" value={amount} onChange={e=>setAmount(e.target.value)} required/>
      <select value={category} onChange={e=>setCategory(e.target.value)} required>
        <option value="Cash">Cash</option>
        <option value="Groceries/Food">Groceries/Food</option>
        <option value="Activities">Activities</option>
        <option value="Bills">Bills</option>
        <option value="Misc">Misc</option>
      </select>
      <input type="text" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)}/>
      <button type="submit">Add Expense</button>
    </form>
  )
}
