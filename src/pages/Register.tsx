import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { UserPlus } from 'lucide-react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 4) {
      toast.error('Password must be at least 4 characters');
      return;
    }

    const success = register(username, password);
    
    if (success) {
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } else {
      toast.error('Username already exists');
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-elegant animate-scale-in">
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10">
              <UserPlus className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Create Account
          </CardTitle>
          <CardDescription className="text-center">
            Register to unlock all word analysis features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full gradient-primary text-white shadow-elegant">
              Register
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{' '}
              <a href="/login" className="text-primary hover:underline">
                Login here
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
