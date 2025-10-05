"use client";

import Link from "next/link";
import { Button } from "@/shared/ui/Button";
import { usePosts } from "../hooks/usePosts";
import { PostCard } from "./PostCard";

export function PostList() {
  const { posts } = usePosts();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Posts</h2>
        <Link href="/create">
          <Button>New Post</Button>
        </Link>
      </div>
      {posts.length === 0 ? (
        <p className="text-sm text-foreground/60">
          No posts yet. Click &quot;New Post&quot; to create one.
        </p>
      ) : (
        <div className="grid gap-4">
          {posts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PostList;
