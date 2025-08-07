import { useOnboarding } from "@/contexts/OnboardingContext";
import { RegistrationForm } from "@/components/forms/RegistrationForm";
import { DynamicStepForm } from "@/components/forms/DynamicStepForm";
import { CompletionScreen } from "@/components/CompletionScreen";
import { ProgressIndicator } from "@/components/ProgressIndicator";

export function OnboardingFlow() {
  const { currentStep } = useOnboarding();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <RegistrationForm />;
      case 2:
      case 3:
        return (
          <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <ProgressIndicator currentStep={currentStep} totalSteps={4} />
            <DynamicStepForm step={currentStep} />
          </div>
        );
      case 4:
        return <CompletionScreen />;
      default:
        return <RegistrationForm />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderCurrentStep()}
    </div>
  );
}