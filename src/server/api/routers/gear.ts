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
      return ctx.db.gear.groupBy({
        by: ["brand", "model"],
        where: {
          rentable: true,
          ...(input.category
            ? {
                categories: {
                  some: {
                    category: {
                      name: input.category,
                    },
                  },
                },
              }
            : {}),
        },
        // TODO: Use state to change sorting method
        // TODO: Paginate/limit results
        orderBy: {
          model: input.orderType,
        },
        _count: true,
      });
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
