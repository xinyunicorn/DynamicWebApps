import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

const URL = "http://localhost:3001/expenses"

// fetch all expenses from json server
export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async () => {
    const res = await axios.get(URL) 
    // return the array of expenses so redux can store it
    return res.data
  }
)

// add a new expense to the server
export const addExpenseAsync = createAsyncThunk(
  "expenses/addExpenseAsync",
  async expense => {
    // remove id so json server can auto-create one
    const {id, ...payload} = expense 
    const res = await axios.post(URL, payload)
    return res.data // send back the newly created expense
  }
)

// delete a specific expense by id
export const deleteExpenseAsync = createAsyncThunk(
  "expenses/deleteExpenseAsync",
  async id => {
    await axios.delete(`${URL}/${id}`)
    return id // return id so redux can remove it locally
  }
)

// update an existing expense on the server
export const updateExpenseAsync = createAsyncThunk(
  "expenses/updateExpenseAsync",
  async expense => {
    const res = await axios.put(`${URL}/${expense.id}`, expense)
    return res.data // send back updated object
  }
)

const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [], // holds all expense items
    filters: {
      category: "",
      search: "",
      sortOrder: "recent"
    },
  },
  reducers: {
    // sets the category filter for the list
    setCategoryFilter: (state, action) => {
      state.filters.category = action.payload
    },
    // sets the text search filter
    setSearchFilter: (state, action) => {
      state.filters.search = action.payload
    },
    // switch between recent/oldest sorting
    setSortOrder: (state, action) => {
      state.filters.sortOrder = action.payload
    }
  },
  extraReducers: builder => {
    builder
      // when fetch succeeds, replace state with server data
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.expenses = action.payload
      })
      // push the new expense to local state
      .addCase(addExpenseAsync.fulfilled, (state, action) => {
        state.expenses.push(action.payload)
      })
      // remove the deleted expense from state
      .addCase(deleteExpenseAsync.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter(exp => exp.id !== action.payload)
      })
      // find the matching expense and update it
      .addCase(updateExpenseAsync.fulfilled, (state, action) => {
        const index = state.expenses.findIndex(exp => exp.id === action.payload.id)
        if (index >= 0) state.expenses[index] = action.payload
      })
  }
})

export const {setCategoryFilter, setSearchFilter, setSortOrder} = expensesSlice.actions
export default expensesSlice.reducer
