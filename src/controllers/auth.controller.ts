import { FastifyRequest, FastifyReply } from 'fastify';
import { signupUser, loginUser } from '../services/auth.service';
import { AppError } from '../utils/AppError';

export async function signupHandler(
  req: FastifyRequest<{
    Body: { email: string; password: string; firstName: string; lastName: string };
  }>,
  res: FastifyReply
) {
  console.log('Signup request received:', { 
    email: req.body.email, 
    firstName: req.body.firstName, 
    lastName: req.body.lastName 
  });
  
  try {
    const result = await signupUser(req.body);
    console.log('Signup successful for user:', result.user.email);
    res.status(201).send(result);
  } catch (error) {
    console.error('Signup handler error:', error);
    
    if (error instanceof AppError) {
      res.status(error.statusCode).send({ error: error.message });
    } else {
      res.status(500).send({ 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
}

export async function loginHandler(
  req: FastifyRequest<{ Body: { email: string; password: string } }>,
  res: FastifyReply
) {
  console.log('Login request received for email:', req.body.email);
  
  try {
    const result = await loginUser(req.body);
    console.log('Login successful for user:', result.user.email);
    res.status(200).send(result);
  } catch (error) {
    console.error('Login handler error:', error);
    
    if (error instanceof AppError) {
      res.status(error.statusCode).send({ error: error.message });
    } else {
      res.status(500).send({ 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
}