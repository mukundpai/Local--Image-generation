import { z } from 'zod';
import { router, protectedProcedure } from '../trpc/trpc';

export const analyticsRouter = router({
    getDashboard: protectedProcedure
        .input(z.object({ influencerId: z.string() }))
        .query(async ({ ctx, input }) => {
            // Get latest snapshot
            const latestSnapshot = await ctx.prisma.analyticsSnapshot.findFirst({
                where: { influencerId: input.influencerId, postId: null },
                orderBy: { snapshotDate: 'desc' },
            });

            // Get total posts
            const totalPosts = await ctx.prisma.scheduledPost.count({
                where: {
                    influencerId: input.influencerId,
                    status: 'PUBLISHED',
                },
            });

            // Get posts this month
            const startOfMonth = new Date();
            startOfMonth.setDate(1);
            startOfMonth.setHours(0, 0, 0, 0);

            const postsThisMonth = await ctx.prisma.scheduledPost.count({
                where: {
                    influencerId: input.influencerId,
                    status: 'PUBLISHED',
                    publishedAt: { gte: startOfMonth },
                },
            });

            // Get scheduled posts count
            const scheduledCount = await ctx.prisma.scheduledPost.count({
                where: {
                    influencerId: input.influencerId,
                    status: 'SCHEDULED',
                },
            });

            return {
                followers: latestSnapshot?.followersCount || 0,
                following: latestSnapshot?.followingCount || 0,
                totalPosts,
                postsThisMonth,
                scheduledPosts: scheduledCount,
                engagementRate: latestSnapshot?.engagementRate || 0,
                reach: latestSnapshot?.reach || 0,
                impressions: latestSnapshot?.impressions || 0,
            };
        }),

    getTimeSeries: protectedProcedure
        .input(
            z.object({
                influencerId: z.string(),
                startDate: z.date(),
                endDate: z.date(),
            })
        )
        .query(async ({ ctx, input }) => {
            const snapshots = await ctx.prisma.analyticsSnapshot.findMany({
                where: {
                    influencerId: input.influencerId,
                    postId: null,
                    snapshotDate: {
                        gte: input.startDate,
                        lte: input.endDate,
                    },
                },
                orderBy: { snapshotDate: 'asc' },
            });

            return snapshots;
        }),

    getPostPerformance: protectedProcedure
        .input(z.object({ postId: z.string() }))
        .query(async ({ ctx, input }) => {
            const analytics = await ctx.prisma.analyticsSnapshot.findMany({
                where: { postId: input.postId },
                orderBy: { snapshotDate: 'asc' },
            });

            return analytics;
        }),

    createSnapshot: protectedProcedure
        .input(
            z.object({
                influencerId: z.string(),
                postId: z.string().optional(),
                followersCount: z.number().optional(),
                followingCount: z.number().optional(),
                postsCount: z.number().optional(),
                engagementRate: z.number().optional(),
                likesTotal: z.number().optional(),
                commentsTotal: z.number().optional(),
                sharesTotal: z.number().optional(),
                reach: z.number().optional(),
                impressions: z.number().optional(),
                metadata: z.any().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const snapshot = await ctx.prisma.analyticsSnapshot.create({
                data: {
                    influencerId: input.influencerId,
                    postId: input.postId,
                    followersCount: input.followersCount,
                    followingCount: input.followingCount,
                    postsCount: input.postsCount,
                    engagementRate: input.engagementRate,
                    likesTotal: input.likesTotal,
                    commentsTotal: input.commentsTotal,
                    sharesTotal: input.sharesTotal,
                    reach: input.reach,
                    impressions: input.impressions,
                    metadata: input.metadata,
                },
            });

            return snapshot;
        }),
});
