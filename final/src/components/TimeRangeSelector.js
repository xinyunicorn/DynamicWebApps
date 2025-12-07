// dropdown for selecting time ranges and suboptions
export default function TimeRangeSelector({
  timeRange, setTimeRange,
  selectedWeek, setSelectedWeek,
  selectedMonthYear, setSelectedMonthYear,
  selectedYear, setSelectedYear,
  weekOptions, monthYearOptions, yearOptions
}) {
  return (
    <div style={{marginBottom: "20px", marginTop: "20px", display: "flex", gap: "10px"}}>
      {/* main time range selector */}
      <select value={timeRange} onChange={e => setTimeRange(e.target.value)}>
        <option value="">Select Range</option>
        <option value="today">Today</option>
        <option value="week">Week</option>
        <option value="month">Month</option>
        <option value="year">Year</option>
        <option value="overall">Overall</option>
      </select>

      {/* week dropdown if "week" selected */}
      {timeRange === "week" && (
        <select value={selectedWeek} onChange={e => setSelectedWeek(e.target.value)}>
          <option value="">Select Week</option>
          {weekOptions.map(w => (
            <option key={`${w.year}-${w.week}`} value={`${w.year}-${w.week}`}>{w.label}</option>
          ))}
        </select>
      )}

      {/* month/year dropdown if "month" selected */}
      {timeRange === "month" && (
        <select value={selectedMonthYear} onChange={e => setSelectedMonthYear(e.target.value)}>
          <option value="">Select Month</option>
          {monthYearOptions.map(m => (
            <option key={`${m.month}-${m.year}`} value={`${m.month}-${m.year}`}>{m.label}</option>
          ))}
        </select>
      )}

      {/* year dropdown if "year" selected */}
      {timeRange === "year" && (
        <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
          <option value="">Select Year</option>
          {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
      )}
    </div>
  )
}
