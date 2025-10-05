"use client";

import React from "react";

export type FormErrorProps = {
  message?: string;
};

export function FormError({ message }: FormErrorProps) {
  if (!message) return null;
  return <p className="text-sm text-red-500">{message}</p>;
}

export default FormError;
