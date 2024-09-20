import React from "react";
import { Form, Link } from "react-router-dom";
import FormGroup from "./FormGroup";

const PostForm = ({ errors = {}, users, value = {}, isSubmitting}) => {
  return (
    <Form method="post" className="form">
      <div className="form-row">
        <FormGroup errorMessage={errors.title}>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" defaultValue={value.title}/>
        </FormGroup>
        <FormGroup errorMessage={errors.userId}>
          <label htmlFor="userId">Author</label>
          <select name="userId" id="userId" defaultValue={value.userId}>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </FormGroup>
      </div>
      <div className="form-row">
        <FormGroup errorMessage={errors.body}>
          <label htmlFor="body">Body</label>
          <textarea name="body" id="body" defaultValue={value.body}></textarea>
        </FormGroup>
      </div>
      <div className="form-row form-btn-row">
        <Link className="btn btn-outline" to="/posts">
          Cancel
        </Link>
        <button className="btn" disabled={isSubmitting}>
          {" "}
          {isSubmitting ? "Cancel" : "Save"}
        </button>
      </div>
    </Form>
  );
};

const validateForm = ({ title, userId, body }) => {
  const errorList = {};

  if (title === "") {
    errorList.title = "Required";
  }

  if (body === "") {
    errorList.body = "Required";
  }

  if (userId === "") {
    errorList.userId = "Required";
  }

  return errorList;
};

export { validateForm };
export default PostForm;
