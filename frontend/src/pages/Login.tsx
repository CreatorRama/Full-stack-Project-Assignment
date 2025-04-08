import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useLogin } from '../hooks/useAuth';
import { useEffect } from 'react';

const loginSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .regex(
      /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/,
      'Invalid email format (e.g., user@example.com)'
    )
    .refine(
      email => !email.includes('..') && 
               !email.startsWith('.') && 
               !email.startsWith('-') &&
               !email.includes('@-') &&
               !email.endsWith('.'),
      {
        message: 'Contains invalid character sequence'
      }
    ),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(32, 'Password must be less than 32 characters')
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { mutate, isLoading, error,reset } = useLogin();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        reset();
      }, 2000); 
      return () => clearTimeout(timer);
    }
  }, [error, reset]);

  const onSubmit = (data: LoginFormData) => {
    mutate(data, {
      onSuccess: () => {
        navigate('/login');
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-center text-2xl font-bold mb-8">Welcome back!</h2>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              {...register('email')}
              type="email"
              placeholder="UID"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          
          <div className="mb-6">
            <input
              {...register('password')}
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          
          {error && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded-md">
              {error.message}
            </div>
          )}
          
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
          
          <div className="mt-4 text-center">
            <span className="text-gray-600">Don't have an account? </span>
            <Link to="/register" className="text-blue-600 hover:text-blue-800">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;