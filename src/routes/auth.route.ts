import { FastifyInstance } from 'fastify';
import { signupHandler, loginHandler } from '../controllers/auth.controller';
import { signupSchema, loginSchema } from '../schemas/auth.schema';

export async function authRoutes(app: FastifyInstance) {
  app.post('/api/auth/signup', {
    schema: signupSchema,
    handler: signupHandler,
  });

  app.post('/api/auth/login', {
    schema: loginSchema,
    handler: loginHandler,
  });
}