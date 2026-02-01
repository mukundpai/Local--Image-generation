import { initTRPC, TRPCError } from '@trpc/server';
import { Context } from './context';
import superjson from 'superjson';

const t = initTRPC.context<Context>().create({
    transformer: superjson,
    errorFormatter({ shape }) {
        return shape;
    },
});

export const router = t.router;
export const publicProcedure = t.procedure;

// Protected procedure - will be enhanced with auth later
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
    // For now, allow all requests
    // TODO: Add authentication check when NextAuth is configured
    return next({
        ctx: {
            ...ctx,
        },
    });
});
