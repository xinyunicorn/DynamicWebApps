import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

const API_URL = "http://localhost:3001/expenses"

export const fetchExpenses = createAsyncThunk("expenses/fetchExpenses", async () => {
  const res = await axios.get(API_URL)
  return res.data
})

export const addExpenseAsync = createAsyncThunk("expenses/addExpenseAsync", async expense => {
  const {id, ...payload} = expense // remove id, JSON Server generates it
  const res = await axios.post(API_URL, payload)
  return res.data
})

export const deleteExpenseAsync = createAsyncThunk("expenses/deleteExpenseAsync", async id => {
  await axios.delete(`${API_URL}/${id}`)
  return id
})

const expensesSlice = createSlice({
  name:"expenses",
  initialState:{
    expenses:[],
    filters:{
      category:"",
      search:"",
      sortOrder:"recent"
    },
    status:"idle"
  },
  reducers:{
    setCategoryFilter:(state,action)=>{
      state.filters.category = action.payload
    },
    setSearchFilter:(state,action)=>{
      state.filters.search = action.payload
    },
    setSortOrder:(state,action)=>{
      state.filters.sortOrder = action.payload
    }
  },
  extraReducers:builder=>{
    builder
      .addCase(fetchExpenses.fulfilled,(state,action)=>{
        state.expenses = action.payload
      })
      .addCase(addExpenseAsync.fulfilled,(state,action)=>{
        state.expenses.push(action.payload)
      })
      .addCase(deleteExpenseAsync.fulfilled,(state,action)=>{
        state.expenses = state.expenses.filter(exp=>exp.id!==action.payload)
      })
  }
})

export const {setCategoryFilter,setSearchFilter,setSortOrder} = expensesSlice.actions
export default expensesSlice.reducer
