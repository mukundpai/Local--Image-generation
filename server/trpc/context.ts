import { prisma } from '@/lib/prisma';

export async function createContext() {
    return {
        prisma,
        // Session will be added later with NextAuth
        session: null,
        userId: null,
    };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
