import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Settings, BarChart3, RefreshCw, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface OnboardingConfig {
  id: string;
  component_type: 'about_me' | 'address' | 'birthdate';
  page_number: 2 | 3;
  is_active: boolean;
}

export default function Admin() {
  const navigate = useNavigate();
  const [config, setConfig] = useState<OnboardingConfig[]>([
    { id: '1', component_type: 'about_me', page_number: 2, is_active: true },
    { id: '2', component_type: 'address', page_number: 3, is_active: true },
    { id: '3', component_type: 'birthdate', page_number: 3, is_active: true },
  ]);
  const [hasChanges, setHasChanges] = useState(false);

  const componentLabels = {
    about_me: "About Me",
    address: "Address",
    birthdate: "Birthdate"
  };

  const updateComponentPage = (componentType: string, pageNumber: 2 | 3) => {
    setConfig(prev => prev.map(item => 
      item.component_type === componentType 
        ? { ...item, page_number: pageNumber }
        : item
    ));
    setHasChanges(true);
  };

  const saveConfiguration = async () => {
    try {
      // Mock save - replace with actual Supabase call
      console.log('Saving configuration:', config);
      setHasChanges(false);
      toast({
        title: "Success",
        description: "Configuration saved successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save configuration",
        variant: "destructive"
      });
    }
  };

  const applyPreset = (preset: string) => {
    let newConfig = [...config];
    
    switch (preset) {
      case 'default':
        newConfig = [
          { id: '1', component_type: 'about_me', page_number: 2, is_active: true },
          { id: '2', component_type: 'address', page_number: 3, is_active: true },
          { id: '3', component_type: 'birthdate', page_number: 3, is_active: true },
        ];
        break;
      case 'personal_address_first':
        newConfig = [
          { id: '1', component_type: 'about_me', page_number: 2, is_active: true },
          { id: '2', component_type: 'address', page_number: 2, is_active: true },
          { id: '3', component_type: 'birthdate', page_number: 3, is_active: true },
        ];
        break;
      case 'all_page_2':
        newConfig = [
          { id: '1', component_type: 'about_me', page_number: 2, is_active: true },
          { id: '2', component_type: 'address', page_number: 2, is_active: true },
          { id: '3', component_type: 'birthdate', page_number: 2, is_active: true },
        ];
        break;
    }
    
    setConfig(newConfig);
    setHasChanges(true);
    toast({
      title: "Preset Applied",
      description: "Configuration updated with preset settings",
    });
  };

  const getComponentsForPage = (pageNumber: 2 | 3) => {
    return config.filter(item => item.page_number === pageNumber && item.is_active);
  };

  return (
    <div className="min-h-screen p-6 animate-fade-in-up">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Onboarding Configuration
            </h1>
            <p className="text-muted-foreground mt-2">
              Configure which components appear on each step of the onboarding flow
            </p>
          </div>
          
          <div className="flex gap-3">
            {hasChanges && (
              <Button onClick={saveConfiguration} className="btn-hero">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            )}
            
            <Button
              onClick={() => navigate('/data')}
              variant="outline"
              className="btn-glass"
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              View Data
            </Button>
          </div>
        </div>

        {/* Quick Presets */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-primary" />
              Quick Configuration Presets
            </CardTitle>
            <CardDescription>
              Apply common configuration patterns with one click
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={() => applyPreset('default')}
                variant="outline"
                className="btn-glass h-auto p-4 flex flex-col items-start"
              >
                <h3 className="font-semibold text-left">Default Setup</h3>
                <p className="text-sm text-muted-foreground text-left">
                  About Me → Page 2<br />
                  Address + Birthdate → Page 3
                </p>
              </Button>
              
              <Button
                onClick={() => applyPreset('personal_address_first')}
                variant="outline"
                className="btn-glass h-auto p-4 flex flex-col items-start"
              >
                <h3 className="font-semibold text-left">Personal + Address First</h3>
                <p className="text-sm text-muted-foreground text-left">
                  About Me + Address → Page 2<br />
                  Birthdate → Page 3
                </p>
              </Button>
              
              <Button
                onClick={() => applyPreset('all_page_2')}
                variant="outline"
                className="btn-glass h-auto p-4 flex flex-col items-start"
              >
                <h3 className="font-semibold text-left">All on Page 2</h3>
                <p className="text-sm text-muted-foreground text-left">
                  All Components → Page 2<br />
                  Nothing → Page 3
                </p>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Component Configuration */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Individual Component Settings */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Component Configuration
              </CardTitle>
              <CardDescription>
                Assign each component to a specific page
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {config.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 glass-card">
                  <div>
                    <h3 className="font-medium">{componentLabels[item.component_type]}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.component_type === 'about_me' && 'Textarea for personal information'}
                      {item.component_type === 'address' && 'Street, city, state, and ZIP inputs'}
                      {item.component_type === 'birthdate' && 'Date picker for birth date'}
                    </p>
                  </div>
                  
                  <Select
                    value={item.page_number.toString()}
                    onValueChange={(value) => updateComponentPage(item.component_type, parseInt(value) as 2 | 3)}
                  >
                    <SelectTrigger className="w-24 bg-surface/50 border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-card border-white/20">
                      <SelectItem value="2">Page 2</SelectItem>
                      <SelectItem value="3">Page 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Page Preview */}
          <div className="space-y-4">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-primary">Page 2 Components</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {getComponentsForPage(2).map((item) => (
                    <Badge key={item.id} variant="secondary" className="bg-primary/20 text-primary">
                      {componentLabels[item.component_type]}
                    </Badge>
                  ))}
                  {getComponentsForPage(2).length === 0 && (
                    <p className="text-muted-foreground text-sm">No components assigned</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-accent">Page 3 Components</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {getComponentsForPage(3).map((item) => (
                    <Badge key={item.id} variant="secondary" className="bg-accent/20 text-accent">
                      {componentLabels[item.component_type]}
                    </Badge>
                  ))}
                  {getComponentsForPage(3).length === 0 && (
                    <p className="text-muted-foreground text-sm">No components assigned</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Back to Onboarding */}
        <div className="flex justify-center">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="btn-glass"
          >
            Back to Onboarding
          </Button>
        </div>
      </div>
    </div>
  );
}