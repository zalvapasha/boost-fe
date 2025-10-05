import { PostList } from "@/features/posts";

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <div className="flex gap-2 text-2xl mb-4">
        <h1 className="text-red-500 font-bold">
          Boost<span className="font-light">Blog</span>
        </h1>{" "}
        <div className="border-l border-gray-300 pl-2">
          <h1>Frontend Technical Test</h1>
        </div>
      </div>
      <PostList />
    </main>
  );
}
