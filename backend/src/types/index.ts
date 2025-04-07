

export class AppError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export interface UserInput {
  email: string;
  password: string;
}

export interface UserOutput {
  id: number | string;
  email: string;
}