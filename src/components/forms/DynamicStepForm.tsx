import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { AboutMeComponent, AddressComponent, BirthdateComponent } from "./DynamicFormComponents";

interface DynamicStepFormProps {
  step: number;
}

export function DynamicStepForm({ step }: DynamicStepFormProps) {
  const { 
    currentUser, 
    getComponentsForStep, 
    updateUser, 
    setCurrentStep, 
    loading 
  } = useOnboarding();

  const [aboutMe, setAboutMe] = useState(currentUser?.about_me || "");
  const [streetAddress, setStreetAddress] = useState(currentUser?.street_address || "");
  const [city, setCity] = useState(currentUser?.city || "");
  const [state, setState] = useState(currentUser?.state || "");
  const [zip, setZip] = useState(currentUser?.zip || "");
  const [birthdate, setBirthdate] = useState<Date | undefined>(
    currentUser?.birthdate ? new Date(currentUser.birthdate) : undefined
  );

  const components = getComponentsForStep(step);

  useEffect(() => {
    if (currentUser) {
      setAboutMe(currentUser.about_me || "");
      setStreetAddress(currentUser.street_address || "");
      setCity(currentUser.city || "");
      setState(currentUser.state || "");
      setZip(currentUser.zip || "");
      setBirthdate(currentUser.birthdate ? new Date(currentUser.birthdate) : undefined);
    }
  }, [currentUser]);

  const handleNext = async () => {
    // Save current step data
    const updateData: any = { current_step: step };

    // Include data for components on this step
    components.forEach(component => {
      switch (component.component_type) {
        case 'about_me':
          updateData.about_me = aboutMe;
          break;
        case 'address':
          updateData.street_address = streetAddress;
          updateData.city = city;
          updateData.state = state;
          updateData.zip = zip;
          break;
        case 'birthdate':
          updateData.birthdate = birthdate?.toISOString().split('T')[0];
          break;
      }
    });

    await updateUser(updateData);
    
    // Move to next step
    if (step < 4) {
      setCurrentStep(step + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(Math.max(1, step - 1));
  };

  const getStepTitle = () => {
    const componentTypes = components.map(c => c.component_type);
    if (componentTypes.includes('about_me') && componentTypes.includes('address')) {
      return "Personal & Address Information";
    } else if (componentTypes.includes('about_me')) {
      return "Tell Us About Yourself";
    } else if (componentTypes.includes('address')) {
      return "Address Information";
    } else if (componentTypes.includes('birthdate')) {
      return "Personal Details";
    }
    return `Step ${step}`;
  };

  const getStepDescription = () => {
    return "Please fill out the information below to continue.";
  };

  const isStepValid = () => {
    for (const component of components) {
      switch (component.component_type) {
        case 'about_me':
          if (!aboutMe.trim()) return false;
          break;
        case 'address':
          if (!streetAddress.trim() || !city.trim() || !state.trim() || !zip.trim()) return false;
          break;
        case 'birthdate':
          if (!birthdate) return false;
          break;
      }
    }
    return true;
  };

  // If no components for this step, skip to next
  if (components.length === 0) {
    handleNext();
    return null;
  }

  return (
    <Card className="glass-card w-full max-w-2xl hover-lift animate-fade-in-up">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          {getStepTitle()}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {getStepDescription()}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {components.map((component) => {
          switch (component.component_type) {
            case 'about_me':
              return (
                <AboutMeComponent
                  key={component.id}
                  value={aboutMe}
                  onChange={setAboutMe}
                />
              );
            case 'address':
              return (
                <AddressComponent
                  key={component.id}
                  streetAddress={streetAddress}
                  city={city}
                  state={state}
                  zip={zip}
                  onStreetChange={setStreetAddress}
                  onCityChange={setCity}
                  onStateChange={setState}
                  onZipChange={setZip}
                />
              );
            case 'birthdate':
              return (
                <BirthdateComponent
                  key={component.id}
                  value={birthdate}
                  onChange={setBirthdate}
                />
              );
            default:
              return null;
          }
        })}

        <div className="flex justify-between pt-6">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 1}
            className="btn-glass"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={!isStepValid() || loading}
            className="btn-hero"
          >
            {loading ? "Saving..." : step === 3 ? "Complete" : "Next"}
            {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}