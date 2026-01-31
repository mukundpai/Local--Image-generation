import React from 'react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';

export default function StudioPage() {
    return (
        <div className="bg-background-dark text-white font-display overflow-hidden h-screen flex flex-col selection:bg-white selection:text-black">
            {/* Header */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-border-dark px-6 py-3 bg-background-dark z-20 shrink-0">
                <div className="flex items-center gap-5 text-white">
                    <div className="size-8 flex items-center justify-center border border-white/20 bg-surface-dark text-primary">
                        <span className="material-symbols-outlined text-xl">camera</span>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-primary text-lg font-bold uppercase tracking-widest leading-none">Darkroom</h2>
                        <span className="text-[10px] text-text-secondary uppercase tracking-widest mt-0.5">Generation Studio</span>
                    </div>
                    <div className="w-px h-6 bg-border-dark mx-2"></div>
                    <div className="hidden md:flex px-3 py-1 bg-surface-dark border border-border-dark items-center gap-3">
                        <span className="material-symbols-outlined text-xs text-text-secondary">fingerprint</span>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-text-secondary">Subject ID:</span>
                        <span className="text-xs font-mono font-bold text-white tracking-wider">SARA_V1</span>
                    </div>
                </div>
                <div className="flex flex-1 justify-end gap-8 items-center">
                    <div className="flex items-center gap-8 hidden md:flex">
                        {['Projects', 'Negatives', 'Settings'].map((item) => (
                            <a key={item} href="#" className="text-text-secondary hover:text-white text-xs uppercase tracking-widest transition-colors font-medium">
                                {item}
                            </a>
                        ))}
                    </div>
                    <div
                        className="bg-center bg-no-repeat bg-cover size-9 border border-border-dark grayscale hover:grayscale-0 transition-all duration-500"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuClhh608Vn2JRlIxLY1KtS0AXJCh3ThnnjRJm2Qznil7DRMSHwNMuojoOd7fs657jhD6crzr9cjAfbDfdjHCuJCCjbTuxh_iKuyJ4o3RCD8qWxNTTCiy5pCjlzCsHf5rL5EotzFGfKmlYx8teob1steG2RKtBj4bXyYxC5kUB2ozDtX_qvQnlkHUUkWk1dUkfKfYLMCy8Wr--p8S1oSzWE-6HUiDJh3wy-OmKyWjg1zgFamd26um-BWwAT4QgnPlOXzGLn0An0LlQXF")' }}
                    />
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Left Sidebar */}
                <aside className="w-80 shrink-0 border-r border-border-dark bg-background-dark flex flex-col overflow-hidden z-10 hidden lg:flex">
                    <div className="p-5 overflow-y-auto flex-1 custom-scrollbar">
                        <h3 className="text-white tracking-widest uppercase text-xs font-bold mb-6 border-b border-border-dark pb-2">Input Parameters</h3>

                        <div className="flex flex-col gap-6 mb-6">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-text-secondary text-xs font-mono uppercase">Positive Prompt</label>
                                    <span className="text-[10px] text-text-muted font-mono uppercase border border-border-dark px-1">Raw Mode</span>
                                </div>
                                <Textarea
                                    variant="studio"
                                    rows={6}
                                    placeholder="// Enter visual description..."
                                    defaultValue="(masterpiece, best quality), realistic photo of Sara, 24yo influencer, sitting in a modern cafe, drinking matcha latte, wearing oversized beige hoodie, soft natural lighting, depth of field, 8k uhd"
                                />
                            </div>

                            {/* LoRA Accordion (Simplified) */}
                            <div className="border border-border-dark bg-surface-dark/30">
                                <div className="flex items-center justify-between gap-6 p-2 bg-surface-dark border-b border-border-dark">
                                    <p className="text-white text-xs font-mono uppercase tracking-wider">Style Adapters</p>
                                    <span className="material-symbols-outlined text-text-secondary text-sm">expand_more</span>
                                </div>
                                <div className="p-3 grid grid-cols-3 gap-2 bg-[#0a0a0a]">
                                    <div
                                        className="aspect-square border border-white bg-cover bg-center cursor-pointer relative"
                                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDdmMlWLbrXMGzG8tdNaAsgnVu-LManNoN2DfumXu7xkW11fSAYaqnWWQGKPF07NXsDTGBaMqc-ISL27ny4RR4fouQLvtZN-Y8DES7J7frGbMNaJHLjtFDeqdC6BchJ6-TlQptywNa3m_yCHuxn2ZtHzXHydon-XCfS_T8CP2Jigkby0maXPHdhcij8h4Ba9zQKds__QSOCFOhKNHhRAH9KVCqvz4HgOTGLo3AGpFnfsHDmEGWsefVZxbikQGqBXlvBW-Sd5N_hTrzL")' }}
                                    >
                                        <div className="absolute inset-0 bg-white/10 ring-1 ring-white/50"></div>
                                        <div className="absolute bottom-0 right-0 bg-white text-black text-[9px] px-1 font-mono font-bold">ACT</div>
                                    </div>
                                    <div
                                        className="aspect-square border border-border-dark bg-cover bg-center cursor-pointer grayscale opacity-60 hover:opacity-100 transition-all"
                                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDFjGuU875WS2dbZIEC4L61KhIrxl0tcO1aOuVR66aoMB05-DhhR3vy3yuybIzHWbc3ZbUrWXlkaDZMcz40wKRu-FPSWnnGDpHnqxDVS5f_4mwkEGFLVq0Sbsd8utkWtjj2UfJPWXzSO4Z1HlKKvOszIm3CzUXVs7heuKnTvV5e_JXAvdcOcThyctg5KxVvSxh0hXXFPpRHUsbp2qP6Pt8HNLoTKyHhsdsEIQfH-kq_kRD-jpFMUCkxZgJCq0vzq1IRYu8fr1FmPADI")' }}
                                    />
                                    <div className="aspect-square border border-dashed border-border-dark flex items-center justify-center hover:bg-surface-dark cursor-pointer text-text-secondary hover:text-white">
                                        <span className="material-symbols-outlined text-lg">add</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="text-text-secondary text-xs font-mono uppercase block mb-2">Negative Prompt</label>
                                <Textarea
                                    variant="studio"
                                    rows={4}
                                    placeholder="// Exclude patterns..."
                                    defaultValue="blurry, bad anatomy, extra fingers, cartoon, 3d render, illustration, text, watermark, low quality, worst quality"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-5 border-t border-border-dark bg-background-dark">
                        <Button variant="primary" className="w-full font-mono uppercase tracking-widest rounded-none h-12 font-bold" leftIcon={<span className="material-symbols-outlined text-lg">shutter_speed</span>}>
                            Develop
                        </Button>
                        <div className="flex justify-between items-center mt-3 text-[10px] text-text-secondary font-mono uppercase">
                            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-white rounded-full"></span> Cost: 4</span>
                            <span>RES: 1024x1024</span>
                        </div>
                    </div>
                </aside>

                {/* Main Canvas */}
                <main className="flex-1 flex flex-col relative bg-[#050505]">
                    {/* Toolbar */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-surface-dark/90 backdrop-blur-sm border border-border-dark px-4 py-1.5 flex items-center gap-4 z-20 shadow-2xl">
                        <button className="text-text-secondary hover:text-white"><span className="material-symbols-outlined text-lg">pan_tool</span></button>
                        <div className="w-px h-3 bg-border-dark"></div>
                        <button className="text-text-secondary hover:text-white"><span className="material-symbols-outlined text-lg">add</span></button>
                        <span className="text-[10px] text-text-secondary font-mono">1:1</span>
                        <button className="text-text-secondary hover:text-white"><span className="material-symbols-outlined text-lg">remove</span></button>
                        <div className="w-px h-3 bg-border-dark"></div>
                        <button className="text-text-secondary hover:text-white"><span className="material-symbols-outlined text-lg">crop_free</span></button>
                    </div>

                    {/* Image Area */}
                    <div className="flex-1 flex items-center justify-center p-8 overflow-hidden relative"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }}>
                        <div className="relative group max-h-full aspect-square shadow-[0_0_100px_rgba(0,0,0,0.8)] border-[12px] border-[#1a1a1a] bg-[#1a1a1a]">
                            <div className="absolute -top-1 -left-1 w-6 h-6 border-t border-l border-white/20 z-10"></div>
                            <div className="absolute -top-1 -right-1 w-6 h-6 border-t border-r border-white/20 z-10"></div>
                            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b border-l border-white/20 z-10"></div>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b border-r border-white/20 z-10"></div>
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXa3Yhy1_NRkikVF2rhZmPRyNr0Q30e8vD8JYCEmVFvJnwZbZBPqQ8pvIuEcaGx5lA1nNPz8ibSK9fsGWzGSzBfekc0FwDNjskpT2bbZQSGyjFzrcfV-Lb7AMui-ae0cdVbTG2mVwPKfPJwiLnNVclBhpOSheo-P985WXMfcmSQJ2IvwVx4SrPgQrzk-MrJ1Yt_OwCMFUVn5KPP7USgEeRYm_wOcy5R6H5DZC4LMZNH2QzKkLqnS6xBin7GqBlIvR5RO85FzaXZzg4"
                                className="max-h-full w-full h-full object-contain grayscale-[20%] sepia-[10%] contrast-[1.1]"
                                alt="Generated content"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                        <Button variant="studio" className="bg-[#0a0a0a] text-text-secondary hover:bg-white hover:text-black border border-border-dark backdrop-blur-md h-9 text-xs">
                            <span className="material-symbols-outlined text-base mr-2">hd</span> Upscale
                        </Button>
                        <Button variant="studio" className="bg-[#0a0a0a] text-text-secondary hover:bg-white hover:text-black border border-border-dark backdrop-blur-md h-9 text-xs">
                            <span className="material-symbols-outlined text-base mr-2">splitscreen</span> Variant
                        </Button>
                        <Button variant="primary" className="h-9 text-xs font-mono font-bold">
                            <span className="material-symbols-outlined text-base mr-2">download</span> Save
                        </Button>
                    </div>

                    {/* History Ribbon */}
                    <div className="h-24 border-t border-border-dark bg-background-dark flex items-center px-4 gap-4 overflow-x-auto shrink-0 custom-scrollbar z-20 relative">
                        <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-background-dark to-transparent pointer-events-none z-10"></div>
                        {/* Current Item */}
                        <div className="relative group">
                            <div
                                className="h-16 w-16 border border-white bg-cover bg-center cursor-pointer shrink-0 grayscale-[20%]"
                                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAHU6IROLXTL_7BtiHfJWOzqvHxyAxANt7JflTkV7elpUkEsGhkSPqaFsC9f2PmdQMAZuncNPayLx0yRpr-g_Ayv8lFbSd5spKLSlFQJn5kebCnC-vtEt1Kj37Zkyt6UvAjgwZtc6L0RjV8xXWts8YLLRq3-PFjLAsctIq1Ehd4iU7iPn8yhHnHitxa4pIRRjfy_OBvcKKp9-ikgxiVjiV8WoPqLQ6cPMQ5xRmkskALLB0ZHBBmmacvj58pG_B8yiStC87JuDt9SMuK")' }}
                            />
                            <div className="absolute -bottom-2 right-1/2 translate-x-1/2 text-[9px] bg-white text-black px-1 font-mono leading-tight">NOW</div>
                        </div>
                        {/* Previous Items */}
                        {[
                            'https://lh3.googleusercontent.com/aida-public/AB6AXuCoIumT5shXjqrSrzO2D8Bfu3b3MfKPqDtyWNWBDbejMI6W93RT8JIYCdZF_3l0-qHhThKkHX91Nno4tZC8t6sK2WDThQRiaJNpgIXqhGDZ3dKJGrYLzvl6mP6sWug8bvXlA5VemrAgL_T1-IeDXXzOG-99kXwZ4IrKJDmQY6HVbbg0jUzhSO0va8lYXInRMOaIbb3TbfDHpZhQGN9dqdcUT5D2XM6WcdvO10t5o81_V6lhTjZFwhcud5ayO-nqiXaTlkvVvC8S-TAs',
                            'https://lh3.googleusercontent.com/aida-public/AB6AXuDNV8PaHFMMLw3XsgTH2-ixXpQJ6emxNfUCLPvyX2nOaEK1rH9EkfHWFJ7IWWGvZJzZStjBokGHTjOx5rsUEQPwqB7Vi9cY9XfV6144TgtVF5RcJkwov6NzlXhuDsDQwA-_dYb1-2MnJW0kwDyIT23UJn0SQkrY0ZkZX72kMNH6hx5j_kY76KmiJ51yVg0E9rFuz7yjBypi57DiGqk2Zg4PpSDEGRfAL-gK-Nrr5aZ6HOcmdsKctfdbwm2-MZz4IvpHvPBEmEiknFHP',
                            'https://lh3.googleusercontent.com/aida-public/AB6AXuAQBmPfm3A9edxcS9Dkr2FmvdGIfmP66hMILaieiIKLGjXstgjsUWAnV-D90tl98oe4APymXejN90TxRhd6ntFaE5_F0-B9nem4WQ9w3eWj1Ezasz46LFF-qK2s3dJ_nOvY0yL6b6f2ubKPlLuGP3gf1vOJQChxsG3dRoSKzVjtdNf0pzmG1QGzCd3TG1o6m6o2ZLXb2OkGMjWMSKXdYtEOWtAe64DVXh9Jh42ylIj-z6m9iG6XrxpNAQWKX0bV83R93D4w_0DTJYt2',
                            'https://lh3.googleusercontent.com/aida-public/AB6AXuCIwV1bGpxmsW8AfUqJ51SIONkla7DBSpj3E2SDtxBuRZPHaVGvrIbnkY_fTNaU1l1yfUWWb8pMFoBP-a2KWz_8blAfp5hzglapGggiVo7hHKJc2cnoHlS6a4-hr_1yf5dy1XjShP2lq7BSv5CQuaG8ROxezQjK0Dim9_5fHxi4-JCfJiTlCz_3uQa_4l-POHpXLwJTLKpDPEO53D-5o6NfwVq3V8-rPZlVL7H0HGJOkbU-A5naonZHW0z8p6hJ6ZQ3s93lU33cCns-'
                        ].map((url, i) => (
                            <div key={i} className="h-16 w-16 border border-border-dark hover:border-white bg-cover bg-center cursor-pointer opacity-50 hover:opacity-100 grayscale hover:grayscale-0 transition-all shrink-0" style={{ backgroundImage: `url('${url}')` }} />
                        ))}
                    </div>
                </main>

                {/* Right Sidebar */}
                <aside className="w-80 shrink-0 border-l border-border-dark bg-background-dark flex flex-col overflow-y-auto custom-scrollbar z-10 hidden xl:flex">
                    <div className="p-5">
                        <div className="flex justify-between items-center mb-6 pb-2 border-b border-border-dark">
                            <h3 className="text-white tracking-widest uppercase text-xs font-bold">Fine Tuning</h3>
                            <button className="text-text-secondary hover:text-white text-[10px] uppercase tracking-widest border border-border-dark px-2 py-0.5 hover:border-white transition-colors">Reset</button>
                        </div>

                        {/* Config Sections */}
                        <div className="mb-8">
                            <h4 className="text-text-secondary text-[10px] font-mono font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">face</span> Physical Attributes
                            </h4>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-white text-xs font-medium">Hair Tone</label>
                                    <select className="w-full appearance-none rounded-none border border-border-dark bg-[#0a0a0a] py-1.5 px-3 text-white focus:border-white focus:outline-none text-xs font-mono">
                                        <option>Dark Brown [Ref A]</option>
                                        <option>Platinum Blonde</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-white text-xs font-medium">Iris Pigment</label>
                                    <select className="w-full appearance-none rounded-none border border-border-dark bg-[#0a0a0a] py-1.5 px-3 text-white focus:border-white focus:outline-none text-xs font-mono">
                                        <option>Hazel [Default]</option>
                                        <option>Crystal Blue</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h4 className="text-text-secondary text-[10px] font-mono font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">photo_camera</span> Optics
                            </h4>
                            <div className="flex flex-col gap-5">
                                <div className="flex justify-between">
                                    <label className="text-white text-xs font-medium">Guidance (CFG)</label>
                                    <span className="text-text-secondary font-mono text-xs">7.5</span>
                                </div>
                                <input type="range" className="w-full" min="1" max="20" step="0.5" defaultValue="7.5" />
                            </div>
                        </div>

                    </div>

                    <div className="mt-auto pt-6 border-t border-border-dark">
                        <div className="bg-surface-dark/50 border border-border-dark p-4">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-white text-sm">memory</span>
                                    <span className="text-xs font-bold text-white uppercase tracking-wider">System Status</span>
                                </div>
                                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-mono text-text-secondary uppercase">
                                    <span>Core</span><span className="text-white">SDXL_TURBO_V1</span>
                                </div>
                                <div className="flex justify-between text-[10px] font-mono text-text-secondary uppercase">
                                    <span>VRAM</span><span className="text-white">14.2 GB / 24 GB</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
