import { db } from '../db/client';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { AppError } from '../utils/AppError';
import { generateToken } from '../utils/jwt';

export async function signupUser({
  email,
  password,
  firstName,
  lastName,
}: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) {
  console.log('Starting user signup for email:', email);
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully');

    const result = await db
      .insert(users)
      .values({
        email,
        password: hashedPassword,
        firstName,
        lastName,
      })
      .returning({
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
      });

    console.log('User created successfully:', result[0]);

    const user = result[0];
    const token = generateToken({ userId: user.id, email: user.email });
    console.log('Token generated successfully');

    return { user, token };
  } catch (error: any) {
    console.error('Signup error details:', {
      message: error.message,
      code: error.code,
      detail: error.detail,
      stack: error.stack
    });
    
    if (error?.code === '23505') {
      throw new AppError('Email already exists', 409);
    }
    
    // More specific error handling
    if (error.message?.includes('connect')) {
      throw new AppError('Database connection failed', 500);
    }
    
    throw new AppError(`Failed to create user: ${error.message}`, 500);
  }
}

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  console.log('Starting user login for email:', email);
  
  try {
    const result = await db
      .select({
        id: users.id,
        email: users.email,
        password: users.password,
        firstName: users.firstName,
        lastName: users.lastName,
      })
      .from(users)
      .where(eq(users.email, email));

    if (result.length === 0) {
      throw new AppError('Invalid credentials', 401);
    }

    const user = result[0];
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new AppError('Invalid credentials', 401);
    }

    const token = generateToken({ userId: user.id, email: user.email });

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      token,
    };
  } catch (error: any) {
    console.error('Login error details:', error);
    
    if (error instanceof AppError) {
      throw error;
    }
    
    throw new AppError(`Login failed: ${error.message}`, 500);
  }
}