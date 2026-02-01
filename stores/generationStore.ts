import { create } from 'zustand';

interface GenerationState {
    isGenerating: boolean;
    progress: number;
    status: string;
    currentImageId: string | null;
}

interface GenerationStore extends GenerationState {
    setGenerating: (isGenerating: boolean) => void;
    setProgress: (progress: number, status: string) => void;
    setCurrentImageId: (id: string | null) => void;
    reset: () => void;
}

export const useGenerationStore = create<GenerationStore>((set) => ({
    isGenerating: false,
    progress: 0,
    status: 'Ready',
    currentImageId: null,
    setGenerating: (isGenerating) => set({ isGenerating }),
    setProgress: (progress, status) => set({ progress, status }),
    setCurrentImageId: (currentImageId) => set({ currentImageId }),
    reset: () =>
        set({
            isGenerating: false,
            progress: 0,
            status: 'Ready',
            currentImageId: null,
        }),
}));
