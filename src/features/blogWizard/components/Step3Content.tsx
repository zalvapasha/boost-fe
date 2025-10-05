"use client";

import { Textarea } from "@/shared/ui/Textarea";
import type { WizardData } from "../types";

export type Step3ContentProps = {
  value: WizardData;
  errors?: Partial<Record<keyof WizardData, string>>;
  onChange: (patch: Partial<WizardData>) => void;
  onTouch?: (field: keyof WizardData) => void;
};

export function Step3Content({
  value,
  errors,
  onChange,
  onTouch,
}: Step3ContentProps) {
  return (
    <div className="space-y-4">
      <Textarea
        label="Content"
        name="content"
        value={value.content}
        onChange={(e) => onChange({ content: e.target.value })}
        onBlur={() => onTouch?.("content")}
        placeholder="Write your post content here..."
        error={errors?.content}
        showCount
      />
    </div>
  );
}

export default Step3Content;
