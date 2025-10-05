"use client";

import { Textarea } from "@/shared/ui/Textarea";
import type { WizardData } from "../types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/Select";

export type Step2SummaryCategoryProps = {
  value: WizardData;
  errors?: Partial<Record<keyof WizardData, string>>;
  onChange: (patch: Partial<WizardData>) => void;
  onTouch?: (field: keyof WizardData) => void;
};

const CATEGORIES = ["Tech", "Lifestyle", "Business"] as const;

export function Step2SummaryCategory({
  value,
  errors,
  onChange,
  onTouch,
}: Step2SummaryCategoryProps) {
  return (
    <div className="space-y-4">
      <Textarea
        label="Summary"
        name="summary"
        value={value.summary}
        onChange={(e) => onChange({ summary: e.target.value })}
        onBlur={() => onTouch?.("summary")}
        placeholder="A clear, brief overview of the post..."
        error={errors?.summary}
        showCount
        maxLength={240}
      />
      <div className="space-y-2">
        <label className="block text-sm font-medium" htmlFor="category">
          Category
        </label>
        <Select
          value={value.category}
          onValueChange={(value) => onChange({ category: value })}
        >
          <SelectTrigger
            id="category"
            className={`w-full ${
              errors?.category ? "border-red-500 focus:ring-red-500/30" : ""
            }`}
            onBlur={() => onTouch?.("category")}
          >
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors?.category ? (
          <p className="text-xs text-red-500">{errors.category}</p>
        ) : null}
      </div>
    </div>
  );
}

export default Step2SummaryCategory;
