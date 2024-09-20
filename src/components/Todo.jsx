import React from "react";

const Todo = ({ completed, title }) => {
  return <li className={`${completed ? "strike-through" : ""}`}>{title}</li>;
};

export default Todo;
