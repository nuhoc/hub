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
        startDate: z.string(),
        endDate: z.string(),
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
            select: {
              instances: {
                where: {
                  rentable: true,
                  gearRental: {
                    every: {
                      rental: {
                        NOT: {
                          rentStart: {
                            lte: new Date(input.endDate),
                          },
                          rentDue: {
                            gte: new Date(input.startDate),
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
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
        where: {
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

  checkoutGear: protectedProcedure
    .input(
      z.object({
        gearIds: z.array(z.number()),
        startDate: z.string(),
        endDate: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Check that they have an active membership, if not throw error
      await ctx.db.membership.findFirstOrThrow({
        where: {
          userId: ctx.session.user.id,
          expiresAt: {
            gte: new Date(Date.now()),
          },
        },
      });

      // Get first items of each model and check they are still rentable
      const instanceIds = await Promise.all(
        input.gearIds.map(async (gearId) => {
          const result = await ctx.db.gearInstance.findFirstOrThrow({
            select: {
              id: true,
            },
            where: {
              gearModelId: gearId,
              rentable: true,
              // Make sure the gear instance is not in an active rental
              gearRental: {
                every: {
                  rental: {
                    NOT: {
                      rentStart: {
                        lte: new Date(input.endDate),
                      },
                      rentDue: {
                        gte: new Date(input.startDate),
                      },
                    },
                  },
                },
              },
            },
          });

          return { gearId: result.id };
        }),
      );

      // Create the rental and connect items and people
      return ctx.db.rental.create({
        data: {
          gearRented: {
            createMany: {
              data: instanceIds,
            },
          },
          rentStart: new Date(input.startDate),
          rentDue: new Date(input.endDate),
          renter: { connect: { id: ctx.session.user.id } },
          // TODO: Make this someone else besides the renter
          authorizer: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
