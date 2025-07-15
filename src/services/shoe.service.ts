import { db } from '../db/client';
import { shoes } from '../db/schema';
import { eq, and, ilike } from 'drizzle-orm';
import { AppError } from '../utils/AppError';

export async function createShoe(shoeData: {
  name: string;
  brand: string;
  description?: string;
  price: number;
  size: string;
  color: string;
  category: string;
  inStock?: boolean;
  imageUrl?: string;
}) {
  const result = await db
    .insert(shoes)
    .values({
      ...shoeData,
      price: shoeData.price.toString(),
    })
    .returning({
      id: shoes.id,
      name: shoes.name,
      brand: shoes.brand,
      description: shoes.description,
      price: shoes.price,
      size: shoes.size,
      color: shoes.color,
      category: shoes.category,
      inStock: shoes.inStock,
      imageUrl: shoes.imageUrl,
      createdAt: shoes.createdAt,
      updatedAt: shoes.updatedAt,
    });

  return result[0];
}

export async function getShoes({
  page,
  limit,
  brand,
  category,
  inStock,
}: {
  page: number;
  limit: number;
  brand?: string;
  category?: string;
  inStock?: boolean;
}) {
  const offset = (page - 1) * limit;
  
  let query = db.select({
    id: shoes.id,
    name: shoes.name,
    brand: shoes.brand,
    description: shoes.description,
    price: shoes.price,
    size: shoes.size,
    color: shoes.color,
    category: shoes.category,
    inStock: shoes.inStock,
    imageUrl: shoes.imageUrl,
    createdAt: shoes.createdAt,
    updatedAt: shoes.updatedAt,
  }).from(shoes);

  const conditions = [];
  if (brand) conditions.push(ilike(shoes.brand, `%${brand}%`));
  if (category) conditions.push(ilike(shoes.category, `%${category}%`));
  if (inStock !== undefined) conditions.push(eq(shoes.inStock, inStock));

  if (conditions.length > 0) {
    query = query.where(and(...conditions));
  }

  return query.limit(limit).offset(offset);
}

export async function getShoeById(id: string) {
  const result = await db
    .select({
      id: shoes.id,
      name: shoes.name,
      brand: shoes.brand,
      description: shoes.description,
      price: shoes.price,
      size: shoes.size,
      color: shoes.color,
      category: shoes.category,
      inStock: shoes.inStock,
      imageUrl: shoes.imageUrl,
      createdAt: shoes.createdAt,
      updatedAt: shoes.updatedAt,
    })
    .from(shoes)
    .where(eq(shoes.id, id));

  if (result.length === 0) {
    throw new AppError('Shoe not found', 404);
  }

  return result[0];
}

export async function updateShoe(id: string, updateData: {
  name?: string;
  brand?: string;
  description?: string;
  price?: number;
  size?: string;
  color?: string;
  category?: string;
  inStock?: boolean;
  imageUrl?: string;
}) {
  const updateValues = { ...updateData };
  if (updateData.price !== undefined) {
    (updateValues as any).price = updateData.price.toString();
  }

  const result = await db
    .update(shoes)
    .set({ ...updateValues, updatedAt: new Date() })
    .where(eq(shoes.id, id))
    .returning({
      id: shoes.id,
      name: shoes.name,
      brand: shoes.brand,
      description: shoes.description,
      price: shoes.price,
      size: shoes.size,
      color: shoes.color,
      category: shoes.category,
      inStock: shoes.inStock,
      imageUrl: shoes.imageUrl,
      createdAt: shoes.createdAt,
      updatedAt: shoes.updatedAt,
    });

  if (result.length === 0) {
    throw new AppError('Shoe not found', 404);
  }

  return result[0];
}

export async function deleteShoe(id: string) {
  const result = await db
    .delete(shoes)
    .where(eq(shoes.id, id))
    .returning({ id: shoes.id });

  if (result.length === 0) {
    throw new AppError('Shoe not found', 404);
  }

  return { message: 'Shoe deleted successfully' };
}