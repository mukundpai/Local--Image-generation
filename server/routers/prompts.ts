import { z } from 'zod';
import { router, protectedProcedure } from '../trpc/trpc';

export const promptsRouter = router({
    save: protectedProcedure
        .input(
            z.object({
                influencerId: z.string(),
                context: z.string().optional(),
                basePrompt: z.string(),
                logicGates: z.any().optional(),
                compiledPrompt: z.string(),
                isTemplate: z.boolean().default(false),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const prompt = await ctx.prisma.llmPrompt.create({
                data: {
                    influencerId: input.influencerId,
                    context: input.context,
                    basePrompt: input.basePrompt,
                    logicGates: input.logicGates,
                    compiledPrompt: input.compiledPrompt,
                    isTemplate: input.isTemplate,
                },
            });

            return prompt;
        }),

    list: protectedProcedure
        .input(
            z.object({
                influencerId: z.string(),
                isTemplate: z.boolean().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            const prompts = await ctx.prisma.llmPrompt.findMany({
                where: {
                    influencerId: input.influencerId,
                    ...(input.isTemplate !== undefined && { isTemplate: input.isTemplate }),
                },
                orderBy: [
                    { isTemplate: 'desc' },
                    { usageCount: 'desc' },
                    { createdAt: 'desc' },
                ],
            });

            return prompts;
        }),

    getById: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            const prompt = await ctx.prisma.llmPrompt.findUnique({
                where: { id: input.id },
            });

            if (!prompt) {
                throw new Error('Prompt not found');
            }

            return prompt;
        }),

    incrementUsage: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const prompt = await ctx.prisma.llmPrompt.update({
                where: { id: input.id },
                data: {
                    usageCount: { increment: 1 },
                },
            });

            return prompt;
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            await ctx.prisma.llmPrompt.delete({
                where: { id: input.id },
            });

            return { success: true };
        }),
});
