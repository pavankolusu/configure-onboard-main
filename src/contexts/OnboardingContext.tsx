import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

interface User {
  id: string;
  email: string;
  current_step: number;
  about_me?: string;
  street_address?: string;
  city?: string;
  state?: string;
  zip?: string;
  birthdate?: string;
}

interface OnboardingConfig {
  id: string;
  component_type: 'about_me' | 'address' | 'birthdate';
  page_number: 2 | 3;
  is_active: boolean;
}

interface OnboardingContextType {
  currentUser: User | null;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  onboardingConfig: OnboardingConfig[];
  updateUser: (data: Partial<User>) => Promise<void>;
  registerUser: (email: string, password: string, confirmPassword: string) => Promise<void>;
  getComponentsForStep: (step: number) => OnboardingConfig[];
  loading: boolean;
  refetchConfig: () => Promise<void>;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingConfig, setOnboardingConfig] = useState<OnboardingConfig[]>([]);
  const [loading, setLoading] = useState(false);

  // Simple password hashing for development
  const hashPassword = (password: string): string => {
    return btoa(password); // Base64 encoding - NOT for production use
  };

  const fetchOnboardingConfig = async () => {
    try {
      // For now, using mock data since Supabase isn't fully set up
      const mockConfig: OnboardingConfig[] = [
        { id: '1', component_type: 'about_me', page_number: 2, is_active: true },
        { id: '2', component_type: 'address', page_number: 3, is_active: true },
        { id: '3', component_type: 'birthdate', page_number: 3, is_active: true },
      ];
      setOnboardingConfig(mockConfig);
    } catch (error) {
      console.error('Failed to fetch onboarding config:', error);
      toast({
        title: "Error",
        description: "Failed to load onboarding configuration",
        variant: "destructive"
      });
    }
  };

  const registerUser = async (email: string, password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Error", 
        description: "Password must be at least 6 characters long",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // Mock user creation - replace with actual Supabase call once set up
      const newUser: User = {
        id: crypto.randomUUID(),
        email,
        current_step: 2, // Start at step 2 after registration
      };
      
      setCurrentUser(newUser);
      setCurrentStep(2);
      
      toast({
        title: "Success",
        description: "Account created successfully!",
      });
    } catch (error) {
      console.error('Registration failed:', error);
      toast({
        title: "Error",
        description: "Failed to create account",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (data: Partial<User>) => {
    if (!currentUser) return;

    setLoading(true);
    try {
      // Mock user update - replace with actual Supabase call
      const updatedUser = { ...currentUser, ...data };
      setCurrentUser(updatedUser);
      
      toast({
        title: "Progress Saved",
        description: "Your information has been saved successfully",
      });
    } catch (error) {
      console.error('Failed to update user:', error);
      toast({
        title: "Error", 
        description: "Failed to save your information",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getComponentsForStep = (step: number): OnboardingConfig[] => {
    return onboardingConfig.filter(config => 
      config.page_number === step && config.is_active
    );
  };

  const refetchConfig = async () => {
    await fetchOnboardingConfig();
  };

  useEffect(() => {
    fetchOnboardingConfig();
  }, []);

  return (
    <OnboardingContext.Provider
      value={{
        currentUser,
        currentStep,
        setCurrentStep,
        onboardingConfig,
        updateUser,
        registerUser,
        getComponentsForStep,
        loading,
        refetchConfig,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}