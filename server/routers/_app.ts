import { router } from '../trpc/trpc';
import { imagesRouter } from './images';
import { bundlesRouter } from './bundles';
import { postsRouter } from './posts';
import { promptsRouter } from './prompts';
import { analyticsRouter } from './analytics';

export const appRouter = router({
    images: imagesRouter,
    bundles: bundlesRouter,
    posts: postsRouter,
    prompts: promptsRouter,
    analytics: analyticsRouter,
});

export type AppRouter = typeof appRouter;
