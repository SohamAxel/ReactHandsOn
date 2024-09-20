import React from 'react'
import { getPost, getUsers, updatePost } from '../api/resources'
import { redirect, useActionData, useLoaderData, useNavigation } from 'react-router-dom'
import PostForm, { validateForm } from '../components/PostForm';

const EditPost = () => {
  const { users, post } = useLoaderData();
  const { state } = useNavigation();
  const errors = useActionData();
  const isSubmitting = state === "submitting";
  return (
    <PostForm users={users} isSubmitting={isSubmitting} value={post} errors={errors}/>
  )
}

const loader = async ({request: { signal }, params: { postId }}) => {
  const users = getUsers({ signal });
  const post = getPost(postId, { signal});
  return { users: await users, post: await post };

}

const action = async ({ request, params: { postId } }) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const body = formData.get("body");
  const userId = formData.get("userId");

  const errorList = validateForm({ title, userId, body });

  if (Object.keys(errorList).length > 0) {
    return errorList;
  }

  const post = await updatePost(postId, { title, body, userId }, { signal: request.signal });

  return redirect(`/posts/${post.id}`);
}

export const editPostRoute = {
  loader,
  action,
  element: <EditPost />
}