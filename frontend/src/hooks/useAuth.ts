import { useMutation, useQueryClient } from 'react-query';
import { LoginCredentials, RegisterCredentials, User, ApiError } from '../types';

const API_URL = (import.meta as any).env.VITE_API_URL; 


export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation<User, ApiError, LoginCredentials>(
    async (credentials) => {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        credentials: 'include',
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw { message: error.message || 'Login failed', status: response.status };
      }
      
      return response.json();
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData('user', data);
      },
    }
  );
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  
  return useMutation<User, ApiError, RegisterCredentials>(
    async (credentials) => {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        credentials: 'include',
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw { message: error.message || 'Registration failed', status: response.status };
      }
      
      return response.json();
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData('user', data);
      },
    }
  );
};