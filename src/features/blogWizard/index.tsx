"use client";

import { useRouter } from "next/navigation";
import { WizardLayout } from "./components/WizardLayout";
import { Step1Metadata } from "./components/Step1Metadata";
import { Step2SummaryCategory } from "./components/Step2SummaryCategory";
import { Step3Content } from "./components/Step3Content";
import { Step4ReviewSubmit } from "./components/Step4ReviewSubmit";
import { useWizard } from "./hooks/useWizard";

export function BlogWizard() {
  const router = useRouter();
  const {
    data,
    step,
    errors,
    nextStep,
    prevStep,
    update,
    touchField,
    validateStep,
    submitPost,
    submittedPostId,
  } = useWizard();

  const handleNext = () => {
    if (step < 3) {
      nextStep();
    } else if (step === 3) {
      const created = submitPost();
      if (created) {
      }
    } else if (step === 4) {
      router.push("/");
    }
  };

  const handleBack = () => {
    if (step === 1) {
      router.push("/");
    } else {
      prevStep();
    }
  };

  return (
    <WizardLayout
      step={step}
      canNext={validateStep(step)}
      onBack={handleBack}
      onNext={handleNext}
    >
      {step === 1 && (
        <Step1Metadata
          value={data}
          errors={errors}
          onChange={update}
          onTouch={touchField}
        />
      )}
      {step === 2 && (
        <Step2SummaryCategory
          value={data}
          errors={errors}
          onChange={update}
          onTouch={touchField}
        />
      )}
      {step === 3 && (
        <Step3Content
          value={data}
          errors={errors}
          onChange={update}
          onTouch={touchField}
        />
      )}
      {step === 4 && (
        <Step4ReviewSubmit
          value={data}
          onSubmit={() => router.push("/")}
          submittedPostId={submittedPostId}
        />
      )}
    </WizardLayout>
  );
}

export default BlogWizard;
