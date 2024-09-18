import React from "react";

const Todo = ({ id, checked, todo, handleDeleteTodo, handleCheckTodo }) => {
  return (
    <li className="list-item">
      <label className="list-item-label">
        <input
          type="checkbox"
          checked={checked}
          data-list-item-checkbox
          onChange={(e) => handleCheckTodo({ id, checked: e.target.checked })}
        />
        <span data-list-item-text>{todo}</span>
      </label>
      <button data-button-delete onClick={() => handleDeleteTodo({ id })}>
        Delete
      </button>
    </li>
  );
};

export default Todo;
