import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { LogIn } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    const success = login(username, password);
    
    if (success) {
      toast.success('Login successful!');
      navigate('/');
    } else {
      toast.error('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-elegant animate-scale-in">
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10">
              <LogIn className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center">
            Login to access all word analysis tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full gradient-primary text-white shadow-elegant">
              Login
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Don't have an account?{' '}
              <a href="/register" className="text-primary hover:underline">
                Register here
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
