import React, { useContext } from "react";
import { TodoContext } from "../App";
import { TodoItem } from "./TodoItem";

const TodoList = () => {
  const { todoList } = useContext(TodoContext);
  return (
    <ul id="list">
      {
        todoList.map(todo => {
          return <TodoItem key={todo.id} {...todo}/>
        })
      }
    </ul>
  );
};

export default TodoList;
