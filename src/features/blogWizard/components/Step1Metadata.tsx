"use client";

import { Input } from "@/shared/ui/Input";
import type { WizardData } from "../types";

export type Step1MetadataProps = {
  value: WizardData;
  errors?: Partial<Record<keyof WizardData, string>>;
  onChange: (patch: Partial<WizardData>) => void;
  onTouch?: (field: keyof WizardData) => void;
};

export function Step1Metadata({
  value,
  errors,
  onChange,
  onTouch,
}: Step1MetadataProps) {
  return (
    <div className="space-y-4">
      <Input
        label="Title"
        name="title"
        value={value.title}
        onChange={(e) => onChange({ title: e.target.value })}
        onBlur={() => onTouch?.("title")}
        placeholder="A concise, descriptive title"
        error={errors?.title}
      />
      <Input
        label="Author"
        name="author"
        value={value.author}
        onChange={(e) => onChange({ author: e.target.value })}
        onBlur={() => onTouch?.("author")}
        placeholder="Your name"
        error={errors?.author}
      />
    </div>
  );
}

export default Step1Metadata;
