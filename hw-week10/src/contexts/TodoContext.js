import {createContext, useState} from 'react'

// create the context that will be shared across components
const TodoContext = createContext()

// provider component that holds todo state and functions
function TodoProvider({children}) {
  const [todo, setTodo] = useState([])

  // create a new todo
  const createTodo = (title) => {
    const updatedTodo = [
      ...todo,
      {id: Math.round(Math.random() * 9999), title},
    ]
    setTodo(updatedTodo)
  }

  // delete a todo by id
  const deleteTodo = (id) => {
    const updatedTodo = todo.filter((t) => {
      return t.id !== id
    })
    setTodo(updatedTodo)
  }

  // edit a todo by id
  const editTodo = (id, newTitle) => {
    const updatedTodo = todo.map((t) => {
      if (t.id === id) {
        return {...t, title: newTitle}
      }
      return t
    })
    setTodo(updatedTodo)
  }

  // provide the shared state and functions to children
  return (
    <TodoContext.Provider value={{todo, createTodo, deleteTodo, editTodo}}>
      {children}
    </TodoContext.Provider>
  )
}

export {TodoProvider}
export default TodoContext
