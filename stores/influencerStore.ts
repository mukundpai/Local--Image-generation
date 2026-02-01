import { create } from 'zustand';
import { InfluencerProfile } from '@prisma/client';

interface InfluencerStore {
    profile: InfluencerProfile | null;
    setProfile: (profile: InfluencerProfile) => void;
    updateProfile: (updates: Partial<InfluencerProfile>) => void;
    clearProfile: () => void;
}

export const useInfluencerStore = create<InfluencerStore>((set) => ({
    profile: null,
    setProfile: (profile) => set({ profile }),
    updateProfile: (updates) =>
        set((state) => ({
            profile: state.profile ? { ...state.profile, ...updates } : null,
        })),
    clearProfile: () => set({ profile: null }),
}));
