import { create } from 'zustand';
import { ScheduledPost, GeneratedImage } from '@prisma/client';

type ScheduledPostWithImage = ScheduledPost & {
    image: GeneratedImage;
};

interface SchedulerStore {
    posts: ScheduledPostWithImage[];
    selectedPost: ScheduledPostWithImage | null;
    setPosts: (posts: ScheduledPostWithImage[]) => void;
    addPost: (post: ScheduledPostWithImage) => void;
    updatePost: (id: string, updates: Partial<ScheduledPost>) => void;
    removePost: (id: string) => void;
    selectPost: (post: ScheduledPostWithImage | null) => void;
    clearPosts: () => void;
}

export const useSchedulerStore = create<SchedulerStore>((set) => ({
    posts: [],
    selectedPost: null,
    setPosts: (posts) => set({ posts }),
    addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
    updatePost: (id, updates) =>
        set((state) => ({
            posts: state.posts.map((post) =>
                post.id === id ? { ...post, ...updates } : post
            ),
            selectedPost:
                state.selectedPost?.id === id
                    ? { ...state.selectedPost, ...updates }
                    : state.selectedPost,
        })),
    removePost: (id) =>
        set((state) => ({
            posts: state.posts.filter((post) => post.id !== id),
            selectedPost: state.selectedPost?.id === id ? null : state.selectedPost,
        })),
    selectPost: (post) => set({ selectedPost: post }),
    clearPosts: () => set({ posts: [], selectedPost: null }),
}));
