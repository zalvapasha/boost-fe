"use client";

import { useCallback, useMemo } from "react";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import type { Post } from "../types";

const STORAGE_KEY = "posts";

export function usePosts() {
  const [posts, setPosts] = useLocalStorage<Post[]>(STORAGE_KEY, []);

  const addPost = useCallback(
    (data: Omit<Post, "id" | "createdAt">) => {
      const post: Post = {
        id: String(Date.now()),
        createdAt: new Date().toISOString(),
        ...data,
      };
      setPosts((prev) => [post, ...prev]);
      return post;
    },
    [setPosts]
  );

  const getPostById = useCallback(
    (id: string) => {
      return posts.find((p) => p.id === id);
    },
    [posts]
  );

  const removePost = useCallback(
    (id: string) => {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    },
    [setPosts]
  );

  return useMemo(
    () => ({ posts, addPost, getPostById, removePost }),
    [posts, addPost, getPostById, removePost]
  );
}

export default usePosts;
