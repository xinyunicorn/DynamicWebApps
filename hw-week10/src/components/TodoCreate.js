import {useState, useContext} from 'react'
import TodoContext from '../contexts/TodoContext'

const TodoCreate = () => {
  const [title, setTitle] = useState('')
  const {createTodo} = useContext(TodoContext)

  const handleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    createTodo(title)
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleChange} value={title} />
      <button>Create Todo</button>
    </form>
  )
}

export default TodoCreate
