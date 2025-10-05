"use client";

import React from "react";
import { Button } from "@/shared/ui/Button";
import { useRouter } from "next/navigation";

export type WizardLayoutProps = {
  step: 1 | 2 | 3 | 4;
  canNext: boolean;
  onBack?: () => void;
  onNext?: () => void;
  children: React.ReactNode;
};

export function WizardLayout({
  step,
  canNext,
  onBack,
  onNext,
  children,
}: WizardLayoutProps) {
  const router = useRouter();
  const steps = [
    "Metadata",
    "Summary & Category",
    "Content",
    "Review & Submit",
  ];

  return (
    <div className="max-w-3xl mx-auto py-3 space-y-6">
      <div className="flex items-center gap-2 text-sm justify-center">
        {steps.map((label, i) => {
          const idx = (i + 1) as 1 | 2 | 3 | 4;
          const active = idx === step;
          const done = idx < step;
          return (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`size-7 rounded-full grid place-items-center text-xs border ${
                  active
                    ? "bg-foreground text-background"
                    : done
                    ? "bg-foreground/20"
                    : "bg-transparent"
                }`}
                aria-current={active ? "step" : undefined}
              >
                {idx}
              </div>
              <span
                className={`hidden sm:block ${
                  active ? "font-medium" : "text-foreground/70"
                }`}
              >
                {label}
              </span>
              {i < steps.length - 1 ? (
                <div className="w-6 h-px bg-foreground/20" />
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="rounded-lg border border-foreground/15 p-4">
        {children}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="secondary" onClick={onBack}>
            {step === 1 ? "Cancel" : "Back"}
          </Button>
          {step > 1 && (
            <p
              className="text-sm hover:underline cursor-pointer text-foreground/50"
              onClick={() => router.push("/")}
            >
              Cancel
            </p>
          )}
        </div>

        <Button onClick={onNext} disabled={!canNext}>
          {step < 4 ? "Next" : "Finish"}
        </Button>
      </div>
    </div>
  );
}

export default WizardLayout;
