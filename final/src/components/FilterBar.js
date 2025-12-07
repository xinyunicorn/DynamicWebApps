import {useDispatch} from "react-redux"
import {setCategoryFilter, setSearchFilter, setSortOrder} from "../store/slices/expensesSlice"

// filter bar lets user narrow down expenses by search, category, or sort order
export default function FilterBar() {
  const dispatch = useDispatch()

  return (
    // "expense-form" class so it visually matches the add/edit form styling
    <div className="expense-form" style={{marginTop: "20px"}}>
      <h3>Filters</h3>

      {/* user input for filtering by description */}
      <input
        type="text"
        placeholder="Search description"
        onChange={e => dispatch(setSearchFilter(e.target.value))}
      />

      {/* dropdown for filtering by category */}
      <select
        onChange={e => dispatch(setCategoryFilter(e.target.value))}
        defaultValue=""
      >
        <option value="">All Categories</option>
        <option value="Cash">Cash</option>
        <option value="Groceries/Food">Groceries/Food</option>
        <option value="Activities">Activities</option>
        <option value="Bills">Bills</option>
        <option value="Misc">Misc</option>
      </select>

      {/* dropdown for sorting expenses */}
      <select
        onChange={e => dispatch(setSortOrder(e.target.value))}
        defaultValue="recent"
      >
        <option value="recent">Most Recent</option>
        <option value="oldest">Least Recent</option>
        <option value="highest">Highest Amount</option>
        <option value="lowest">Lowest Amount</option>
      </select>
    </div>
  )
}
