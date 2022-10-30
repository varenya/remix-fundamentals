import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getPost } from "~/models/post.server";
import { useLoaderData } from "@remix-run/react";
import { marked } from "marked";

export async function loader({ params }: LoaderArgs) {
  invariant(params.slug, "slug is missing");
  const postData = await getPost(params.slug);
  invariant(postData, "post not found!");
  const { title, markdown } = postData;
  return json({ title, html: marked(markdown) });
}

export default function Post() {
  const { title, html } = useLoaderData<typeof loader>();
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{title}</h1>
      <p dangerouslySetInnerHTML={{ __html: html }}></p>
    </main>
  );
}
