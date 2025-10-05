import { PostList } from "@/features/posts";

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Blog</h1>
      <PostList />
    </main>
  );
}
