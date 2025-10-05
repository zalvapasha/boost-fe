"use client";

import { useCallback, useMemo, useReducer, useState } from "react";
import type { WizardData } from "../types";
import { usePosts } from "@/features/posts";

type WizardStep = 1 | 2 | 3 | 4;

type WizardState = {
  data: WizardData;
  step: WizardStep;
  touched: Set<keyof WizardData>;
};

type Action =
  | { type: "update"; payload: Partial<WizardData> }
  | { type: "go"; payload: WizardStep }
  | { type: "touch"; payload: keyof WizardData };

const initialData: WizardData = {
  title: "",
  author: "",
  summary: "",
  category: "",
  content: "",
};

function reducer(state: WizardState, action: Action): WizardState {
  switch (action.type) {
    case "update":
      return { ...state, data: { ...state.data, ...action.payload } };
    case "go":
      return { ...state, step: action.payload };
    case "touch":
      return {
        ...state,
        touched: new Set([...state.touched, action.payload]),
      };
    default:
      return state;
  }
}

export function useWizard() {
  const [{ data, step, touched }, dispatch] = useReducer(reducer, {
    data: initialData,
    step: 1,
    touched: new Set<keyof WizardData>(),
  });
  const [submittedPostId, setSubmittedPostId] = useState<string | null>(null);
  const { addPost } = usePosts();

  const validateStep = useCallback(
    (s: WizardStep, d: WizardData = data) => {
      switch (s) {
        case 1:
          return d.title.trim().length >= 3 && d.author.trim().length > 0;
        case 2:
          return d.summary.trim().length >= 10 && d.category.trim().length > 0;
        case 3:
          return d.content.trim().length >= 20;
        case 4:
          return true;
        default:
          return false;
      }
    },
    [data]
  );

  const errors = useMemo(() => {
    const e: Partial<Record<keyof WizardData, string>> = {};
    if (step === 1) {
      if (touched.has("title")) {
        if (!data.title.trim()) e.title = "Title is required";
        else if (data.title.trim().length < 3)
          e.title = "Title must be at least 3 characters";
      }
      if (touched.has("author")) {
        if (!data.author.trim()) e.author = "Author is required";
      }
    }
    if (step === 2) {
      if (touched.has("summary")) {
        if (!data.summary.trim()) e.summary = "Summary is required";
        else if (data.summary.trim().length < 10)
          e.summary = "Summary must be at least 10 characters";
      }
      if (touched.has("category")) {
        if (!data.category.trim()) e.category = "Category is required";
      }
    }
    if (step === 3) {
      if (touched.has("content")) {
        if (!data.content.trim()) e.content = "Content is required";
        else if (data.content.trim().length < 20)
          e.content = "Content must be at least 20 characters";
      }
    }
    return e;
  }, [data, step, touched]);

  const nextStep = useCallback(() => {
    // Mark all fields in current step as touched to show validation errors
    const fieldsToTouch: (keyof WizardData)[] = [];
    if (step === 1) fieldsToTouch.push("title", "author");
    else if (step === 2) fieldsToTouch.push("summary", "category");
    else if (step === 3) fieldsToTouch.push("content");

    fieldsToTouch.forEach((field) => {
      dispatch({ type: "touch", payload: field });
    });

    if (!validateStep(step)) return false;
    dispatch({ type: "go", payload: Math.min(step + 1, 4) as WizardStep });
    return true;
  }, [step, validateStep]);

  const prevStep = useCallback(() => {
    dispatch({ type: "go", payload: Math.max(step - 1, 1) as WizardStep });
  }, [step]);

  const goToStep = useCallback((target: WizardStep) => {
    dispatch({ type: "go", payload: target });
  }, []);

  const update = useCallback((patch: Partial<WizardData>) => {
    dispatch({ type: "update", payload: patch });
  }, []);

  const touchField = useCallback((field: keyof WizardData) => {
    dispatch({ type: "touch", payload: field });
  }, []);

  const submitPost = useCallback(() => {
    if (!validateStep(3)) return null;
    const created = addPost(data);
    setSubmittedPostId(created.id);
    dispatch({ type: "go", payload: 4 });
    return created;
  }, [addPost, data, validateStep]);

  return {
    data,
    step,
    errors,
    nextStep,
    prevStep,
    goToStep,
    update,
    touchField,
    validateStep,
    submitPost,
    submittedPostId,
  } as const;
}

export default useWizard;
