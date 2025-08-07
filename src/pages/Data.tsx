import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Settings, Users, RefreshCw, Calendar, MapPin, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  created_at: string;
}

export default function Data() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      email: 'john.doe@example.com',
      current_step: 4,
      about_me: 'I am a software developer passionate about creating amazing user experiences...',
      street_address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      birthdate: '1990-05-15',
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      email: 'jane.smith@example.com',
      current_step: 2,
      about_me: 'Marketing professional with 5 years of experience in digital campaigns...',
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: '3',
      email: 'bob.wilson@example.com',
      current_step: 3,
      about_me: 'Product manager focused on user-centric design and agile methodologies...',
      street_address: '456 Oak Ave',
      city: 'San Francisco',
      state: 'CA',
      zip: '94102',
      created_at: new Date(Date.now() - 172800000).toISOString(),
    },
  ]);
  const [loading, setLoading] = useState(false);

  const refreshData = async () => {
    setLoading(true);
    try {
      // Mock refresh - replace with actual Supabase call
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      setLoading(false);
    }
  };

  const getStepBadge = (step: number) => {
    const stepConfig = {
      1: { label: 'Registration', variant: 'secondary' },
      2: { label: 'Step 2', variant: 'outline' },
      3: { label: 'Step 3', variant: 'outline' },
      4: { label: 'Completed', variant: 'default' },
    } as const;

    const config = stepConfig[step as keyof typeof stepConfig] || { label: 'Unknown', variant: 'secondary' };
    
    return (
      <Badge variant={config.variant as any} className={
        step === 4 ? 'bg-success/20 text-success border-success/30' : ''
      }>
        {config.label}
      </Badge>
    );
  };

  const formatAddress = (user: User) => {
    if (!user.street_address) return 'Not provided';
    return `${user.street_address}, ${user.city}, ${user.state} ${user.zip}`;
  };

  const truncateText = (text: string | undefined, maxLength = 50) => {
    if (!text) return 'Not provided';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const getUsersByStep = () => {
    const stepCounts = { 1: 0, 2: 0, 3: 0, 4: 0 };
    users.forEach(user => {
      stepCounts[user.current_step as keyof typeof stepCounts]++;
    });
    return stepCounts;
  };

  const stepCounts = getUsersByStep();

  return (
    <div className="min-h-screen p-6 animate-fade-in-up">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              User Data Overview
            </h1>
            <p className="text-muted-foreground mt-2">
              Real-time view of all registered users and their onboarding progress
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={refreshData}
              disabled={loading}
              variant="outline"
              className="btn-glass"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            
            <Button
              onClick={() => navigate('/admin')}
              variant="outline"
              className="btn-glass"
            >
              <Settings className="mr-2 h-4 w-4" />
              Admin Panel
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold text-primary">{users.length}</p>
                </div>
                <Users className="h-8 w-8 text-primary/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-success">{stepCounts[4]}</p>
                </div>
                <FileText className="h-8 w-8 text-success/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold text-warning">{stepCounts[2] + stepCounts[3]}</p>
                </div>
                <Calendar className="h-8 w-8 text-warning/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">New Users</p>
                  <p className="text-2xl font-bold text-accent">{stepCounts[1]}</p>
                </div>
                <MapPin className="h-8 w-8 text-accent/60" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>
              Complete list of registered users with their onboarding status and information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10">
                    <TableHead className="text-foreground">Email</TableHead>
                    <TableHead className="text-foreground">Status</TableHead>
                    <TableHead className="text-foreground">About Me</TableHead>
                    <TableHead className="text-foreground">Address</TableHead>
                    <TableHead className="text-foreground">Birthdate</TableHead>
                    <TableHead className="text-foreground">Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} className="border-white/10 hover:bg-white/5">
                      <TableCell className="font-medium">{user.email}</TableCell>
                      <TableCell>{getStepBadge(user.current_step)}</TableCell>
                      <TableCell className="max-w-xs">
                        {truncateText(user.about_me)}
                      </TableCell>
                      <TableCell className="max-w-xs">
                        {truncateText(formatAddress(user), 40)}
                      </TableCell>
                      <TableCell>
                        {user.birthdate ? new Date(user.birthdate).toLocaleDateString() : 'Not provided'}
                      </TableCell>
                      <TableCell>
                        {new Date(user.created_at).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

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