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
        page: z.number(),
        category: z.string().optional(),
        searchTerms: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const showPerPage = 10;
      const skipAmount = showPerPage * input.page;
      return ctx.db.gearModel.findMany({
        skip: skipAmount,
        take: showPerPage,
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
        // TODO: Paginate/limit results
        // See: https://www.prisma.io/docs/orm/prisma-client/queries/full-text-search#postgresql
        orderBy: {
          _relevance: {
            fields: ["brand", "model"],
            search: input.searchTerms,
            sort: input.orderType,
          },
        },
      });
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
