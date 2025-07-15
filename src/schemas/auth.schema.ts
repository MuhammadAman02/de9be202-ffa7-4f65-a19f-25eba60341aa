import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

// Zod schemas
const signupZod = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

const loginZod = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const authResponseZod = z.object({
  user: z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
  }),
  token: z.string(),
});

// Fastify-compatible JSON schemas
export const signupSchema = {
  tags: ["Auth"],
  body: zodToJsonSchema(signupZod),
  response: {
    201: zodToJsonSchema(authResponseZod),
  },
};

export const loginSchema = {
  tags: ["Auth"],
  body: zodToJsonSchema(loginZod),
  response: {
    200: zodToJsonSchema(authResponseZod),
  },
};