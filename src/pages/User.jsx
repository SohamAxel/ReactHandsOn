import React from "react";
import { getPosts, getTodos, getUser } from "../api/resources";
import { useLoaderData } from "react-router-dom";
import PostCard from "../components/PostCard";
import Todo from "../components/Todo";

const User = () => {
  const { user, posts, todos } = useLoaderData();
  const { name, email, company, id, address, website } = user;
  return (
    <>
      <h1 className="page-title">{name}</h1>
      <div className="page-subtitle">{email}</div>
      <div>
        <b>Company:</b> {company.name}
      </div>
      <div>
        <b>Website:</b> {website}
      </div>
      <div>
        <b>Address:</b> {address.street}, {address.city},  {address.zipcode}
      </div>
      <h3 className="mt-4 mb-2">Posts</h3>
      <div className="card-grid">
        {posts.map(post => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
      <h3 className="mt-4 mb-2">Todos</h3>
      <ul>
        {
          todos.map(todo => (
            <Todo key={todo.id} {...todo} />
          ))
        }
      </ul>
    </>
  );
};

const loader = async ({ request: { signal }, params: { userId } }) => {
  const posts = getPosts({ signal, params: { userId } });
  const todos = getTodos({ signal, params: { userId } });
  const user = getUser(userId, { signal });
  return { posts: await posts, todos: await todos, user: await user };
};

export const userRoute = {
  loader,
  element: <User />,
};
