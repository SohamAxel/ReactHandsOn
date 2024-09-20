import React, { useEffect, useRef } from "react";
import { Form } from "react-router-dom";

const FilterForm = ({ users, handleSetFilter, query, userId }) => {
  const qRef = useRef();
  const userRef = useRef();

  useEffect(() => {
    qRef.current.value = query;
  }, [query]);

  useEffect(() => {
    userRef.current.value = userId;
  }, [userId]);

  return (
    <Form className="form mb-4" method="get">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="query">Query</label>
          <input
            type="search"
            name="query"
            id="query"
            ref={qRef}
            defaultValue=""
          />
        </div>
        <div className="form-group">
          <label htmlFor="userId">Author</label>
          <select
            type="search"
            name="userId"
            id="userId"
            ref={userRef}
            defaultValue=""
          >
            <option value="">Any</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <button className="btn">Filter</button>
      </div>
    </Form>
  );
};

export default FilterForm;
