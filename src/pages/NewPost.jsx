import React from "react";
import { createPost, getUsers } from "../api/resources";
import { redirect, useActionData, useLoaderData, useNavigation } from "react-router-dom";
import PostForm, { validateForm } from "../components/PostForm";

const NewPost = () => {
  const users = useLoaderData();
  const errors = useActionData() ?? {};
  const { state } = useNavigation();
  const isSubmitting = state === 'submitting';

  return (
    <>
      <h1 className="page-title">New Post</h1>
      <PostForm errors={errors} users={users} isSubmitting={isSubmitting} />
    </>
  );
};

const action = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const body = formData.get("body");
  const userId = formData.get("userId");

  const errorList = validateForm({ title, userId, body });

  if (Object.keys(errorList).length > 0) {
    return errorList;
  }

  const post = await createPost({ title, body, userId }, { signal: request.signal });

  return redirect(`/posts/${post.id}`);
}

const loader = ({ request: { signal } }) => {
  return getUsers({ signal });
};

export const newPostRoute = {
  action,
  loader,
  element: <NewPost />,
};
