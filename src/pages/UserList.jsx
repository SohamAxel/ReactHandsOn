import React from "react";
import { getUsers } from "../api/resources";
import { useLoaderData } from "react-router-dom";
import UserCard from "../components/UserCard";

const UserList = () => {
  const users = useLoaderData();
  return (
    <>
      <h1 className="page-title">Users</h1>
      <div className="card-grid">
        {
          users.map(user => (
            <UserCard key={user.id} {...user} />
          ))
        }
      </div>
    </>
  );
};

const loader = ({ request: { signal } }) => {
  return getUsers({ signal });
};

export const UserListRoute = {
  loader,
  element: <UserList />,
};
