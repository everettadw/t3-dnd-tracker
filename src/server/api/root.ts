import { exampleRouter } from "./routers/example";
import { notesRouter } from "./routers/notes";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  notes: notesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
