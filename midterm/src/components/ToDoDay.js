import ToDoItem from "./ToDoItem";

// component representing a single day of tasks
function ToDoDay(props) {
  const { day, items, setItems } = props;

  // handle form submission to add a new task
  const handleSubmit = (e) => {
    // stop the form from refreshing the page
    e.preventDefault();
    const input = e.target.item;
    // create a new task object; use Date.now() as a simple unique id
    const newItem = { id: Date.now(), text: input.value, completed: false };
    setItems([...items, newItem]);
    e.target.reset(); // clear the input field
  };

  // toggle the completed status of a task
  const handleToggleComplete = (itemToToggle) => {
    setItems(
      items.map((item) =>
        item.id === itemToToggle.id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  // remove a task from the list
  const handleRemoveItem = (itemToRemove) => {
    setItems(items.filter((item) => item.id !== itemToRemove.id));
  };

  // calculate total tasks and productivity percentage
  const totalTasks = items.length;
  const completedTasks = items.filter((item) => item.completed).length;
  const productivityPercent = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  return (
    <div className="todo-day">
      <h2>{day}</h2>

      {/* productivity bar */}
      <div className="productivity-bar">
        <div
          className="progress"
          style={{ width: `${productivityPercent}%` }}
        ></div>
      </div>
      <p>{productivityPercent}% completed</p>

      {/* form to add a new task */}
      <form onSubmit={handleSubmit}>
        <input type="text" name="item" placeholder="Add a task" required />
        <button>Add</button>
      </form>

      {/* list of tasks */}
      <ul>
        {items.map((item) => (
          <ToDoItem
            key={item.id} // using unique task id as key
            item={item}
            toggleComplete={handleToggleComplete}
            removeItem={handleRemoveItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ToDoDay;
