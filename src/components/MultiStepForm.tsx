"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

interface MultiStepFormProps {
  steps: React.ReactNode[];
  onSubmit: (data: Record<string, unknown>) => void;
  className?: string;
}

export default function MultiStepForm({
  steps,
  onSubmit,
  className,
}: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData] = useState<Record<string, unknown>>({});
  const t = useTranslations("forms.common");

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div className={className}>
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((_, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStep
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-16 h-1 mx-2 ${
                    index < currentStep ? "bg-blue-600" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            Step {currentStep + 1} of {steps.length}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="min-h-[400px]">{steps[currentStep]}</div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              {t("previous")}
            </Button>

            {currentStep === steps.length - 1 ? (
              <Button onClick={handleSubmit}>{t("submit")}</Button>
            ) : (
              <Button onClick={nextStep}>{t("next")}</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
