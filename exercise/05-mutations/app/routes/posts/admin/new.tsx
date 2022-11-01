import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { createPost } from "~/models/post.server";

export async function action({ request }: ActionArgs) {
  const blogPostData = await request.formData();
  const title = blogPostData.get("title");
  const slug = blogPostData.get("slug");
  const markdown = blogPostData.get("markdown");

  const errors = {
    title: title ? null : "Title is mandatory",
    slug: slug ? null : "Slug is mandatory",
    markdown: markdown ? null : "markdown is mandatory",
  };

  if (Object.values(errors).some(Boolean)) {
    return json(errors);
  }
  invariant(typeof title === "string", "Title is not a valid type");
  invariant(typeof slug === "string", "slug is not a valid type");
  invariant(typeof markdown === "string", "markdown is not a valid type");
  await createPost({ title, slug, markdown });
  return redirect(`/posts/admin`);
}

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

export default function NewPost() {
  const errors = useActionData<typeof action>();
  return (
    <Form method="post">
      <p>
        <label>
          Post Title:{" "}
          <input type="text" name="title" className={inputClassName} />
          {errors?.title ? (
            <span className="text-red-500">{errors.title}</span>
          ) : null}
        </label>
      </p>
      <p>
        <label>
          Post Slug:{" "}
          <input type="text" name="slug" className={inputClassName} />
          {errors?.slug ? (
            <span className="text-red-500">{errors.slug}</span>
          ) : null}
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown: </label>
        <br />
        <textarea
          id="markdown"
          rows={8}
          name="markdown"
          className={`${inputClassName} font-mono`}
        />
        {errors?.markdown ? (
          <span className="text-red-500">{errors.markdown}</span>
        ) : null}
      </p>
      <p className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
        >
          Create Post
        </button>
      </p>
    </Form>
  );
}
