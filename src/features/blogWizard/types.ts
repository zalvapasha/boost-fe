export type Post = {
  id: string;
  title: string;
  author: string;
  summary: string;
  category: string;
  content: string;
  createdAt: string;
};

export type WizardData = Omit<Post, "id" | "createdAt">;
