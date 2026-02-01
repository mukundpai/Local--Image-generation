import { z } from 'zod';
import { router, protectedProcedure } from '../trpc/trpc';
import { generateImage } from '@/lib/api';

export const imagesRouter = router({
    generate: protectedProcedure
        .input(
            z.object({
                influencerId: z.string(),
                prompt: z.string(),
                negativePrompt: z.string().optional(),
                seed: z.number().optional(),
                aspectRatio: z.string().default('1024×1024'),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const seed = input.seed || Math.floor(Math.random() * 999999999);

            // Create pending record
            const image = await ctx.prisma.generatedImage.create({
                data: {
                    influencerId: input.influencerId,
                    prompt: input.prompt,
                    negativePrompt: input.negativePrompt || '',
                    seed: BigInt(seed),
                    aspectRatio: input.aspectRatio,
                    status: 'GENERATING',
                    imageUrl: '',
                    width: 1024,
                    height: 1024,
                },
            });

            // Generate image in background
            try {
                const startTime = Date.now();
                const localUrl = await generateImage({
                    prompt: input.prompt,
                    negativePrompt: input.negativePrompt,
                    seed,
                    aspectRatio: input.aspectRatio,
                });

                if (!localUrl) {
                    throw new Error('Generation failed - no image URL returned');
                }

                // Update with completed status
                await ctx.prisma.generatedImage.update({
                    where: { id: image.id },
                    data: {
                        imageUrl: localUrl,
                        status: 'COMPLETED',
                        generationTimeMs: Date.now() - startTime,
                    },
                });

                return {
                    success: true,
                    imageId: image.id,
                    imageUrl: localUrl,
                    generationTime: Date.now() - startTime
                };
            } catch (error) {
                // Update with failed status
                await ctx.prisma.generatedImage.update({
                    where: { id: image.id },
                    data: {
                        status: 'FAILED',
                        errorMessage: error instanceof Error ? error.message : 'Unknown error',
                    },
                });

                throw new Error(
                    `Image generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
                );
            }
        }),

    getHistory: protectedProcedure
        .input(
            z.object({
                influencerId: z.string(),
                limit: z.number().default(20),
                cursor: z.string().optional(),
                status: z.enum(['PENDING', 'GENERATING', 'COMPLETED', 'FAILED']).optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            const images = await ctx.prisma.generatedImage.findMany({
                where: {
                    influencerId: input.influencerId,
                    ...(input.status && { status: input.status }),
                },
                take: input.limit + 1,
                cursor: input.cursor ? { id: input.cursor } : undefined,
                orderBy: { createdAt: 'desc' },
            });

            let nextCursor: string | undefined = undefined;
            if (images.length > input.limit) {
                const nextItem = images.pop();
                nextCursor = nextItem!.id;
            }

            return { images, nextCursor };
        }),

    getById: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            const image = await ctx.prisma.generatedImage.findUnique({
                where: { id: input.id },
            });

            if (!image) {
                throw new Error('Image not found');
            }

            return image;
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            await ctx.prisma.generatedImage.delete({
                where: { id: input.id },
            });

            return { success: true };
        }),
});
