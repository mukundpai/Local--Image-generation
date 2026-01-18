'use client';

import { useState } from 'react';

export default function GalleryView() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all');

    const images: string[] = [];

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-2xl font-semibold text-[#fafafa] tracking-tight mb-1">
                        Gallery
                    </h1>
                    <p className="text-sm text-[#71717a]">
                        Your created images
                    </p>
                </div>

                <div className="flex gap-3">
                    <div className="relative">
                        <svg
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#52525b]"
                            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                        </svg>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search..."
                            className="input-field pl-10 w-48 text-sm"
                        />
                    </div>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="input-field text-sm"
                    >
                        <option value="all">All</option>
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                    </select>
                </div>
            </div>

            {/* Gallery Grid */}
            {images.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24">
                    <div className="w-20 h-20 rounded-2xl bg-[#18181b] border border-[#27272a] flex items-center justify-center mb-5">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3f3f46" strokeWidth="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" fill="#3f3f46" />
                            <path d="M21 15l-5-5L5 21" strokeLinecap="round" />
                        </svg>
                    </div>
                    <p className="text-[#52525b] text-sm mb-1">No images yet</p>
                    <p className="text-[#3f3f46] text-xs">Your creations will appear here</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {/* Gallery items would be mapped here */}
                </div>
            )}
        </div>
    );
}
