import React from "react";
import { getTodos } from "../api/resources";
import { useLoaderData } from "react-router-dom";
import Todo from "../components/Todo";

const TodoList = () => {
  console.log(import.meta.env.VITE_API_URL);
  const todos = useLoaderData();
  console.log(todos);
  return (
    <>
      <h1 className="page-title">Todos</h1>
      <ul>
        {todos.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </ul>
    </>
  );
};

const loader = async ({ request: { signal } }) => {
  return await getTodos({ signal });
};

export const todoListRoute = {
  loader,
  element: <TodoList />,
};
