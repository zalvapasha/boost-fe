"use client";

import Link from "next/link";
import { Button } from "@/shared/ui/Button";
import type { WizardData } from "../types";

export type Step4ReviewSubmitProps = {
  value: WizardData;
  onSubmit: () => void;
  submittedPostId?: string | null;
};

export function Step4ReviewSubmit({
  value,
  onSubmit,
  submittedPostId,
}: Step4ReviewSubmitProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Review</h3>
        <dl className="mt-3 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-foreground/60">Title</dt>
            <dd className="font-medium">{value.title}</dd>
          </div>
          <div>
            <dt className="text-foreground/60">Author</dt>
            <dd className="font-medium">{value.author}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-foreground/60">Summary</dt>
            <dd className="font-medium">{value.summary}</dd>
          </div>
          <div>
            <dt className="text-foreground/60">Category</dt>
            <dd className="font-medium">{value.category}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-foreground/60">Content</dt>
            <dd className="font-medium whitespace-pre-wrap">{value.content}</dd>
          </div>
        </dl>
      </div>

      <div className="flex items-center gap-3">
        {submittedPostId ? (
          <>
            <span className="text-sm text-foreground/60">Saved!</span>
            <Link
              className="text-sm underline"
              href={`/posts/${submittedPostId}`}
            >
              View post
            </Link>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Step4ReviewSubmit;
