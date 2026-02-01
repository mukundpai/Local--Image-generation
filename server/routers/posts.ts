import { z } from 'zod';
import { router, protectedProcedure } from '../trpc/trpc';

export const postsRouter = router({
    schedule: protectedProcedure
        .input(
            z.object({
                influencerId: z.string(),
                imageId: z.string(),
                caption: z.string(),
                hashtags: z.array(z.string()).default([]),
                scheduledTime: z.date(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const post = await ctx.prisma.scheduledPost.create({
                data: {
                    influencerId: input.influencerId,
                    imageId: input.imageId,
                    caption: input.caption,
                    hashtags: input.hashtags,
                    scheduledTime: input.scheduledTime,
                    status: 'SCHEDULED',
                },
                include: {
                    image: true,
                },
            });

            return post;
        }),

    list: protectedProcedure
        .input(
            z.object({
                influencerId: z.string(),
                status: z.enum(['DRAFT', 'SCHEDULED', 'PUBLISHED', 'FAILED']).optional(),
                startDate: z.date().optional(),
                endDate: z.date().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            const posts = await ctx.prisma.scheduledPost.findMany({
                where: {
                    influencerId: input.influencerId,
                    ...(input.status && { status: input.status }),
                    ...(input.startDate && {
                        scheduledTime: { gte: input.startDate },
                    }),
                    ...(input.endDate && {
                        scheduledTime: { lte: input.endDate },
                    }),
                },
                orderBy: { scheduledTime: 'asc' },
                include: {
                    image: true,
                },
            });

            return posts;
        }),

    getById: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            const post = await ctx.prisma.scheduledPost.findUnique({
                where: { id: input.id },
                include: {
                    image: true,
                    analytics: true,
                },
            });

            if (!post) {
                throw new Error('Post not found');
            }

            return post;
        }),

    update: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                caption: z.string().optional(),
                hashtags: z.array(z.string()).optional(),
                scheduledTime: z.date().optional(),
                status: z.enum(['DRAFT', 'SCHEDULED', 'PUBLISHED', 'FAILED']).optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { id, ...data } = input;

            const post = await ctx.prisma.scheduledPost.update({
                where: { id },
                data,
            });

            return post;
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            await ctx.prisma.scheduledPost.delete({
                where: { id: input.id },
            });

            return { success: true };
        }),

    // Publish immediately
    publishNow: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            // TODO: Implement Instagram API publishing
            // For now, just update status
            const post = await ctx.prisma.scheduledPost.update({
                where: { id: input.id },
                data: {
                    status: 'PUBLISHED',
                    publishedAt: new Date(),
                },
            });

            return post;
        }),
});
