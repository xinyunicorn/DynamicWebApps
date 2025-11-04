import {useContext} from 'react'
import TodoContext from '../contexts/TodoContext'
import TodoItem from './TodoItem'

const TodoList = () => {
  const {todo} = useContext(TodoContext)

  const renderedTodos = todo.map((todo) => {
    return <TodoItem key={todo.id} todo={todo} />
  })

  return <div>{renderedTodos}</div>
}

export default TodoList
