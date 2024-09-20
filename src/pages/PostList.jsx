import { Link, useLoaderData } from "react-router-dom";
import { getPosts, getUsers } from "../api/resources";
import PostCard from "../components/PostCard";
import FilterForm from "../components/FilterForm";

function PostList() {
  const {
    posts,
    users,
    params: { query, userId },
  } = useLoaderData();
  return (
    <>
      <h1 className="page-title">
        Posts
        <div className="title-btns">
          <Link className="btn btn-outline" to="new">
            New
          </Link>
        </div>
      </h1>
      <FilterForm users={users} query={query} userId={userId}/>
      <div className="card-grid">
        {posts.map((post) => (
          <PostCard key={post.id} {...post}/>
        ))}
      </div>
    </>
  );
}

const loader = async ({ request: { signal, url } }) => {
  const searchParams = new URL(url).searchParams;
  const query = searchParams.get("query") ?? "";
  const userId = searchParams.get("userId") ?? "";
  const filterParams = { q: query };
  if (userId !== "") filterParams.userId = userId;

  const posts = getPosts({ signal, params: filterParams });
  const users = getUsers({ signal });
  return {
    params: { query, userId },
    posts: await posts,
    users: await users,
  };
};

export const postListRoute = {
  loader,
  element: <PostList />,
};
