import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const gearRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getFiltered: protectedProcedure
    .input(
      z.object({
        orderType: z.enum(["asc", "desc"]),
        category: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.gearModel.findMany({
        include: {
          _count: {
            select: { instances: true },
          },
          categories: {
            select: {
              category: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
        ...(input.category
          ? {
              where: {
                categories: {
                  some: {
                    category: {
                      name: input.category,
                    },
                  },
                },
              },
            }
          : {}),
        // TODO: Use state to change sorting method
        // TODO: Paginate/limit results
        orderBy: {
          _relevance: {
            fields: ["brand"],
            search: "REI",
            sort: input.orderType,
          },
        },
      });
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
