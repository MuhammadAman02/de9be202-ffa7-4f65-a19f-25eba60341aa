import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

// Zod schemas
const createShoeZod = z.object({
  name: z.string().min(1),
  brand: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive(),
  size: z.string().min(1),
  color: z.string().min(1),
  category: z.string().min(1),
  inStock: z.boolean().default(true),
  imageUrl: z.string().url().optional(),
});

const updateShoeZod = createShoeZod.partial();

const shoeResponseZod = z.object({
  id: z.string().uuid(),
  name: z.string(),
  brand: z.string(),
  description: z.string().nullable(),
  price: z.string(),
  size: z.string(),
  color: z.string(),
  category: z.string(),
  inStock: z.boolean(),
  imageUrl: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const getShoesQueryZod = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  brand: z.string().optional(),
  category: z.string().optional(),
  inStock: z.coerce.boolean().optional(),
});

// Fastify-compatible JSON schemas
export const createShoeSchema = {
  tags: ["Shoes"],
  body: zodToJsonSchema(createShoeZod),
  response: {
    201: zodToJsonSchema(shoeResponseZod),
  },
};

export const getShoesSchema = {
  tags: ["Shoes"],
  querystring: zodToJsonSchema(getShoesQueryZod),
  response: {
    200: zodToJsonSchema(z.array(shoeResponseZod)),
  },
};

export const getShoeSchema = {
  tags: ["Shoes"],
  params: zodToJsonSchema(z.object({ id: z.string().uuid() })),
  response: {
    200: zodToJsonSchema(shoeResponseZod),
  },
};

export const updateShoeSchema = {
  tags: ["Shoes"],
  params: zodToJsonSchema(z.object({ id: z.string().uuid() })),
  body: zodToJsonSchema(updateShoeZod),
  response: {
    200: zodToJsonSchema(shoeResponseZod),
  },
};

export const deleteShoeSchema = {
  tags: ["Shoes"],
  params: zodToJsonSchema(z.object({ id: z.string().uuid() })),
  response: {
    200: zodToJsonSchema(z.object({ message: z.string() })),
  },
};