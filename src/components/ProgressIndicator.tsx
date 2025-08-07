import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function ProgressIndicator({ currentStep, totalSteps, className }: ProgressIndicatorProps) {
  return (
    <div className={cn("w-full max-w-md mx-auto mb-8", className)}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-primary">
          {Math.round((currentStep / totalSteps) * 100)}%
        </span>
      </div>
      
      <div className="relative">
        <div className="w-full bg-surface-light rounded-full h-3 shadow-inner">
          <div 
            className="progress-glow h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
        
        {/* Step indicators */}
        <div className="flex justify-between mt-3">
          {Array.from({ length: totalSteps }, (_, index) => (
            <div
              key={index}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
                index + 1 <= currentStep
                  ? "bg-gradient-primary text-primary-foreground shadow-glow scale-110"
                  : "bg-surface border-2 border-white/20 text-muted-foreground"
              )}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}