import React, { useState } from "react";

const TodoForm = ({ handleSetTodo }) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <div id="new-todo-form">
      <label htmlFor="todo-input">New Todo</label>
      <input
        type="text"
        id="todo-input"
        value={inputValue}
        onInput={(e) => setInputValue(e.target.value)}
      />
      <button
        onClick={() => {
          handleSetTodo({ todo: inputValue });
          setInputValue("");
        }}
      >
        Add Todo
      </button>
    </div>
  );
};

export default TodoForm;
