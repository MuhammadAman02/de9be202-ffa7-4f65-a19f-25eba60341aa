import { FastifyPluginAsync } from "fastify";
import { db } from "../db/client";

const root: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get("/", async function (request, reply) {
    return { message: "Welcome to the Shoe Store API!" };
  });

  fastify.get("/health", async function (request, reply) {
    try {
      // Test database connection
      await db.execute('SELECT 1');
      return { 
        status: "OK", 
        message: "Shoe Store API is running",
        database: "connected",
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      reply.status(500);
      return { 
        status: "ERROR", 
        message: "Database connection failed",
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  });
};

export default root;