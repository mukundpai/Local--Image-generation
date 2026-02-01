'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { trpc } from '@/lib/trpc/client';

interface Influencer {
    id: string;
    name: string;
    username: string;
    avatarUrl?: string | null;
    bio?: string | null;
}

interface InfluencerContextType {
    currentInfluencer: Influencer | null;
    influencers: Influencer[];
    isLoading: boolean;
    selectInfluencer: (id: string) => void;
}

const InfluencerContext = createContext<InfluencerContextType>({
    currentInfluencer: null,
    influencers: [],
    isLoading: true,
    selectInfluencer: () => { },
});

export function useInfluencer() {
    return useContext(InfluencerContext);
}

interface InfluencerProviderProps {
    children: ReactNode;
}

export function InfluencerProvider({ children }: InfluencerProviderProps) {
    const [currentInfluencerId, setCurrentInfluencerId] = useState<string>('sara-influencer-001');
    const [influencers, setInfluencers] = useState<Influencer[]>([
        // Default Sara profile
        {
            id: 'sara-influencer-001',
            name: 'Sara',
            username: 'sara_ai',
            avatarUrl: null,
            bio: 'AI-generated lifestyle influencer',
        },
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const currentInfluencer = influencers.find((i) => i.id === currentInfluencerId) || null;

    const selectInfluencer = (id: string) => {
        setCurrentInfluencerId(id);
        localStorage.setItem('currentInfluencerId', id);
    };

    // Load from localStorage on mount
    useEffect(() => {
        const savedId = localStorage.getItem('currentInfluencerId');
        if (savedId) {
            setCurrentInfluencerId(savedId);
        }
    }, []);

    return (
        <InfluencerContext.Provider value={{ currentInfluencer, influencers, isLoading, selectInfluencer }}>
            {children}
        </InfluencerContext.Provider>
    );
}

// Dropdown component for selecting influencer
interface InfluencerSelectorProps {
    className?: string;
}

export function InfluencerSelector({ className = '' }: InfluencerSelectorProps) {
    const { currentInfluencer, influencers, selectInfluencer } = useInfluencer();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`relative ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
            >
                <div className="size-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                    {currentInfluencer?.name?.charAt(0) || 'S'}
                </div>
                <div className="text-left">
                    <p className="text-sm font-medium text-white">{currentInfluencer?.name || 'Select Profile'}</p>
                    <p className="text-xs text-white/60">@{currentInfluencer?.username || 'unknown'}</p>
                </div>
                <span className="material-symbols-outlined text-white/60 text-sm ml-2">
                    {isOpen ? 'expand_less' : 'expand_more'}
                </span>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-zinc-900 border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden">
                    <div className="p-2">
                        <p className="text-xs text-white/40 uppercase tracking-wider px-2 py-1">
                            Switch Profile
                        </p>
                    </div>
                    <div className="border-t border-white/10">
                        {influencers.map((influencer) => (
                            <button
                                key={influencer.id}
                                onClick={() => {
                                    selectInfluencer(influencer.id);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors ${currentInfluencer?.id === influencer.id ? 'bg-white/10' : ''
                                    }`}
                            >
                                <div className="size-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                                    {influencer.name.charAt(0)}
                                </div>
                                <div className="text-left flex-1">
                                    <p className="text-sm font-medium text-white">{influencer.name}</p>
                                    <p className="text-xs text-white/60">@{influencer.username}</p>
                                </div>
                                {currentInfluencer?.id === influencer.id && (
                                    <span className="material-symbols-outlined text-green-400 text-sm">check</span>
                                )}
                            </button>
                        ))}
                    </div>
                    <div className="border-t border-white/10 p-2">
                        <button className="w-full flex items-center gap-2 px-4 py-2 text-white/60 hover:text-white hover:bg-white/5 rounded transition-colors text-sm">
                            <span className="material-symbols-outlined text-sm">add</span>
                            Create New Profile
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default InfluencerSelector;
