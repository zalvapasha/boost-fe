"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { usePosts } from "@/features/posts";
import { Button } from "@/shared/ui/Button";

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string);
  const { getPostById, removePost } = usePosts();
  const post = id ? getPostById(id) : undefined;

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto p-6 space-y-4">
        <p className="text-sm">Post not found.</p>
        <Link href="/" className="underline text-sm">
          Back to home
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <time className="text-xs text-foreground/60" dateTime={post.createdAt}>
          {new Date(post.createdAt).toLocaleString()}
        </time>
      </div>
      <p className="text-sm text-foreground/70">By {post.author}</p>
      <div>
        <span className="rounded bg-foreground/10 px-2 py-1 text-xs">
          {post.category}
        </span>
      </div>
      <article className="prose prose-invert max-w-none whitespace-pre-wrap">
        {post.content}
      </article>

      <div className="pt-4 flex items-center gap-3">
        <Button variant="secondary" onClick={() => router.push("/")}>
          Back
        </Button>
        <p
          className="text-sm hover:underline cursor-pointer text-foreground/50"
          onClick={() => {
            removePost(post.id);
            router.push("/");
          }}
        >
          Delete
        </p>
      </div>
    </main>
  );
}
