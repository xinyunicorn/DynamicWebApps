import ToDoDay from "./ToDoDay";

// component representing a section of the week (weekdays or weekends)
function WeekSection(props) {
  const {title, days, todos, updateDayTodos, itemsPerRow} = props;

  // split days into rows for layout
  // weekdays
  // i = 0 -> days.slice(0, 3) -> ["Monday", "Tuesday", "Wednesday"]
  // i = 3 -> days.slice(3, 6) -> ["Thursday", "Friday"]
  // weekends
  // i = 0 -> days.slice(0, 2) -> ["Saturday", "Sunday"]
  const rows = [];
  for (let i = 0; i < days.length; i += itemsPerRow) {
    rows.push(days.slice(i, i + itemsPerRow));
  }

  return (
    <div className={`week-section ${title.toLowerCase()}`}>
      <h2>{title}</h2>
      {rows.map((row, idx) => (
        <div className="week-row" key={idx}>
          {row.map((day) => (
            <ToDoDay
              key={day}
              day={day}
              items={todos[day]}
              setItems={(list) => updateDayTodos(day, list)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default WeekSection;
