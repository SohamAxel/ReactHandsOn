import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoForm from "./Components/TodoForm";
import "./styles.css";
import Todo from "./Components/Todo";

function App() {
  const [todoList, setTodoList] = useState([]);
  const handleSetTodo = ({ todo }) => {
    let myuuid = uuidv4();
    setTodoList((prevToDo) => {
      return [...prevToDo, { id: myuuid, todo, checked: false }];
    });
  };
  const handleDeleteTodo = ({ id }) => {
    setTodoList((prevToDo) => {
      return prevToDo.filter((data) => data.id != id);
    });
  };
  const handleCheckTodo = ({ id, checked }) => {
    setTodoList((prevToDo) => {
      return prevToDo.map((data) => {
        if (data.id == id) {
          return {
            ...data,
            checked,
          };
        } else {
          return {...data}
        }
      });
    });
  };

  return (
    <>
      {todoList.map((data) => (
        <Todo
          key={data.id}
          {...data}
          handleDeleteTodo={handleDeleteTodo}
          handleCheckTodo={handleCheckTodo}
        />
      ))}
      <h1>My App</h1>
      <TodoForm handleSetTodo={handleSetTodo} />
    </>
  );
}

export default App;
