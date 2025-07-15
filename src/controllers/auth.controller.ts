import { FastifyRequest, FastifyReply } from 'fastify';
import { signupUser, loginUser } from '../services/auth.service';
import { AppError } from '../utils/AppError';

export async function signupHandler(
  req: FastifyRequest<{
    Body: { email: string; password: string; firstName: string; lastName: string };
  }>,
  res: FastifyReply
) {
  try {
    const result = await signupUser(req.body);
    res.status(201).send(result);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).send({ error: error.message });
    } else {
      res.status(500).send({ error: 'Internal server error' });
    }
  }
}

export async function loginHandler(
  req: FastifyRequest<{ Body: { email: string; password: string } }>,
  res: FastifyReply
) {
  try {
    const result = await loginUser(req.body);
    res.status(200).send(result);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).send({ error: error.message });
    } else {
      res.status(500).send({ error: 'Internal server error' });
    }
  }
}