import { createContext, useEffect, useReducer, useState } from "react"
import "./styles.css"
import { TodoItem } from "./Components/TodoItem"
import TodoFilterForm from "./Components/TodoFilterForm"
import TodoList from "./Components/TodoList"
import TodoCreateForm from "./Components/TodoCreateForm"

const ACTIONS = {
  ADD: "ADD",
  EDIT: "EDIT",
  DELETE: "DELETE",
  COMPLETED: "COMPLETED"
}

const reducer = (data, action) => {
  switch (action.type) {
    case ACTIONS.ADD:
      return [
        ...data,
        { id: crypto.randomUUID() ,name: action.todo.name, completed: false}
      ]
    case ACTIONS.EDIT:
      return data.map(todo => {
        if (todo.id == action.todo.id) {
          return {
            ...todo,
            name: action.todo.name,
          }
        } else {
          return todo;
        }
      })
    case ACTIONS.DELETE:
      return data.filter(todo => todo.id !== action.todo.id);
    case ACTIONS.COMPLETED:
      return data.map(todo => {
        if (todo.id == action.todo.id) {
          return {
            ...todo,
            completed: action.todo.completed,
          }
        } else {
          return todo;
        }
      })
  }

}

export const TodoContext = createContext();

function App() {
  const [hideCompleted, setHideCompleted] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [todoList, dispatch] = useReducer(reducer, [], value => {
    const stored = localStorage.getItem("todo_list");
    if (stored) {
      return JSON.parse(stored);
    } else {
      return value;
    }
  })

  useEffect(() => {
    localStorage.setItem("todo_list", JSON.stringify(todoList))
  }, [todoList])

  const filteredTodoList = todoList.filter(todo => {
    if (hideCompleted && todo.completed) return false;
    return todo.name.includes(filterName);
  })

  function addNewTodo(newTodoName) {
    if (newTodoName === "") return
    dispatch({ type: ACTIONS.ADD, todo: { name: newTodoName }})
  }

  function toggleTodo(todoId, completed) {
    dispatch({ type: ACTIONS.COMPLETED, todo: { id: todoId, completed}})
  }

  function deleteTodo(todoId) {
    dispatch({ type: ACTIONS.DELETE, todo: { id: todoId }})
  }

  function editTodo(todoId, todoName) {
    dispatch({ type: ACTIONS.EDIT, todo: { id: todoId, name: todoName}})
  }

  return (
    <TodoContext.Provider value={{
      todoList: filteredTodoList,
      addNewTodo,
      toggleTodo,
      deleteTodo,
      setHideCompleted,
      hideCompleted,
      filterName,
      setFilterName,
      editTodo
    }}>
      <TodoFilterForm />
      <TodoList />
      <TodoCreateForm />
    </TodoContext.Provider>
  )
}

export default App