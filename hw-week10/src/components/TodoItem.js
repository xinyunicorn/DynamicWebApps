import {useState, useContext} from 'react'
import TodoEdit from './TodoEdit'
import TodoContext from '../contexts/TodoContext'

const TodoItem = ({todo}) => {
  const [showEdit, setShowEdit] = useState(false)
  const {deleteTodo, editTodo} = useContext(TodoContext)

  const handleDelete = () => {
    deleteTodo(todo.id)
  }

  const handleEdit = () => {
    setShowEdit(!showEdit)
  }

  const handleSubmit = (id, newTitle) => {
    editTodo(todo.id, newTitle)
    setShowEdit(!showEdit)
  }

  const content = showEdit ? (
    <TodoEdit todo={todo} onSubmit={handleSubmit} />
  ) : (
    <div>
      {todo.title}
      <button onClick={handleDelete}>delete</button>
      <button onClick={handleEdit}>edit</button>
    </div>
  )

  return <div>{content}</div>
}

export default TodoItem
