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
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
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

    const user = result[0];
    const token = generateToken({ userId: user.id, email: user.email });

    return { user, token };
  } catch (error: any) {
    if (error?.code === '23505') {
      throw new AppError('Email already exists', 409);
    }
    throw new AppError('Failed to create user');
  }
}

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
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
}