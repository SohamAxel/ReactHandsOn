import React, { useContext, useRef } from "react";
import { TodoContext } from "../App";

const TodoCreateForm = () => {
  const { addNewTodo } = useContext(TodoContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewTodo(inputRef.current.value);
    inputRef.current.value = "";
  };

  const inputRef = useRef();
  return (
    <form onSubmit={handleSubmit} id="new-todo-form">
      <label htmlFor="todo-input">New Todo</label>
      <input type="text" id="todo-input" defaultValue="" ref={inputRef} />
      <button>Add Todo</button>
    </form>
  );
};

export default TodoCreateForm;
