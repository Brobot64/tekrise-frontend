import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import { LogIn } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      await login({ email, password });
      setLoading(false);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="bg-white p-8 rounded-lg shadow-xl border-t-4 border-primary-red">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-primary-blue rounded-full text-white mb-4">
            <LogIn size={32} />
          </div>
          <h1 className="text-2xl font-bold text-primary-blue">Welcome Back</h1>
          <p className="text-gray-500 text-sm">Sign in to manage your services</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input 
            label="Email Address"
            type="email"
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input 
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <Button 
            type="submit" 
            className="w-full h-11" 
            isLoading={loading}
          >
            Sign In
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary-red font-semibold hover:underline">
            Register now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
