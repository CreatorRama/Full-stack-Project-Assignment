import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { AppError, UserInput, UserOutput } from '../types/index.js';
import { hashPassword, comparePassword } from '../utils/passwordUtils.js';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const loginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = loginSchema;

 const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = registerSchema.parse(req.body);

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
           return res.status(401).json({ message: "User Already exists" });
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create new user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '1d' }
        );

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            secure: process.env.NODE_ENV === 'development',
        });

        // Return user data (exclude password)
        const userOutput: UserOutput = {
            id: user.id,
            email: user.email,
        };

        return res.status(201).json(userOutput);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                message: 'Validation error',
                errors: error.errors,
            });
        }

        next(error);
    }
};

 const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = loginSchema.parse(req.body);

        // Find user
        const user = await prisma.user.findUnique({
            where: { email },
        });
        // console.log(user)
        if (!user) {
            throw new AppError("Email is wrong or Kindly register", 401);
        }
        

        // Check password
        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Password is Wrong or Kindly register" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '1d' }
        );

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            secure: process.env.NODE_ENV === 'production',
        });

        // Return user data (exclude password)
        const userOutput: UserOutput = {
            id: user.id,
            email: user.email,
        };

        return res.status(200).json(userOutput);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                message: 'Validation error',
                errors: error.errors,
            });
        }

        next(error);
    }
};

export {
    login,register
}