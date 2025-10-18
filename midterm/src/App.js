// referenced https://codesandbox.io/p/sandbox/modest-feistel-zsttc9?file=%2Fsrc%2FApp.js%3A11%2C13&from-embed for initial project idea

import {useState} from "react";
import "./index.css";
import Header from "./components/Header";
import ProgressBar from "./components/ProgressBar";
import WeekSection from "./components/WeekSection";
import TaskSummary from "./components/TaskSummary";

function App() {
  // state for background color selection
  const [background, setBackground] = useState({label: "White", value: "white"});

  // color options for dropdown
  const colorOptions = [
    {label: "White", value: "white"},
    {label: "Pink", value: "#ffe8f6ff"},
    {label: "Beige", value: "#ffffe8ff"},
    {label: "Mint", value: "#eafff6ff"},
    {label: "Light Blue", value: "#ebf6ffff"},
    {label: "Lavender", value: "lavender"},
  ];

  // update background when user selects a new color
  const handleColorChange = (option) => setBackground(option);

  // main todos state: each day has its own list
  const [todos, setTodos] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });

  // calculate total and completed tasks across all days
  const totalTasks = Object.values(todos).reduce((prev, curr) => prev + curr.length, 0);
  const completedTasks = Object.values(todos).reduce(
    (prev, curr) => prev + curr.filter((t) => t.completed).length, 0
  );

  // overall completion percentage
  const overallProgress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // update todos for a specific day
  const updateDayTodos = (day, newList) => setTodos({...todos, [day]: newList});

  return (
    <div
      className="app-container"
      style={{
        backgroundColor: background.value,
        minHeight: "100%",
        minWidth: "100%",
        width: "100%",
        transition: "background-color 0.5s ease",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* header with title and color dropdown */}
      <Header
        colorOptions={colorOptions}
        background={background}
        onColorChange={handleColorChange}
      />

      {/* overall progress bar */}
      <div style={{ marginBottom: "30px" }}>
        <ProgressBar progress={overallProgress} />
      </div>


      {/* task summary component showing total tasks */}
      <TaskSummary totalTasks={totalTasks} completedTasks={completedTasks} />

      {/* weekdays section */}
      <WeekSection
        title="Weekdays"
        days={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]}
        todos={todos}
        updateDayTodos={updateDayTodos}
        itemsPerRow={3}
      />

      {/* weekends section */}
      <WeekSection
        title="Weekends"
        days={["Saturday", "Sunday"]}
        todos={todos}
        updateDayTodos={updateDayTodos}
        itemsPerRow={2}
      />
    </div>
  );
}

export default App;
