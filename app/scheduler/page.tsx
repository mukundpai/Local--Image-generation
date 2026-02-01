'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { trpc } from '@/lib/trpc/client';
import { CreatePostModal } from '@/components/CreatePostModal';

const INFLUENCER_ID = 'sara-influencer-001';

export default function SchedulerPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedPost, setSelectedPost] = useState<any>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);

    // Fetch scheduled posts
    const { data: scheduledPosts, refetch } = trpc.posts.list.useQuery({
        influencerId: INFLUENCER_ID,
    });

    // Fetch images for post creation
    const { data: availableImages } = trpc.images.getHistory.useQuery({
        influencerId: INFLUENCER_ID,
        limit: 10,
    });

    // Schedule post mutation
    const schedulePostMutation = trpc.posts.schedule.useMutation({
        onSuccess: () => {
            refetch();
            setShowCreateModal(false);
        },
    });

    // Delete post mutation
    const deletePostMutation = trpc.posts.delete.useMutation({
        onSuccess: () => {
            refetch();
            setSelectedPost(null);
        },
    });

    // Get month name and year
    const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    // Get days in month
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Adjust for Monday start

    // Group posts by date
    const postsByDate = useMemo(() => {
        const map = new Map<number, any[]>();
        scheduledPosts?.forEach((post: any) => {
            const postDate = new Date(post.scheduledTime);
            if (postDate.getMonth() === currentDate.getMonth() && postDate.getFullYear() === currentDate.getFullYear()) {
                const day = postDate.getDate();
                if (!map.has(day)) map.set(day, []);
                map.get(day)!.push(post);
            }
        });
        return map;
    }, [scheduledPosts, currentDate]);

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };
    return (
        <div className="bg-[#f0f0f0] text-black font-reading min-h-screen flex flex-col selection:bg-[#d4c5a9] selection:text-black relative">
            {/* Paper Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.4] mix-blend-multiply z-0" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>

            {/* Sidebar */}
            <div className="flex flex-1 relative z-10">
                <aside className="w-20 md:w-64 bg-[#e8e8e8] border-r border-[#d4d4d4] flex flex-col pt-8 shrink-0">
                    <div className="px-6 mb-12 hidden md:block">
                        <h1 className="font-elegant text-2xl italic">Editorial.</h1>
                    </div>
                    <nav className="flex flex-col gap-1 px-3">
                        {['Overview', 'Calendar', 'Campaigns', 'Assets'].map((item, i) => (
                            <a key={item} href="#" className={`flex items-center gap-4 px-4 py-3 rounded-sm transition-all ${i === 1 ? 'bg-white shadow-sm ring-1 ring-black/5' : 'hover:bg-white/50 text-[#666] hover:text-black'}`}>
                                <span className="material-symbols-outlined text-[18px]">{['dashboard', 'calendar_today', 'campaign', 'folder_open'][i]}</span>
                                <span className={`text-[11px] uppercase tracking-widest font-bold hidden md:block ${i === 1 ? 'text-black' : ''}`}>{item}</span>
                            </a>
                        ))}
                    </nav>
                    <div className="mt-auto p-6 border-t border-[#d4d4d4] hidden md:block">
                        <div className="flex items-center gap-3">
                            <div className="size-8 rounded-full bg-[#d4c5a9] flex items-center justify-center font-elegant italic font-bold text-white">S</div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold uppercase tracking-wide">Studio A</span>
                                <span className="text-[9px] text-[#666] uppercase tracking-wider">Pro Plan</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col bg-[#f5f5f5]">
                    <header className="px-8 py-6 border-b border-[#e0e0e0] bg-[#f5f5f5]/90 backdrop-blur-sm sticky top-0 z-20 flex justify-between items-end">
                        <div>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-[#888] font-bold block mb-1">Schedule Manager</span>
                            <div className="flex items-center gap-4">
                                <button onClick={handlePrevMonth} className="text-[#888] hover:text-black"><span className="material-symbols-outlined">chevron_left</span></button>
                                <h2 className="font-elegant text-4xl italic">{monthName}</h2>
                                <button onClick={handleNextMonth} className="text-[#888] hover:text-black"><span className="material-symbols-outlined">chevron_right</span></button>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="vintage" className="bg-white border-[#d4d4d4] hover:bg-[#fafafa] text-black h-9 px-4">
                                <span className="material-symbols-outlined text-sm mr-2">filter_list</span> Filter
                            </Button>
                            <Button variant="vintage" className="bg-black text-white hover:bg-[#333] hover:text-white border-transparent h-9 px-5 shadow-lg" onClick={() => setShowCreateModal(true)}>
                                <span className="material-symbols-outlined text-sm mr-2">add</span> Create Post
                            </Button>
                        </div>
                    </header>

                    <div className="flex-1 p-8 overflow-y-auto">
                        <div className="max-w-6xl mx-auto">

                            {/* Calendar Grid Header */}
                            <div className="grid grid-cols-7 mb-4 border-b border-[#e0e0e0] pb-2">
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                    <div key={day} className="text-[10px] uppercase tracking-widest font-bold text-[#888] text-center">{day}</div>
                                ))}
                            </div>

                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 border-l border-t border-[#e0e0e0] bg-white shadow-sm">
                                {/* Blank Days */}
                                {Array.from({ length: adjustedFirstDay }).map((_, i) => <div key={`ph-${i}`} className="min-h-[140px] border-r border-b border-[#e0e0e0] bg-[#fafafa]/50"></div>)}

                                {/* Days */}
                                {Array.from({ length: daysInMonth }).map((_, i) => {
                                    const day = i + 1;
                                    const dayPosts = postsByDate.get(day) || [];
                                    const isToday = new Date().getDate() === day && new Date().getMonth() === currentDate.getMonth() && new Date().getFullYear() === currentDate.getFullYear();

                                    return (
                                        <div key={day} className="min-h-[140px] border-r border-b border-[#e0e0e0] p-2 relative group hover:bg-[#fafafa] transition-colors">
                                            <span className={`text-xs font-mono absolute top-2 right-2 ${isToday ? 'bg-black text-white size-6 flex items-center justify-center rounded-full' : 'text-[#aaa]'}`}>{day}</span>

                                            {/* Post Items */}
                                            {dayPosts.map((post: any, j: number) => (
                                                <div key={post.id} className="mt-6 mx-1 bg-[#f0f0f0] border border-[#e0e0e0] p-2 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedPost(post)}>
                                                    {post.imageId && (
                                                        <div className="aspect-square bg-cover bg-center mb-2 grayscale" style={{ backgroundImage: `url('${post.image?.imageUrl || ''}')` }}></div>
                                                    )}
                                                    <div className="flex items-center gap-1.5 mb-1">
                                                        <span className={`size-1.5 rounded-full ${post.status === 'PUBLISHED' ? 'bg-green-500' : post.status === 'SCHEDULED' ? 'bg-orange-500' : 'bg-blue-500'}`}></span>
                                                        <span className="text-[8px] uppercase tracking-wider font-bold text-[#666]">{post.status}</span>
                                                    </div>
                                                    <p className="text-[10px] font-serif italic leading-tight truncate">{post.caption?.slice(0, 20) || 'Untitled'}...</p>
                                                </div>
                                            ))}
                                        </div>
                                    );
                                })}

                                {/* Remaining Blank Days to fill grid */}
                                {Array.from({ length: (7 - ((adjustedFirstDay + daysInMonth) % 7)) % 7 }).map((_, i) => <div key={`ph-end-${i}`} className="min-h-[140px] border-r border-b border-[#e0e0e0] bg-[#fafafa]/50"></div>)}
                            </div>
                        </div>
                    </div>
                </main>

                {/* Details Sidebar */}
                <aside className="w-80 bg-white border-l border-[#d4d4d4] flex flex-col pt-8 shrink-0 hidden xl:flex">
                    {selectedPost ? (
                        <>
                            <div className="px-6 mb-6">
                                <span className="text-[10px] uppercase tracking-widest font-bold text-[#888] block mb-2">Selected</span>
                                <h3 className="font-elegant text-2xl italic">{selectedPost.caption?.slice(0, 30) || 'Untitled Post'}...</h3>
                            </div>

                            {selectedPost.image?.imageUrl && (
                                <div className="px-6 mb-8">
                                    <div className="aspect-[4/5] bg-cover bg-center border border-[#e0e0e0] p-2 shadow-lg rotate-1" style={{ backgroundImage: `url('${selectedPost.image.imageUrl}')` }}></div>
                                </div>
                            )}

                            <div className="flex-1 overflow-y-auto px-6 space-y-6">
                                <div>
                                    <label className="text-[9px] uppercase tracking-widest font-bold text-[#888] block mb-1">Caption</label>
                                    <p className="font-reading text-sm text-[#444] leading-relaxed italic">"{selectedPost.caption || 'No caption'}"</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[9px] uppercase tracking-widest font-bold text-[#888] block mb-1">Date</label>
                                        <p className="font-mono text-xs text-black">{new Date(selectedPost.scheduledTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                    </div>
                                    <div>
                                        <label className="text-[9px] uppercase tracking-widest font-bold text-[#888] block mb-1">Time</label>
                                        <p className="font-mono text-xs text-black">{new Date(selectedPost.scheduledTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</p>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[9px] uppercase tracking-widest font-bold text-[#888] block mb-1">Status</label>
                                    <div className="flex items-center gap-2">
                                        <span className={`size-2 rounded-full ${selectedPost.status === 'PUBLISHED' ? 'bg-green-500' : 'bg-orange-500 animate-pulse'}`}></span>
                                        <span className="font-mono text-xs text-black">{selectedPost.status}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border-t border-[#d4d4d4] bg-[#fafafa] space-y-2">
                                <Button variant="vintage" className="w-full bg-black text-white hover:bg-[#333] border-transparent h-10 shadow-md">Edit Post</Button>
                                <Button variant="vintage" className="w-full bg-red-500 text-white hover:bg-red-600 border-transparent h-10" onClick={() => deletePostMutation.mutate({ id: selectedPost.id })}>Delete Post</Button>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center px-6">
                                <span className="material-symbols-outlined text-4xl text-[#ccc] mb-2">calendar_month</span>
                                <p className="text-[#888] text-sm">Select a post to view details</p>
                            </div>
                        </div>
                    )}
                </aside>
            </div>

            {/* Create Post Modal */}
            <CreatePostModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSuccess={() => refetch()}
            />
        </div>
    );
}
