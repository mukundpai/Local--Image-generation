import React from 'react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';

export default function PromptsPage() {
    return (
        <div className="bg-term-bg text-term-text font-terminal overflow-hidden h-screen flex flex-col antialiased selection:bg-term-accent selection:text-black">
            <div className="crt-overlay"></div>

            {/* Header */}
            <header className="flex items-center justify-between border-b border-term-border px-4 py-3 bg-term-bg z-10 shrink-0">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-term-bright">
                        <span className="material-symbols-outlined">terminal</span>
                        <h1 className="text-sm font-bold tracking-widest uppercase font-mono">TERMINAL_V1.0</h1>
                    </div>
                    <span className="text-text-muted text-xs">::</span>
                    <div className="text-xs font-mono text-text-muted">
                        <span>STATUS: ONLINE</span>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-xs font-mono text-right hidden sm:block">
                        <span className="text-text-muted">USER:</span> <span className="text-term-bright">ADMIN_01</span>
                    </div>
                    <div className="size-6 border border-term-border grayscale opacity-50 bg-center bg-cover" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDFKEsCFnMcECYqhL4pBez6QfyCjvc9-x5_Aha9LIKsI0Hu54V5A50b1MUz40JDheTM18njVk6vnWQw9ZU2XOl1k8yZ5oiTGM8QCuoxI3zHL9hsFFVN7TslLY3duXCSxGRCpc1nWqGFC2Xa9wO4cFgRGAY74FioyUQU77328QFGvdgmZi-LakxPu6sBWhNw-T5m7ficpHROGyRZAD8zM10GiynEvIAmP5VjFeJs79VAo9fktp-9p9P1zR4txb609aRqZuileZrQ7WA8")' }}></div>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Left Sidebar: Context */}
                <aside className="w-72 flex-shrink-0 border-r border-term-border flex flex-col bg-term-bg/50 overflow-y-auto hidden md:flex">
                    <div className="p-4 border-b border-term-border">
                        <h3 className="text-xs font-bold text-term-accent mb-4 uppercase tracking-wider font-mono">[ CONTEXT_PARAMETERS ]</h3>
                        <div className="space-y-6">
                            <div className="font-mono text-xs space-y-2">
                                {[['CURRENT_ARC', 'TOKYO_VLOG'], ['AESTHETIC', 'CYBERPUNK'], ['MODEL', 'SDXL_0.9']].map(([k, v]) => (
                                    <div key={k} className="flex justify-between">
                                        <span className="text-text-muted">{k}</span>
                                        <span className="text-term-text">{v}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-3">
                                {[
                                    { l: 'Candidness', v: '75%', bar: '||||||||||', dim: '||||' },
                                    { l: 'Mood', v: '40%', bar: '|||||', dim: '|||||||||' },
                                    { l: 'Realism', v: '90%', bar: '||||||||||||', dim: '||' },
                                ].map((item, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between text-[10px] font-mono mb-1 text-text-muted uppercase">
                                            <span>{item.l}</span><span>{item.v}</span>
                                        </div>
                                        <div className="text-[10px] tracking-[2px] text-term-accent leading-none font-mono">
                                            {item.bar}<span className="text-term-border">{item.dim}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className="text-[10px] font-mono mb-2 text-text-muted uppercase border-b border-term-border pb-1">IMMUTABLE_TOKENS</div>
                                <div className="flex flex-wrap gap-2 text-[10px] font-mono text-term-text">
                                    {['[pink_hair]', '[blue_eyes]', '[streetwear]', '[film_grain]'].map(t => <span key={t}>{t}</span>)}
                                    <span className="text-term-accent cursor-pointer hover:underline opacity-50 hover:opacity-100">+ADD</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 flex-1">
                        <h3 className="text-[10px] font-bold text-text-muted mb-2 uppercase tracking-wider font-mono">SYSTEM_LOG &gt; RECENT</h3>
                        <div className="font-mono text-[10px] text-text-muted space-y-1">
                            <p>&gt; Initializing core...</p>
                            <p>&gt; Loading 'Tokyo' context...</p>
                            <p>&gt; VRAM usage: 12GB</p>
                            <p>&gt; Ready for input<span className="animate-pulse">_</span></p>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col bg-term-bg relative z-0">
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                    <div className="flex-1 overflow-y-auto p-8 lg:p-12 max-w-4xl mx-auto w-full relative z-10">

                        {/* Input Stream */}
                        <div className="mb-12">
                            <label className="block text-xs font-bold text-term-accent mb-4 uppercase tracking-widest font-mono">01 // INPUT_STREAM</label>
                            <div className="relative group">
                                <span className="absolute left-0 top-0 text-term-accent font-mono text-lg">&gt;</span>
                                <Textarea
                                    variant="terminal"
                                    className="border-b border-term-border text-lg pl-6 font-terminal placeholder:text-text-muted/30 min-h-[4rem]"
                                    placeholder="Enter prompt sequence..."
                                    defaultValue="Drinking coffee in neon rain"
                                />
                                <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-term-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                        </div>

                        {/* Logic Gates */}
                        <div className="mb-12">
                            <label className="block text-xs font-bold text-term-accent mb-4 uppercase tracking-widest font-mono">02 // LOGIC_GATES</label>
                            <div className="border border-term-border p-6 bg-term-surface/30">
                                <div className="flex flex-wrap gap-4 mb-6">
                                    <Button variant="terminal" className="text-xs border border-term-accent text-term-accent bg-transparent py-1.5 h-auto rounded-none hover:bg-term-accent hover:text-black hover:border-term-accent">[ Sony A7R IV ]</Button>
                                    <Button variant="terminal" className="text-xs border border-term-border text-text-muted bg-transparent py-1.5 h-auto rounded-none hover:border-term-text hover:text-term-text">[ Golden Hour ]</Button>
                                    <Button variant="terminal" className="text-xs border border-term-border text-text-muted bg-transparent py-1.5 h-auto rounded-none hover:border-term-text hover:text-term-text">[ --ar 4:5 ]</Button>
                                    <Button variant="terminal" className="text-xs border border-dashed border-text-muted text-text-muted bg-transparent py-1.5 h-auto rounded-none hover:border-term-accent hover:text-term-accent">+ INJECT_MOD</Button>
                                </div>
                                <div className="font-mono text-xs">
                                    <span className="text-term-accent/70 uppercase tracking-wider block mb-2">Negative_Buffer:</span>
                                    <div className="text-text-muted border-l-2 border-term-border pl-3 py-1 italic">blurry, cartoon, 3d render, disfigured, bad anatomy, text, watermark...</div>
                                </div>
                            </div>
                        </div>

                        {/* Compiled String */}
                        <div className="mb-8">
                            <label className="block text-xs font-bold text-term-accent mb-4 uppercase tracking-widest font-mono">03 // COMPILED_STRING</label>
                            <div className="bg-black border border-term-border p-6 shadow-glow relative">
                                <div className="font-mono text-sm leading-8 text-term-text break-words">
                                    <span className="text-white">photo of a woman with pink bob hair</span> <span className="text-text-muted">::</span>
                                    <span className="text-text-muted">wearing streetwear</span> <span className="text-text-muted">::</span>
                                    drinking coffee in a cafe <span className="text-text-muted">::</span>
                                    <span className="text-term-accent">neon lights reflecting in rain</span> <span className="text-text-muted">::</span>
                                    window view of tokyo shinjuku <span className="text-text-muted">::</span>
                                    <span className="text-text-muted">highly detailed, 8k, photorealistic</span> <span className="text-text-muted">::</span>
                                    <span className="text-term-bright">--v 5.2 --style raw --ar 4:5</span>
                                    <span className="inline-block w-2 h-4 bg-term-accent ml-1 align-middle animate-pulse"></span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button variant="terminal" className="flex-1 h-14 text-sm font-bold border-2 border-transparent hover:border-transparent bg-term-accent text-black hover:bg-term-bright" leftIcon={<span className="material-symbols-outlined">memory</span>}>Initialize Generation</Button>
                            <Button variant="terminal" className="size-14 border border-term-border text-text-muted bg-transparent hover:bg-transparent hover:text-term-text hover:border-term-text p-0"><span className="material-symbols-outlined">save_as</span></Button>
                        </div>
                    </div>
                </main>

                {/* Right Sidebar: History */}
                <aside className="w-80 flex-shrink-0 border-l border-term-border bg-term-bg/50 flex flex-col hidden lg:flex">
                    <div className="p-4 border-b border-term-border flex justify-between items-center">
                        <h3 className="text-xs font-bold text-term-accent uppercase tracking-wider font-mono">[ HISTORY_BUFFER ]</h3>
                        <button className="text-[10px] text-text-muted hover:text-term-text uppercase">[EXPAND]</button>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {[
                            { id: 'ID_4092', time: '00:02:00 ago', prompt: '> Eating ramen at a stall...', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLMPbLHWVlKhT0LIqv0_aCKuVTWPpIUb5w8JPnXMRe89Y2aSj37PDSnPQSJxyzlnov4CUOX_sIM0lhqheVG6SI7qdpE4mXPqxr0RQ_Wa3TLUDW_pvgnTeVfKnrudOLauirwxtcGhhTr79mHx2L7d1iqkgP67KarqG7JQbHyI2YX1tvCan80rohabPQBenMIrHVmhzirt4InftRl31b_JrvtGh67MzrP3nnjATJZwaUCg-CuykqH8UVPjKpwLBBx8s1o6DVu46_rbFt' },
                            { id: 'ID_4091', time: '00:15:00 ago', prompt: '> Waiting for train...', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0afIFI7Cq6kRLIQ1ra1q4idhQzgXy47Gn-3Lx0kOtS8u6-kXmqLibyOsLE1dHM1ELrk2sAw2hT-VkLGFL-7FuksIIZ27Z0rsK8hZoACLA80YICBkIfRBepDui0jBgIwrNA_rghTo9dtHvX6ZtYehIfj6yUL7d4lgweKvIH78e4lAUahd8iCHBhtOyrcVHhxzBzMVETMb_i-nkFsUX_9QKXum8EMrXu4QAZjQuTLfL22Y455WfY3NmIiSYFa_-_3nGjBn7tcjl1WCs' },
                            { id: 'ID_4090', time: '01:00:00 ago', prompt: '> Walking in Shibuya...', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgLalJuM-lCtu9TDG8ea2Dfzx_wcR4Y8VIh5RXGQA2bBcUIDmxuA56GPHFy_P8WKF0tHuN9kqfMnwF9nt3HEq8HxvsuRuaFJ6CaLNSKRxzXCXFxapZO_Q1XGtdpZ0U-Ja7JZoWrSJRYuzbX07wv_akXw0sBK-OKwzRt_dLYt69OL5z2bSoJGduGqfh02csV5m69vsqholsnc3qNQQR6RrfEwHPKQ2zQaZFCFaqByGAUtzoZQzVw54pZIJKYWAAhEVjG8RHz99eClpo' }
                        ].map((item, i) => (
                            <div key={i} className="group border-b border-term-border p-4 hover:bg-term-surface transition-colors cursor-pointer">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[10px] font-mono text-term-accent">{item.id}</span>
                                    <span className="text-[10px] font-mono text-text-muted">{item.time}</span>
                                </div>
                                <div className="flex gap-3">
                                    <div className="size-12 shrink-0 border border-term-border bg-center bg-cover grayscale opacity-70 group-hover:opacity-100 transition-all" style={{ backgroundImage: `url('${item.img}')` }}></div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] font-terminal text-term-text truncate leading-tight mb-1">{item.prompt}</p>
                                        <div className="flex gap-2">
                                            <span className="text-[9px] border border-term-border px-1 text-text-muted">--ar 4:5</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="p-4">
                            <div className="border border-dashed border-term-border p-3 text-center hover:border-term-accent group cursor-pointer transition-colors">
                                <span className="text-[10px] font-mono text-text-muted group-hover:text-term-accent uppercase">Load_More_Entries()</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
