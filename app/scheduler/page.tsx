import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function SchedulerPage() {
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
                            <h2 className="font-elegant text-4xl italic">October 2024</h2>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="vintage" className="bg-white border-[#d4d4d4] hover:bg-[#fafafa] text-black h-9 px-4">
                                <span className="material-symbols-outlined text-sm mr-2">filter_list</span> Filter
                            </Button>
                            <Button variant="vintage" className="bg-black text-white hover:bg-[#333] hover:text-white border-transparent h-9 px-5 shadow-lg">
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
                                {[1, 2].map(i => <div key={`ph-${i}`} className="min-h-[140px] border-r border-b border-[#e0e0e0] bg-[#fafafa]/50"></div>)}

                                {/* Days */}
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(day => (
                                    <div key={day} className="min-h-[140px] border-r border-b border-[#e0e0e0] p-2 relative group hover:bg-[#fafafa] transition-colors">
                                        <span className={`text-xs font-mono absolute top-2 right-2 ${day === 4 ? 'bg-black text-white size-6 flex items-center justify-center rounded-full' : 'text-[#aaa]'}`}>{day}</span>

                                        {/* Post Items */}
                                        {day === 4 && (
                                            <div className="mt-6 mx-1 bg-[#f0f0f0] border border-[#e0e0e0] p-2 hover:shadow-md transition-shadow cursor-pointer">
                                                <div className="aspect-square bg-cover bg-center mb-2 grayscale" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjCUIhlV-h_SeaIvdPz3FXcTOU5v0VW5-oDI0bQVMdjvwtlLueDbL8oV0kVD0FlteDR9Ss7s5klTegzvCEdhO1_PyROz_5pkkPdYY4OovDsJ-PfsWmJ7l4IPCYJnAbZhAslf-1EfwFCk3tYjFGEhv8LUHFET8NRJmQyp9mTYcobTGmWspMqFyIJfrlbeJcANdaqiC_ODnywzvuDQoyIcAcjf7cSueDOuYID5_mhylEM-SatpbOAoJdrlFfVvFsr3LJF15XuajRLS6j")' }}></div>
                                                <div className="flex items-center gap-1.5 mb-1"><span className="size-1.5 rounded-full bg-orange-500"></span><span className="text-[8px] uppercase tracking-wider font-bold text-[#666]">Insta</span></div>
                                                <p className="text-[10px] font-serif italic leading-tight truncate">Campaign Launch...</p>
                                            </div>
                                        )}
                                        {day === 6 && (
                                            <div className="mt-6 mx-1 bg-[#f0f0f0] border border-[#e0e0e0] p-2 hover:shadow-md transition-shadow cursor-pointer">
                                                <div className="aspect-square bg-cover bg-center mb-2 grayscale" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCiO3S_3T0Z-6bT-R_M0a4bXn0VAgq-N7F3uS3dG9X5w0l2_VqH4yT6nB8jK1aD7mC5pL9rF9vW8xU4zE_tYQ1sO0kH3lA7_V6bJ5nC2yR4dM9pW8zS7tF6uG3vH1X0_aK5qB4nL9mD2rE8sJ7cT6oP5vU4_w")' }}></div>
                                                <div className="flex items-center gap-1.5 mb-1"><span className="size-1.5 rounded-full bg-blue-500"></span><span className="text-[8px] uppercase tracking-wider font-bold text-[#666]">Twitter</span></div>
                                                <p className="text-[10px] font-serif italic leading-tight truncate">Threads Update</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {/* Remaining Blank Days to fill grid */}
                                {[1, 2, 3, 4, 5, 6, 7].map(i => <div key={`ph-end-${i}`} className="min-h-[140px] border-r border-b border-[#e0e0e0] bg-[#fafafa]/50"></div>)}
                            </div>
                        </div>
                    </div>
                </main>

                {/* Details Sidebar */}
                <aside className="w-80 bg-white border-l border-[#d4d4d4] flex flex-col pt-8 shrink-0 hidden xl:flex">
                    <div className="px-6 mb-6">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-[#888] block mb-2">Selected</span>
                        <h3 className="font-elegant text-2xl italic">Campaign Launch</h3>
                    </div>

                    <div className="px-6 mb-8">
                        <div className="aspect-[4/5] bg-cover bg-center border border-[#e0e0e0] p-2 shadow-lg rotate-1" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjCUIhlV-h_SeaIvdPz3FXcTOU5v0VW5-oDI0bQVMdjvwtlLueDbL8oV0kVD0FlteDR9Ss7s5klTegzvCEdhO1_PyROz_5pkkPdYY4OovDsJ-PfsWmJ7l4IPCYJnAbZhAslf-1EfwFCk3tYjFGEhv8LUHFET8NRJmQyp9mTYcobTGmWspMqFyIJfrlbeJcANdaqiC_ODnywzvuDQoyIcAcjf7cSueDOuYID5_mhylEM-SatpbOAoJdrlFfVvFsr3LJF15XuajRLS6j")' }}></div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-6 space-y-6">
                        <div>
                            <label className="text-[9px] uppercase tracking-widest font-bold text-[#888] block mb-1">Caption</label>
                            <p className="font-reading text-sm text-[#444] leading-relaxed italic">"Embracing the future of digital identity. New collection drops tomorrow. #digitalfashion #metaverse"</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[9px] uppercase tracking-widest font-bold text-[#888] block mb-1">Date</label>
                                <p className="font-mono text-xs text-black">Oct 4, 2024</p>
                            </div>
                            <div>
                                <label className="text-[9px] uppercase tracking-widest font-bold text-[#888] block mb-1">Time</label>
                                <p className="font-mono text-xs text-black">10:00 AM EST</p>
                            </div>
                        </div>
                        <div>
                            <label className="text-[9px] uppercase tracking-widest font-bold text-[#888] block mb-1">Status</label>
                            <div className="flex items-center gap-2">
                                <span className="size-2 rounded-full bg-green-500 animate-pulse"></span>
                                <span className="font-mono text-xs text-black">Scheduled</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 border-t border-[#d4d4d4] bg-[#fafafa]">
                        <Button variant="vintage" className="w-full bg-black text-white hover:bg-[#333] border-transparent h-10 shadow-md">Edit Post</Button>
                    </div>
                </aside>
            </div>
        </div>
    );
}
