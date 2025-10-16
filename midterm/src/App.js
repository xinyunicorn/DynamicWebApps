// referenced https://codesandbox.io/p/sandbox/modest-feistel-zsttc9?file=%2Fsrc%2FApp.js%3A11%2C13&from-embed for initial project idea

import { useState } from "react";
import "./index.css";
import Dropdown from "./components/Dropdown";
import WeekSection from "./components/WeekSection";

function App() {
  const [background, setBackground] = useState({ label: "White", value: "white" });

  const colorOptions = [
    { label: "White", value: "white" },
    { label: "Pink", value: "#f5dcebff" },
    { label: "Beige", value: "#f5f5dc" },
    { label: "Mint", value: "#d3fcebff" },
    { label: "Light Blue", value: "#cce6ff" },
    { label: "Lavender", value: "lavender" },
  ];

  const handleColorChange = (option) => setBackground(option);

  const [todos, setTodos] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });

  const totalTasks = Object.values(todos).reduce((acc, arr) => acc + arr.length, 0);
  const completedTasks = Object.values(todos).reduce(
    (acc, arr) => acc + arr.filter((t) => t.completed).length,
    0
  );
  const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const updateDayTodos = (day, newList) => setTodos({ ...todos, [day]: newList });

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
      <header className="app-header">
        <h1>Weekly To-Do Tracker</h1>
        <Dropdown options={colorOptions} value={background} onChange={handleColorChange} />
      </header>

      <div className="overall-progress-container">
        <h2>
          Overall Progress: {overallProgress}%
          <span className={`star ${overallProgress === 100 ? "visible" : "hidden"}`}>⭐</span>
        </h2>
        <div className="overall-progress-bar">
          <div className="overall-progress-fill" style={{ width: `${overallProgress}%` }}></div>
        </div>
      </div>

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
