// component representing a single task item
function ToDoItem(props) {
  const { item, toggleComplete, removeItem } = props;

  // handle toggling task completed state
  const handleToggle = () => toggleComplete(item);

  // handle removing task
  const handleRemove = () => removeItem(item);

  return (
    <li>
      {/* checkbox to mark task as completed */}
      <input type="checkbox" checked={item.completed} onChange={handleToggle} />

      {/* display task text; apply 'completed' class if task is done */}
      <span className={item.completed ? "completed" : ""}>{item.text}</span>

      {/* button to remove the task from the list */}
      <button className="delete" onClick={handleRemove}>
        x
      </button>
    </li>
  );
}

export default ToDoItem;
