import { BlogWizard } from "@/features/blogWizard";

export default function CreatePage() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create a Post</h1>
      <BlogWizard />
    </main>
  );
}
