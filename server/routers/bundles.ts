import { z } from 'zod';
import { router, protectedProcedure } from '../trpc/trpc';

export const bundlesRouter = router({
    create: protectedProcedure
        .input(
            z.object({
                influencerId: z.string(),
                title: z.string(),
                description: z.string().optional(),
                tags: z.array(z.string()).default([]),
                imageIds: z.array(z.string()).optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const bundle = await ctx.prisma.postBundle.create({
                data: {
                    influencerId: input.influencerId,
                    title: input.title,
                    description: input.description,
                    tags: input.tags,
                },
            });

            // Add images if provided
            if (input.imageIds && input.imageIds.length > 0) {
                await ctx.prisma.bundleImage.createMany({
                    data: input.imageIds.map((imageId, index) => ({
                        bundleId: bundle.id,
                        imageId,
                        order: index,
                    })),
                });
            }

            return bundle;
        }),

    list: protectedProcedure
        .input(
            z.object({
                influencerId: z.string(),
                tags: z.array(z.string()).optional(),
                limit: z.number().default(20),
                cursor: z.string().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            const bundles = await ctx.prisma.postBundle.findMany({
                where: {
                    influencerId: input.influencerId,
                    ...(input.tags && input.tags.length > 0 && {
                        tags: { hasSome: input.tags },
                    }),
                },
                take: input.limit + 1,
                cursor: input.cursor ? { id: input.cursor } : undefined,
                orderBy: { createdAt: 'desc' },
                include: {
                    bundleImages: {
                        include: {
                            image: true,
                        },
                        orderBy: { order: 'asc' },
                    },
                },
            });

            let nextCursor: string | undefined = undefined;
            if (bundles.length > input.limit) {
                const nextItem = bundles.pop();
                nextCursor = nextItem!.id;
            }

            return { bundles, nextCursor };
        }),

    getById: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            const bundle = await ctx.prisma.postBundle.findUnique({
                where: { id: input.id },
                include: {
                    bundleImages: {
                        include: {
                            image: true,
                        },
                        orderBy: { order: 'asc' },
                    },
                },
            });

            if (!bundle) {
                throw new Error('Bundle not found');
            }

            return bundle;
        }),

    update: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                title: z.string().optional(),
                description: z.string().optional(),
                tags: z.array(z.string()).optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { id, ...data } = input;

            const bundle = await ctx.prisma.postBundle.update({
                where: { id },
                data,
            });

            return bundle;
        }),

    addImages: protectedProcedure
        .input(
            z.object({
                bundleId: z.string(),
                imageIds: z.array(z.string()),
            })
        )
        .mutation(async ({ ctx, input }) => {
            // Get current max order
            const maxOrder = await ctx.prisma.bundleImage.findFirst({
                where: { bundleId: input.bundleId },
                orderBy: { order: 'desc' },
                select: { order: true },
            });

            const startOrder = (maxOrder?.order ?? -1) + 1;

            await ctx.prisma.bundleImage.createMany({
                data: input.imageIds.map((imageId, index) => ({
                    bundleId: input.bundleId,
                    imageId,
                    order: startOrder + index,
                })),
                skipDuplicates: true,
            });

            return { success: true };
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            await ctx.prisma.postBundle.delete({
                where: { id: input.id },
            });

            return { success: true };
        }),
});
