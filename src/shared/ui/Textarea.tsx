"use client";

import React from "react";

export type TextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
    error?: string;
    showCount?: boolean;
    id?: string;
  };

export function Textarea({
  label,
  error,
  showCount,
  id,
  className,
  value,
  maxLength,
  ...props
}: TextareaProps) {
  const textareaId = id || props.name || undefined;
  const length = typeof value === "string" ? value.length : 0;
  return (
    <div className="w-full">
      {label ? (
        <label htmlFor={textareaId} className="block text-sm font-medium mb-1">
          {label}
        </label>
      ) : null}
      <textarea
        id={textareaId}
        className={`w-full min-h-28 rounded-lg border border-foreground/20 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-foreground/30 ${
          error ? "border-red-500 focus:ring-red-500/30" : ""
        } ${className ?? ""}`}
        value={value}
        maxLength={maxLength}
        {...props}
      />
      <div className="mt-1 flex items-center justify-between">
        {error ? <p className="text-xs text-red-500">{error}</p> : <span />}
        {showCount ? (
          <p className="text-xs text-foreground/60">
            {length}
            {typeof maxLength === "number" ? `/${maxLength}` : null}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default Textarea;
