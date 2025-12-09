import {useState, useContext} from "react"
import {useSelector} from "react-redux"
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend} from "recharts"
import {ThemeContext} from "./ThemeContext"
import TimeRangeSelector from "./TimeRangeSelector"

// component to display summary of spending graph with filtering options
export default function ExpenseChart() {
  const {theme} = useContext(ThemeContext)
  const {expenses} = useSelector(state => state.expenses)

  const categories = ["Cash", "Groceries/Food", "Activities", "Bills", "Misc"]

  const themes = {
    light: "#222222",
    dark: "#ffffff",
    color: "#8a5451"
  }

  // state for dropdowns; initially no time range selected
  const [timeRange, setTimeRange] = useState("")
  const [selectedWeek, setSelectedWeek] = useState("")
  const [selectedMonthYear, setSelectedMonthYear] = useState("")
  const [selectedYear, setSelectedYear] = useState("")

  // get start date of ISO week
  function getStartOfWeek(week, year) {
    const simple = new Date(year, 0, 1 + (week - 1) * 7)
    const dayOfWeek = simple.getDay() || 7
    const weekStart = new Date(simple)
    weekStart.setDate(simple.getDate() - dayOfWeek + 1)
    return weekStart
  }

  // sets of existing weeks, months, and years
  // this allows dynamic options for the dropdown based on existing entries
  const weekSet = new Set()
  const monthYearSet = new Set()
  const yearSet = new Set()

  expenses.forEach(exp => {
    const d = new Date(exp.date)
    const weekNum = Math.ceil(
      ((d - new Date(d.getFullYear(), 0, 1)) / 86400000 + new Date(d.getFullYear(), 0, 1).getDay() + 1) / 7
    )
    weekSet.add(`${d.getFullYear()}-${weekNum}`)
    monthYearSet.add(`${d.getMonth() + 1}-${d.getFullYear()}`)
    yearSet.add(d.getFullYear())
  })

  // get options for dropdowns from above sets
  const weekOptions = Array.from(weekSet).map(str => {
    const [year, week] = str.split("-").map(Number)
    const startDate = getStartOfWeek(week, year)
    return {
      year, 
      week, 
      label: `Week of ${startDate.toLocaleString("default", {month: "long", day: "numeric"})}`
    }
  }).sort((a, b) => a.year - b.year || a.week - b.week)

  const monthYearOptions = Array.from(monthYearSet).map(str => {
    const [month, year] = str.split("-")
    return {
      month, 
      year, 
      label: `${new Date(year, month - 1).toLocaleString("default", {month: "long"})} ${year}`
    }
  }).sort((a, b) => a.year - b.year || a.month - b.month)

  const yearOptions = Array.from(yearSet).sort()

  const todayDateStr = new Date().toISOString().split("T")[0]

  // filter expenses based on selections from dropdowns
  let filteredExpenses = []

  if (timeRange === "today") filteredExpenses = expenses.filter(exp => exp.date === todayDateStr)
  else if (timeRange === "week" && selectedWeek){
    const [thisYear, thisWeek] = selectedWeek.split("-").map(Number)
    filteredExpenses = expenses.filter(exp => {
      const d = new Date(exp.date)
      const weekNum = Math.ceil(((d - new Date(d.getFullYear(), 0, 1)) / 86400000 + new Date(d.getFullYear(), 0, 1).getDay() + 1) / 7)
      return d.getFullYear() === thisYear && weekNum === thisWeek
    })
  }
  else if (timeRange === "month" && selectedMonthYear){
    const [thisMonth, thisYear] = selectedMonthYear.split("-").map(Number)
    filteredExpenses = expenses.filter(exp => {
      const d = new Date(exp.date)
      return d.getFullYear() === thisYear && d.getMonth() + 1 === thisMonth
    })
  }
  else if (timeRange === "year" && selectedYear){
    filteredExpenses = expenses.filter(exp => new Date(exp.date).getFullYear() === Number(selectedYear))
  }
  else if (timeRange === "overall") filteredExpenses = expenses

  // prepare chart data
  const data = categories.map(thisCategory => ({
    category: thisCategory,
    amount: filteredExpenses.filter(e => e.category === thisCategory).reduce((sum, e) => sum + e.amount, 0)
  }))
  const totalAmount = data.reduce((sum, e) => sum + e.amount, 0)

  return (
    <div style={{marginTop: "40px"}}>
      <h2>Spending Summary</h2>

      {timeRange && <p><strong>Total Spent: ${totalAmount.toFixed(2)}</strong></p>}

      {/* dropdowns for selecting time range and relevant options */}
      <TimeRangeSelector
        timeRange={timeRange} setTimeRange={setTimeRange}
        selectedWeek={selectedWeek} setSelectedWeek={setSelectedWeek}
        selectedMonthYear={selectedMonthYear} setSelectedMonthYear={setSelectedMonthYear}
        selectedYear={selectedYear} setSelectedYear={setSelectedYear}
        weekOptions={weekOptions} monthYearOptions={monthYearOptions} yearOptions={yearOptions}
      />
      
      {/* graph specifics */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip formatter={value => `$${value.toFixed(2)}`} />
          <Legend />
          <Bar dataKey="amount" fill={themes[theme]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
