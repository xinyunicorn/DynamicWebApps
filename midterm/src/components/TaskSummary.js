// component to show total, completed, and remaining tasks
function TaskSummary({ totalTasks, completedTasks }) {
  return (
    <div
      className="task-summary"
      style={{ textAlign: "center", margin: "10px 0", border: "1px solid #333", padding: "10px" }}
    >
      <h2>Total Tasks: {totalTasks}</h2>
      <p>Completed 🏆: {completedTasks}</p>
      <p>Remaining 🫠: {totalTasks - completedTasks}</p>
    </div>
  );
}

export default TaskSummary;