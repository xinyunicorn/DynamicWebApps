import React from 'react'
import {useDispatch} from 'react-redux'
import {setCategoryFilter, setSearchFilter, setSortOrder} from '../store/slices/expensesSlice'

export default function FilterBar() {
  const dispatch = useDispatch()

  return (
    <div style={{marginTop:'20px'}}>
      <h3>Filters</h3>

      <input
        type='text'
        placeholder='Search description'
        onChange={e => dispatch(setSearchFilter(e.target.value))}
      />

      <select
        onChange={e => dispatch(setCategoryFilter(e.target.value))}
        defaultValue=''
      >
        <option value=''>All Categories</option>
        <option value='Cash'>Cash</option>
        <option value='Groceries/Food'>Groceries/Food</option>
        <option value='Activities'>Activities</option>
        <option value='Bills'>Bills</option>
        <option value='Misc'>Misc</option>
      </select>

      <select
        onChange={e => dispatch(setSortOrder(e.target.value))}
        defaultValue='recent'
      >
        <option value='recent'>Most Recent</option>
        <option value='oldest'>Oldest</option>
      </select>
    </div>
  )
}
