import { baseApi } from "./base";

const getComments = (postId, options) => {
  return baseApi
    .get(`posts/${postId}/comments`, options)
    .then((res) => res.data);
};

const getPosts = (options) => {
  return baseApi.get("posts", options).then((res) => res.data);
};

const getPost = (postId, options) => {
  return baseApi.get(`posts/${postId}`, options).then((res) => res.data);
};

const getTodos = (options) => {
  return baseApi.get("todos", options).then((res) => res.data);
};

const getUsers = (options) => {
  return baseApi.get("users", options).then((res) => res.data);
};

const getUser = (userId, options) => {
  return baseApi.get(`users/${userId}`, options).then((res) => res.data);
};

export { getComments, getPost, getPosts, getTodos, getUser, getUsers };
