'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { trpc } from '@/lib/trpc/client';

const INFLUENCER_ID = 'sara-influencer-001';

export default function InfluencerPage() {
    // Fetch real analytics data
    const { data: analytics, isLoading: analyticsLoading } = trpc.analytics.getDashboard.useQuery({
        influencerId: INFLUENCER_ID,
    });

    // Fetch recent generated images
    const { data: recentImages } = trpc.images.getHistory.useQuery({
        influencerId: INFLUENCER_ID,
        limit: 4,
    });

    // Fetch upcoming scheduled posts
    const { data: upcomingPosts } = trpc.posts.list.useQuery({
        influencerId: INFLUENCER_ID,
        status: 'SCHEDULED',
    });

    const formatNumber = (num: number | undefined) => {
        if (!num) return '0';
        if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
        return num.toString();
    };

    const formatDate = (date: Date) => {
        const d = new Date(date);
        const day = d.getDate();
        const label = d.toLocaleDateString('en-US', { weekday: 'short' });
        return { day: day.toString(), label };
    };
    return (
        <div className="bg-background-dark font-sans text-dash-text-main overflow-hidden h-screen flex selection:bg-dash-primary selection:text-black">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none z-50 bg-grain opacity-50 mix-blend-overlay"></div>
            <div className="vintage-overlay"></div>
            <div className="scanline"></div>

            {/* Sidebar */}
            <aside className="w-80 flex flex-col border-r border-dash-border bg-dash-card h-full shrink-0 hidden md:flex relative z-30 shadow-[4px_0_24px_rgba(0,0,0,0.4)]">
                <div className="flex flex-col h-full justify-between">
                    <div className="flex flex-col">
                        <div className="p-8 pb-8 border-b border-dash-border">
                            <div className="flex items-center gap-4">
                                <div
                                    className="bg-center bg-no-repeat bg-cover grayscale contrast-125 size-14 border border-dash-primary/30 ring-4 ring-black"
                                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjCUIhlV-h_SeaIvdPz3FXcTOU5v0VW5-oDI0bQVMdjvwtlLueDbL8oV0kVD0FlteDR9Ss7s5klTegzvCEdhO1_PyROz_5pkkPdYY4OovDsJ-PfsWmJ7l4IPCYJnAbZhAslf-1EfwFCk3tYjFGEhv8LUHFET8NRJmQyp9mTYcobTGmWspMqFyIJfrlbeJcANdaqiC_ODnywzvuDQoyIcAcjf7cSueDOuYID5_mhylEM-SatpbOAoJdrlFfVvFsr3LJF15XuajRLS6j")' }}
                                />
                                <div className="flex flex-col">
                                    <h1 className="text-dash-primary text-3xl font-serif font-medium tracking-wide italic">Synth<span className="text-dash-text-main not-italic">Manager</span></h1>
                                    <p className="text-text-muted text-[9px] font-mono uppercase tracking-[0.2em] mt-1 border-t border-dash-border pt-1 inline-block">Archive System v2.1</p>
                                </div>
                            </div>
                        </div>
                        <nav className="flex flex-col py-6 px-4 gap-2">
                            <a className="flex items-center gap-4 px-4 py-3 bg-white/5 border border-white/10 text-dash-primary transition-all shadow-lg" href="#">
                                <span className="material-symbols-outlined text-dash-primary">dashboard</span>
                                <p className="text-xs font-bold uppercase tracking-widest font-sans">Dashboard</p>
                            </a>
                            {['Generation', 'Fine-Tuning', 'Analytics', 'Settings'].map((item, i) => (
                                <a key={item} href="#" className="flex items-center gap-4 px-4 py-3 hover:bg-white/5 border border-transparent hover:border-white/10 text-text-muted hover:text-dash-text-main transition-all group">
                                    <span className="material-symbols-outlined group-hover:text-dash-primary transition-colors">{['image', 'tune', 'monitoring', 'settings'][i]}</span>
                                    <p className="text-xs font-medium uppercase tracking-widest font-sans">{item}</p>
                                </a>
                            ))}
                        </nav>
                    </div>
                    <div className="p-6 border-t border-dash-border bg-black/20">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-1.5 w-1.5 rounded-full bg-green-700 animate-pulse"></div>
                            <span className="text-[10px] font-mono text-green-700 uppercase tracking-widest">Server Online</span>
                        </div>
                        <Button variant="ghost" className="w-full justify-start pl-0 text-text-muted hover:text-dash-primary text-xs font-medium uppercase tracking-widest hover:bg-transparent" leftIcon={<span className="material-symbols-outlined text-lg">logout</span>}>
                            Terminate Session
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-dash-bg z-10">
                {/* Header */}
                <header className="flex items-center justify-between whitespace-nowrap border-b border-dash-border bg-dash-bg/95 backdrop-blur-sm px-8 py-6 z-20 shrink-0 shadow-lg">
                    <div className="flex items-center gap-6 text-dash-text-main">
                        <div className="md:hidden"><span className="material-symbols-outlined">menu</span></div>
                        <div>
                            <h2 className="text-dash-text-main text-xl font-serif font-light italic tracking-wider block">Project: <span className="not-italic font-sans font-medium">Lil_Miquela_AI</span></h2>
                            <p className="text-text-muted text-[10px] font-mono uppercase tracking-widest mt-0.5">ID: #884-X92-ALP</p>
                        </div>
                    </div>
                    <div className="flex flex-1 justify-end gap-8 items-center">
                        <div className="hidden md:flex items-center border-b border-text-muted/30 pb-1 w-64">
                            <span className="material-symbols-outlined text-text-muted mr-2 text-lg">search</span>
                            <input className="bg-transparent border-none outline-none text-dash-text-main text-sm font-serif italic placeholder:text-text-muted/50 w-full" placeholder="Search the archive..." />
                        </div>
                        <div className="flex items-center gap-4 pl-4 border-l border-dash-border">
                            <Button variant="vintage" className="bg-dash-text-main text-black hover:bg-dash-primary hover:text-black border-transparent shadow-[0_0_10px_rgba(255,255,255,0.1)] hover:shadow-[0_0_15px_rgba(212,197,169,0.3)] h-9 px-5">
                                <span className="material-symbols-outlined text-base mr-2">add</span> New Post
                            </Button>
                            <div className="bg-center bg-no-repeat aspect-square bg-cover grayscale contrast-125 size-9 border border-dash-border ring-1 ring-white/10" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDJ4xn9y85FHT9knFS3Tgpj9oMIOh97j7Z8IQurUQINQVcOb2yl-kuLDKvmewH6HkgbxzTJvA-i5ByTrRLAqUnB44x2XeKSzT-caKkqvXOBJqIeYGqQe6Qsv79LGbul-u8Eo3WbxY_aZfi81c9Tr1RSqdQR08BH5xmKpvxNsQNAGReJipFeVDePLtzxVj1CRpnEC5DRkNSUB-i3nDeOLs7bt7RxZy6ZjFUHZataHNozg7-S-ButeJCgH_yMBaNHL_qh3ff_IarpJpuZ")' }}></div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-6 md:p-12 scrollbar-hide">
                    <div className="max-w-[1400px] mx-auto flex flex-col gap-10">
                        {/* Overview Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            {/* Main Card */}
                            <div className="lg:col-span-8 bg-dash-card border border-dash-border shadow-vintage relative overflow-hidden group p-8 flex flex-col md:flex-row gap-8">
                                <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>
                                <div className="relative shrink-0">
                                    <div className="bg-center bg-no-repeat bg-cover w-32 h-44 md:w-40 md:h-52 border border-white/10 grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBgw9o6IGtx2NR3coaGsjKojQf0f8XqQB-C4YsMLJeWalMIEy204tv_uHgi2O7eaYQPMVlEtUN9Yf-vqpdQhbXLQcHtkvIcMud3GcXTVkyFWlnEjkeNJdIulXsr92V8DMkFMowUSgJRSCnC_shPccB5NwGXCKjHqWgfJxwYbCEY5Oc29Yb9T8dBQkLbwIlBNeqMlltief0l3u-zm9-isiuIshdH4ZvUNVAl2fmsKKxmahmOrYNECPIKpV8mdqG7K6s_yR9pB2rnnPkV")' }}></div>
                                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-mono text-dash-primary uppercase tracking-widest">Main</div>
                                </div>
                                <div className="flex flex-col justify-between w-full py-1 z-10">
                                    <div>
                                        <div className="flex justify-between items-start border-b border-dash-border pb-4 mb-4">
                                            <div>
                                                <h3 className="text-dash-text-main text-4xl font-serif font-light italic leading-none">Miquela <span className="not-italic font-sans text-2xl font-thin opacity-50">v4</span></h3>
                                                <p className="text-dash-dim font-mono text-[10px] uppercase tracking-widest mt-2">Configuration: Cyber-Streetwear 2024</p>
                                            </div>
                                            <button className="text-text-muted hover:text-dash-primary"><span className="material-symbols-outlined">edit_note</span></button>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            {['Age: 24', 'Seed: 847592', 'LoRA: v2.1'].map(tag => (
                                                <span key={tag} className="px-2 py-1 bg-white/5 border border-white/5 text-text-muted text-[10px] font-mono uppercase tracking-widest">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-8 mt-6">
                                        <div>
                                            <p className="text-text-muted/50 text-[9px] uppercase tracking-[0.2em] mb-1 font-bold">Base Model</p>
                                            <p className="text-dash-text-main text-lg font-serif italic">SDXL 1.0</p>
                                        </div>
                                        <div>
                                            <p className="text-text-muted/50 text-[9px] uppercase tracking-[0.2em] mb-1 font-bold">Consistency</p>
                                            <p className="text-dash-text-main text-lg font-serif italic flex items-center gap-2">98.5% <span className="material-symbols-outlined text-xs text-dash-primary">trending_up</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Stat Cards */}
                            <div className="lg:col-span-4 flex flex-col gap-6">
                                <Card variant="vintage" className="p-6 flex-1 hover:border-dash-primary/20 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="text-text-muted text-[10px] uppercase tracking-widest font-bold font-sans">Follower Growth</p>
                                        <span className="text-green-700 text-[10px] font-mono font-bold border border-green-700/20 bg-green-700/5 px-1.5 py-0.5">+12%</span>
                                    </div>
                                    <div className="flex items-baseline gap-2 mt-2">
                                        <p className="text-dash-text-main text-5xl font-serif font-light">{formatNumber(analytics?.followers)}</p>
                                        <span className="text-text-muted text-xs font-serif italic">total</span>
                                    </div>
                                </Card>
                                <Card variant="vintage" className="p-6 flex-1 hover:border-blue-400/20 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="text-text-muted text-[10px] uppercase tracking-widest font-bold font-sans">Avg. Engagement</p>
                                        <span className="text-blue-400 text-[10px] font-mono font-bold border border-blue-400/20 bg-blue-400/5 px-1.5 py-0.5">+2.1%</span>
                                    </div>
                                    <div className="flex items-baseline gap-2 mt-2">
                                        <p className="text-dash-text-main text-5xl font-serif font-light">{analytics?.engagementRate ? `${(analytics.engagementRate * 100).toFixed(1)}%` : '0%'}</p>
                                        <span className="text-text-muted text-xs font-serif italic">rate</span>
                                    </div>
                                </Card>
                            </div>
                        </div>

                        {/* Generation Lab */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 flex flex-col gap-6">
                                <div className="flex justify-between items-end border-b border-dash-border pb-2">
                                    <h3 className="text-dash-text-main text-2xl font-serif font-light italic flex items-center gap-3">
                                        <span className="material-symbols-outlined text-dash-dim text-2xl">shutter_speed</span> Generation Lab
                                    </h3>
                                    <a href="#" className="text-[10px] uppercase tracking-widest text-text-muted hover:text-dash-primary flex items-center gap-1">View Archive <span className="material-symbols-outlined text-sm">arrow_forward</span></a>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {recentImages?.images.slice(0, 3).map((image: any, i: number) => (
                                        <div key={image.id} className="group relative aspect-[3/4] overflow-hidden border border-dash-border bg-dash-card cursor-pointer shadow-vintage">
                                            <div className="absolute inset-0 bg-cover bg-center grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105 opacity-80 group-hover:opacity-100" style={{ backgroundImage: `url('${image.imageUrl}')` }}></div>
                                            <div className="absolute top-2 right-2 z-10">
                                                <span className="px-1.5 py-0.5 bg-black/80 text-green-700 border border-current/30 text-[9px] font-mono font-bold uppercase tracking-widest backdrop-blur-md">{image.status}</span>
                                            </div>
                                            <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                                                <button className="w-full py-3 bg-dash-card/95 border-t border-current/30 text-green-700 text-[10px] uppercase font-bold tracking-[0.2em] font-sans hover:bg-white/10">View</button>
                                            </div>
                                        </div>
                                    )) || []}
                                    {/* Processing Placeholder */}
                                    {(!recentImages || recentImages.images.length < 4) && (
                                        <div className="relative aspect-[3/4] overflow-hidden border border-dash-border bg-[#0a0a0a] flex flex-col items-center justify-center text-center p-4 shadow-inner">
                                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent"></div>
                                            <p className="text-dash-text-main text-[10px] uppercase tracking-widest font-bold">No Images Yet</p>
                                            <p className="text-text-muted font-mono text-[9px] mt-1">Start Generating</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Upcoming Schedule */}
                            <div className="flex flex-col gap-6">
                                <div className="flex justify-between items-end border-b border-dash-border pb-2">
                                    <h3 className="text-dash-text-main text-2xl font-serif font-light italic flex items-center gap-3">
                                        <span className="material-symbols-outlined text-dash-dim text-2xl">calendar_month</span> Upcoming
                                    </h3>
                                    <button className="size-7 border border-dash-border hover:bg-white/5 flex items-center justify-center text-text-muted transition-colors rounded-sm"><span className="material-symbols-outlined text-base">add</span></button>
                                </div>
                                <div className="bg-dash-card border border-dash-border flex flex-col shadow-vintage">
                                    {upcomingPosts && upcomingPosts.length > 0 ? (
                                        upcomingPosts.slice(0, 2).map((post: any, i: number) => {
                                            const { day, label } = formatDate(post.scheduledTime);
                                            const isToday = new Date(post.scheduledTime).toDateString() === new Date().toDateString();
                                            return (
                                                <div key={post.id} className="flex gap-4 p-5 border-b border-dash-border hover:bg-white/5 cursor-pointer group relative overflow-hidden">
                                                    {isToday && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-dash-primary"></div>}
                                                    <div className="flex flex-col items-center justify-center min-w-[3.5rem] border-r border-dash-border pr-5">
                                                        <span className={`text-[9px] font-mono font-bold uppercase tracking-widest ${isToday ? 'text-dash-primary' : 'text-text-muted'}`}>{label}</span>
                                                        <span className="text-dash-text-main text-3xl font-serif leading-none mt-1">{day}</span>
                                                    </div>
                                                    <div className="flex flex-col justify-center">
                                                        <p className={`text-sm font-bold leading-tight font-sans tracking-wide ${isToday ? 'text-dash-text-main group-hover:text-dash-primary' : 'text-dash-text-main'}`}>{post.caption.slice(0, 30)}...</p>
                                                        <p className="text-text-muted text-[10px] font-mono uppercase tracking-wider mt-1.5 opacity-70">{new Date(post.scheduledTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</p>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="p-8 text-center">
                                            <p className="text-text-muted text-xs font-mono uppercase">No scheduled posts</p>
                                            <p className="text-text-muted/50 text-[10px] mt-1">Create a post to get started</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
