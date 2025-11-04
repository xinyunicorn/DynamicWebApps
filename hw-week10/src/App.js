import {TodoProvider} from './contexts/TodoContext'
import TodoCreate from './components/TodoCreate'
import TodoList from './components/TodoList'

function App() {
  // wrap the app in the provider to share state through context
  return (
    <TodoProvider>
      <div>
        <TodoCreate />
        <TodoList />
      </div>
    </TodoProvider>
  )
}

export default App
