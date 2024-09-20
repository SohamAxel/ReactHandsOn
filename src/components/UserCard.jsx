import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ id, name, username, email, website }) => {
  return (
    <div className="card">
      <div className="card-header">{name}</div>
      <div className="card-body">
        <div>{username}</div>
        <div>{website}</div>
        <div>{email}</div>
      </div>
      <div className="card-footer">
        <Link className="btn" to={`${id}`}>
          View
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
