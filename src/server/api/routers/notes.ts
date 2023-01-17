import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const notesRouter = createTRPCRouter({
  //   hello: publicProcedure
  //     .input(z.object({ text: z.string() }))
  //     .query(({ input }) => {
  //       return {
  //         greeting: `Hello ${input.text}`,
  //       };
  //     }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.userNote.findMany({
        select: {
          id: true,
          noteContents: true,
          completed: true,
          author: true,
        },
        where: {
          authorId: ctx.session.user.id,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    } catch (error) {
      console.log("Error getting all notes:", error);
    }
  }),

  post: protectedProcedure
    .input(
      z.object({
        newNote: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { newNote } = input;

      try {
        return await prisma.userNote.create({
          data: {
            noteContents: newNote,
            authorId: session.user.id,
          },
        });
      } catch (error) {
        console.log("Error posting new note:", error);
      }
    }),

  remove: protectedProcedure
    .input(
      z.object({
        noteId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { noteId } = input;

      try {
        return await prisma.userNote.delete({
          where: {
            id: noteId,
          },
        });
      } catch (error) {
        console.log("Error deleting note(s):", error);
      }
    }),

  toggleComplete: protectedProcedure
    .input(
      z.object({
        noteId: z.string(),
        isComplete: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { noteId, isComplete } = input;

      try {
        return await prisma.userNote.update({
          select: {
            id: true,
            noteContents: true,
            author: true,
            completed: true,
          },
          data: {
            completed: !isComplete,
          },
          where: {
            id: noteId,
          },
        });
      } catch (error) {
        console.log("Error updating note:", error);
      }
    }),
});
