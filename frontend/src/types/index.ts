export interface User {
    id: string;
    email: string;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterCredentials extends LoginCredentials {
    confirmPassword: string;
  }
  
  export interface ApiError {
    message: string;
    status: number;
  }