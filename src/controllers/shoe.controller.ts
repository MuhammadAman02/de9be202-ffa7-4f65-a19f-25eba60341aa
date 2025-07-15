import { FastifyRequest, FastifyReply } from 'fastify';
import {
  createShoe,
  getShoes,
  getShoeById,
  updateShoe,
  deleteShoe,
} from '../services/shoe.service';
import { AppError } from '../utils/AppError';

export async function createShoeHandler(
  req: FastifyRequest<{
    Body: {
      name: string;
      brand: string;
      description?: string;
      price: number;
      size: string;
      color: string;
      category: string;
      inStock?: boolean;
      imageUrl?: string;
    };
  }>,
  res: FastifyReply
) {
  try {
    const shoe = await createShoe(req.body);
    res.status(201).send(shoe);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).send({ error: error.message });
    } else {
      res.status(500).send({ error: 'Internal server error' });
    }
  }
}

export async function getShoesHandler(
  req: FastifyRequest<{
    Querystring: {
      page: number;
      limit: number;
      brand?: string;
      category?: string;
      inStock?: boolean;
    };
  }>,
  res: FastifyReply
) {
  try {
    const shoes = await getShoes(req.query);
    res.status(200).send(shoes);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).send({ error: error.message });
    } else {
      res.status(500).send({ error: 'Internal server error' });
    }
  }
}

export async function getShoeHandler(
  req: FastifyRequest<{ Params: { id: string } }>,
  res: FastifyReply
) {
  try {
    const shoe = await getShoeById(req.params.id);
    res.status(200).send(shoe);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).send({ error: error.message });
    } else {
      res.status(500).send({ error: 'Internal server error' });
    }
  }
}

export async function updateShoeHandler(
  req: FastifyRequest<{
    Params: { id: string };
    Body: {
      name?: string;
      brand?: string;
      description?: string;
      price?: number;
      size?: string;
      color?: string;
      category?: string;
      inStock?: boolean;
      imageUrl?: string;
    };
  }>,
  res: FastifyReply
) {
  try {
    const shoe = await updateShoe(req.params.id, req.body);
    res.status(200).send(shoe);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).send({ error: error.message });
    } else {
      res.status(500).send({ error: 'Internal server error' });
    }
  }
}

export async function deleteShoeHandler(
  req: FastifyRequest<{ Params: { id: string } }>,
  res: FastifyReply
) {
  try {
    const result = await deleteShoe(req.params.id);
    res.status(200).send(result);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).send({ error: error.message });
    } else {
      res.status(500).send({ error: 'Internal server error' });
    }
  }
}