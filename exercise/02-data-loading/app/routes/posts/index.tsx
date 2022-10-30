import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import { getPostsListItem } from "~/models/posts.server";

export async function loader() {
  const posts = await getPostsListItem();
  return json({ posts });
}
export default function Posts() {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug} className="text-blue-600 underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
