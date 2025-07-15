import dotenv from 'dotenv';

// Load environment variables first
dotenv.config();

import Fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import helmet from "@fastify/helmet";
import root from "./routes/root";
import { authRoutes } from "./routes/auth.route";
import { shoeRoutes } from "./routes/shoe.route";

export async function createApp() {
  const app = Fastify({
    logger: true,
  });
  
  await app.register(fastifySwagger, {
      swagger: {
        info: {
          title: "Shoe Store API",
          description: "Complete ecommerce API for selling shoes with authentication and CRUD operations",
          version: "1.0.0",
        },
        securityDefinitions: {
          Bearer: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
            description: 'Enter: Bearer {token}',
          },
        },
      },
    });

  await app.register(fastifySwaggerUi, {
      routePrefix: "/docs",
      uiConfig: {
        docExpansion: "list",
        deepLinking: true,
      },
      staticCSP: false,
      transformSpecification: (swaggerObject, request, reply) => {
        return swaggerObject;
      },
      transformSpecificationClone: true,
    });
    
  await app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:"],
        frameAncestors: ["*"],
      },
    },
  });

  // Register routes
  app.register(root, { prefix: "/" });
  app.register(authRoutes);
  app.register(shoeRoutes);

  // Global error handler
  app.setErrorHandler((error, request, reply) => {
    app.log.error(error);
    
    if (error.validation) {
      return reply.status(400).send({
        error: "Validation failed",
        details: error.validation,
      });
    }
    
    reply.status(500).send({ error: "Internal Server Error" });
  });

  return app;
}