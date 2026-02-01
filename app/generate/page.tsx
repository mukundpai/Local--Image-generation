'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { trpc } from '@/lib/trpc/client';
import { useGenerationStore } from '@/stores/generationStore';
import { ImageHistoryPanel } from '@/components/ImageHistoryPanel';
import { generateImage, GenerateParams } from '@/lib/api';
import { AdvancedSettingsPanel, AdvancedSettings, DEFAULT_SETTINGS } from '@/components/AdvancedSettingsPanel';

const INFLUENCER_ID = 'sara-influencer-001'; // Hardcoded for now

export default function StudioPage() {
    const [prompt, setPrompt] = useState('(masterpiece, best quality), realistic photo of Sara, 24yo influencer, sitting in a modern cafe, drinking matcha latte, wearing oversized beige hoodie, soft natural lighting, depth of field, 8k uhd');
    const [negativePrompt, setNegativePrompt] = useState('blurry, bad anatomy, extra fingers, cartoon, 3d render, illustration, text, watermark, low quality, worst quality');
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [seed, setSeed] = useState<number | undefined>(undefined);
    const [advancedSettings, setAdvancedSettings] = useState<AdvancedSettings>(DEFAULT_SETTINGS);
    const [showAdvanced, setShowAdvanced] = useState(false);

    const { isGenerating, progress, setGenerating, setProgress } = useGenerationStore();
    const [statusMessage, setStatusMessage] = useState('Ready');

    // tRPC mutation to save image to database
    const saveImageMutation = trpc.images.generate.useMutation({
        onSuccess: (data) => {
            console.log('Image saved to database:', data);
        },
        onError: (error) => {
            console.error('Failed to save image:', error);
        },
    });

    const handleGenerate = async () => {
        if (!prompt) return;

        setGenerating(true);
        setProgress(0, 'Initializing...');
        setStatusMessage('Initializing...');

        try {
            const actualSeed = advancedSettings.seed !== null ? advancedSettings.seed : (seed || Math.floor(Math.random() * 999999999));
            const params: GenerateParams = {
                prompt,
                negativePrompt,
                seed: actualSeed,
                aspectRatio: advancedSettings.aspectRatio,
                // Advanced settings
                performance: advancedSettings.performance,
                imageNumber: advancedSettings.imageNumber,
                outputFormat: advancedSettings.outputFormat,
                sharpness: advancedSettings.sharpness,
                guidanceScale: advancedSettings.guidanceScale,
                // Model settings
                baseModel: advancedSettings.baseModel,
                refinerModel: advancedSettings.refinerModel,
                refinerSwitch: advancedSettings.refinerSwitch,
                loras: advancedSettings.loras,
                // Sampler settings
                sampler: advancedSettings.sampler,
                scheduler: advancedSettings.scheduler,
                clipSkip: advancedSettings.clipSkip,
                // Advanced
                adaptiveCfg: advancedSettings.adaptiveCfg,
                admScalerPositive: advancedSettings.admScalerPositive,
                admScalerNegative: advancedSettings.admScalerNegative,
                admScalerEnd: advancedSettings.admScalerEnd,
                // FreeU
                freeuEnabled: advancedSettings.freeuEnabled,
                freeuB1: advancedSettings.freeuB1,
                freeuB2: advancedSettings.freeuB2,
                freeuS1: advancedSettings.freeuS1,
                freeuS2: advancedSettings.freeuS2,
                // ControlNet
                controlnetSoftness: advancedSettings.controlnetSoftness,
            };
            const imageUrl = await generateImage(params, (prog, msg) => {
                setProgress(prog, msg);
                setStatusMessage(msg);
            });

            if (imageUrl) {
                setGeneratedImage(imageUrl);
                setStatusMessage('Generation Complete');

                // Save to database via tRPC
                saveImageMutation.mutate({
                    influencerId: INFLUENCER_ID,
                    prompt,
                    negativePrompt: negativePrompt || undefined,
                    seed: BigInt(actualSeed),
                    aspectRatio: '1024×1024',
                    imageUrl,
                    width: 1024,
                    height: 1024,
                });
            } else {
                setStatusMessage('Generation Failed');
            }
        } catch (error) {
            console.error(error);
            setStatusMessage('Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
        } finally {
            setGenerating(false);
            setProgress(100, 'Complete');
        }
    };

    const handleSelectFromHistory = (imageUrl: string, historyPrompt: string, historySeed: bigint) => {
        setGeneratedImage(imageUrl);
        setPrompt(historyPrompt);
        setSeed(Number(historySeed));
    };

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
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                />
                            </div>

                            {/* LoRA Accordion (Simplified - visual only for now) */}
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
                                    value={negativePrompt}
                                    onChange={(e) => setNegativePrompt(e.target.value)}
                                />
                            </div>

                            {/* Advanced Settings Panel */}
                            <AdvancedSettingsPanel
                                settings={advancedSettings}
                                onSettingsChange={setAdvancedSettings}
                                isOpen={showAdvanced}
                                onToggle={() => setShowAdvanced(!showAdvanced)}
                            />
                        </div>
                    </div>

                    <div className="p-5 border-t border-border-dark bg-background-dark">
                        <Button
                            variant="primary"
                            className="w-full font-mono uppercase tracking-widest rounded-none h-12 font-bold"
                            leftIcon={isGenerating ? <span className="animate-spin material-symbols-outlined">progress_activity</span> : <span className="material-symbols-outlined text-lg">shutter_speed</span>}
                            onClick={handleGenerate}
                            disabled={isGenerating}
                        >
                            {isGenerating ? 'Developing...' : 'Develop'}
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
                                src={generatedImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuDXa3Yhy1_NRkikVF2rhZmPRyNr0Q30e8vD8JYCEmVFvJnwZbZBPqQ8pvIuEcaGx5lA1nNPz8ibSK9fsGWzGSzBfekc0FwDNjskpT2bbZQSGyjFzrcfV-Lb7AMui-ae0cdVbTG2mVwPKfPJwiLnNVclBhpOSheo-P985WXMfcmSQJ2IvwVx4SrPgQrzk-MrJ1Yt_OwCMFUVn5KPP7USgEeRYm_wOcy5R6H5DZC4LMZNH2QzKkLqnS6xBin7GqBlIvR5RO85FzaXZzg4"}
                                className={`max-h-full w-full h-full object-contain ${generatedImage ? '' : 'grayscale-[20%] sepia-[10%] contrast-[1.1]'}`}
                                alt="Generated content"
                            />

                            {isGenerating && (
                                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center backdrop-blur-sm z-20">
                                    <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden mb-4">
                                        <div className="h-full bg-studio-accent transition-all duration-300" style={{ width: `${progress}%` }}></div>
                                    </div>
                                    <p className="text-white font-mono text-xs uppercase tracking-widest animate-pulse">{statusMessage}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons (Bottom) */}
                    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                        <Button variant="studio" className="bg-[#0a0a0a] text-text-secondary hover:bg-white hover:text-black border border-border-dark backdrop-blur-md h-9 text-xs">
                            <span className="material-symbols-outlined text-base mr-2">hd</span> Upscale
                        </Button>
                        <Button variant="studio" className="bg-[#0a0a0a] text-text-secondary hover:bg-white hover:text-black border border-border-dark backdrop-blur-md h-9 text-xs">
                            <span className="material-symbols-outlined text-base mr-2">splitscreen</span> Variant
                        </Button>
                        {generatedImage && (
                            <a href={generatedImage} download="generated-image.png">
                                <Button variant="primary" className="h-9 text-xs font-mono font-bold">
                                    <span className="material-symbols-outlined text-base mr-2">download</span> Save
                                </Button>
                            </a>
                        )}
                    </div>


                    {/* History Ribbon with Database Integration */}
                    <ImageHistoryPanel
                        influencerId={INFLUENCER_ID}
                        onSelectImage={handleSelectFromHistory}
                    />


                </main>
            </div>
        </div>
    );
}
