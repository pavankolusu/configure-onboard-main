import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, RotateCcw, Settings, BarChart3 } from "lucide-react";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useNavigate } from "react-router-dom";

export function CompletionScreen() {
  const { currentUser, setCurrentStep } = useOnboarding();
  const navigate = useNavigate();

  const handleRestart = () => {
    setCurrentStep(1);
  };

  const handleGoToAdmin = () => {
    navigate('/admin');
  };

  const handleGoToData = () => {
    navigate('/data');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in-up">
      <Card className="glass-card w-full max-w-md text-center hover-lift">
        <CardHeader className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center animate-pulse-glow">
            <CheckCircle className="h-8 w-8 text-primary-foreground" />
          </div>
          
          <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Congratulations!
          </CardTitle>
          
          <CardDescription className="text-lg text-muted-foreground">
            You have successfully completed the onboarding process.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {currentUser && (
            <div className="glass-card p-4 space-y-2 text-left">
              <h3 className="font-semibold text-primary">Your Information:</h3>
              <p className="text-sm"><strong>Email:</strong> {currentUser.email}</p>
              {currentUser.about_me && (
                <p className="text-sm"><strong>About:</strong> {currentUser.about_me.substring(0, 50)}...</p>
              )}
              {currentUser.city && (
                <p className="text-sm"><strong>Location:</strong> {currentUser.city}, {currentUser.state}</p>
              )}
              {currentUser.birthdate && (
                <p className="text-sm"><strong>Birthdate:</strong> {new Date(currentUser.birthdate).toLocaleDateString()}</p>
              )}
            </div>
          )}

          <div className="space-y-3">
            <Button
              onClick={handleRestart}
              variant="outline"
              className="btn-glass w-full"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Start Over
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleGoToAdmin}
                variant="outline"
                className="btn-glass"
              >
                <Settings className="mr-2 h-4 w-4" />
                Admin
              </Button>

              <Button
                onClick={handleGoToData}
                variant="outline"
                className="btn-glass"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Data
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}