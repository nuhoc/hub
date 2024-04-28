import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const rentalRouter = createTRPCRouter({
  getRentalHistory: protectedProcedure
    .input(
      z.object({
        orderType: z.enum(["asc", "desc"]),
        page: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.rental.findMany({
        where: {
          renterId: ctx.session.user.id,
        },
        include: {
          gearRented: {
            include: {
              gear: {
                include: {
                  gearModel: {
                    select: {
                      brand: true,
                      model: true,
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: {
          rentStart: input.orderType,
        },
      });
    }),

  // TODO: Add cancel reservation endpoint
});
