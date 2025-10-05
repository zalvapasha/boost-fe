import Link from "next/link";
import type { Post } from "../types";

export type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="rounded-lg border border-foreground/15 p-4 hover:shadow-sm transition">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-lg font-semibold">
          <Link href={`/posts/${post.id}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>
        <time className="text-xs text-foreground/60" dateTime={post.createdAt}>
          {new Date(post.createdAt).toLocaleDateString()}
        </time>
      </div>
      <p className="mt-1 text-sm text-foreground/70">By {post.author}</p>
      <p className="mt-2 text-sm line-clamp-3">{post.summary}</p>
      <div className="mt-3 text-xs">
        <span className="rounded bg-foreground/10 px-2 py-1">
          {post.category}
        </span>
      </div>
    </article>
  );
}

export default PostCard;
