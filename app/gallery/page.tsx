'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { trpc } from '@/lib/trpc/client';

const INFLUENCER_ID = 'sara-influencer-001';

export default function GalleryPage() {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newBundleName, setNewBundleName] = useState('');

    // Fetch bundles
    const { data: bundles, isLoading: bundlesLoading, refetch: refetchBundles } = trpc.bundles.list.useQuery({
        influencerId: INFLUENCER_ID,
    });

    // Fetch recent images for display
    const { data: recentImages } = trpc.images.getHistory.useQuery({
        influencerId: INFLUENCER_ID,
        limit: 8,
    });

    // Create bundle mutation
    const createBundleMutation = trpc.bundles.create.useMutation({
        onSuccess: () => {
            refetchBundles();
            setShowCreateModal(false);
            setNewBundleName('');
        },
    });

    const handleCreateBundle = () => {
        if (!newBundleName) return;
        createBundleMutation.mutate({
            influencerId: INFLUENCER_ID,
            title: newBundleName,
            imageIds: [],
        });
    };
    return (
        <div className="bg-gallery-bg text-gallery-text font-sans min-h-screen flex flex-col selection:bg-white selection:text-black">

            {/* Header */}
            <header className="sticky top-0 z-40 bg-gallery-bg/90 backdrop-blur-md border-b border-white/5 px-8 py-6">
                <div className="flex justify-between items-center max-w-[1600px] mx-auto w-full">
                    <div className="flex items-center gap-12">
                        <h1 className="text-2xl font-serif italic font-light tracking-wide text-white">Archives.</h1>
                        <nav className="hidden md:flex items-center gap-8">
                            {['Curated Selections', 'Recent Bundles', 'Favorites'].map((item, i) => (
                                <a key={item} href="#" className={`text-[10px] uppercase tracking-widest hover:text-white transition-colors pb-1 border-b border-transparent hover:border-white ${i === 0 ? 'text-white border-white' : 'text-gallery-secondary'}`}>
                                    {item}
                                </a>
                            ))}
                        </nav>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-2 border-b border-gallery-secondary/30 pb-1">
                            <span className="material-symbols-outlined text-gallery-secondary text-lg">search</span>
                            <input className="bg-transparent border-none outline-none text-xs w-48 text-white placeholder:text-gallery-secondary" placeholder="Search collections..." />
                        </div>
                        <div className="size-8 rounded-full bg-white text-black flex items-center justify-center font-serif italic border border-white/20">A</div>
                    </div>
                </div>
            </header>

            {/* Filters (Horizontal Bar) */}
            <div className="border-b border-white/5 py-4 px-8 overflow-x-auto">
                <div className="max-w-[1600px] mx-auto w-full flex items-center gap-4 min-w-max">
                    <span className="text-[10px] uppercase tracking-widest text-gallery-secondary mr-4 border-r border-white/10 pr-4 h-4 flex items-center">Filter By</span>
                    {['Editorial', 'Street Style', 'Cyberpunk', 'Minimalism', 'Portraiture', 'Nature'].map(tag => (
                        <button key={tag} className="px-3 py-1 rounded-full border border-white/5 bg-white/5 hover:bg-white hover:text-black text-[10px] uppercase tracking-widest transition-all text-gallery-secondary">
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            <main className="flex-1 p-8">
                <div className="max-w-[1600px] mx-auto w-full">

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {recentImages?.images && recentImages.images.length > 0 ? (
                            recentImages.images.map((image: any, i: number) => (
                                <div key={image.id} className="group relative aspect-[4/5] overflow-hidden bg-gallery-card cursor-pointer">
                                    <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${image.imageUrl}')` }}></div>
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                                    <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-100 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/80 via-transparent to-transparent">
                                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <h3 className="text-white text-xl font-serif italic mb-1">{image.prompt.slice(0, 25)}...</h3>
                                            <div className="flex items-center justify-between">
                                                <span className="text-gallery-secondary text-[10px] uppercase tracking-widest">{image.status}</span>
                                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                                    <button className="size-8 flex items-center justify-center rounded-full bg-white text-black hover:bg-gray-200"><span className="material-symbols-outlined text-sm">arrow_outward</span></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20">
                                <p className="text-gallery-secondary text-sm">No images yet</p>
                                <p className="text-gallery-secondary/50 text-xs mt-2">Generate images in the AI Studio</p>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-center mt-20">
                        <Button variant="gallery" className="bg-transparent border border-white/20 text-white hover:bg-white hover:text-black hover:border-white h-12 px-8">Load More Archives</Button>
                    </div>
                </div>
            </main>

            <footer className="border-t border-white/5 py-12 px-8 mt-auto bg-gallery-bg">
                <div className="max-w-[1600px] mx-auto flex justify-between items-center text-gallery-secondary">
                    <span className="text-[10px] uppercase tracking-widest">© 2024 Fooocus Studio</span>
                    <div className="flex gap-6">
                        {['Terms', 'Privacy', 'Help'].map(item => <a key={item} href="#" className="text-[10px] uppercase tracking-widest hover:text-white transition-colors">{item}</a>)}
                    </div>
                </div>
            </footer>
        </div>
    );
}
