'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { checkConnection, generateImage, setLogCallback, LogEntry } from '@/lib/api';

export default function GenerateView() {
    // Basic state
    const [prompt, setPrompt] = useState('');
    const [negativePrompt, setNegativePrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
    const [statusMessage, setStatusMessage] = useState('');
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [showLogs, setShowLogs] = useState(true);

    // Advanced settings state
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [aspectRatio, setAspectRatio] = useState('1152×896');
    const [imageCount, setImageCount] = useState(1);
    const [guidanceScale, setGuidanceScale] = useState(4.0);
    const [sharpness, setSharpness] = useState(2.0);
    const [seed, setSeed] = useState(-1);
    const [performance, setPerformance] = useState('Speed');

    // Model settings
    const [showModels, setShowModels] = useState(false);
    const [baseModel, setBaseModel] = useState('juggernautXL_v8Rundiffusion.safetensors');
    const [refinerModel, setRefinerModel] = useState('None');
    const [refinerSwitch, setRefinerSwitch] = useState(0.5);

    // LoRA settings
    const [showLoras, setShowLoras] = useState(false);
    const [loras, setLoras] = useState([
        { enabled: true, name: 'None', weight: 1.0 },
        { enabled: true, name: 'None', weight: 1.0 },
        { enabled: true, name: 'None', weight: 1.0 },
        { enabled: true, name: 'None', weight: 1.0 },
        { enabled: true, name: 'None', weight: 1.0 },
    ]);

    // Image input state
    const [showImageInput, setShowImageInput] = useState(false);
    const [inputImage, setInputImage] = useState<File | null>(null);
    const [inputImagePreview, setInputImagePreview] = useState<string | null>(null);
    const [imageInputMode, setImageInputMode] = useState<'upscale' | 'variation' | 'inpaint'>('upscale');
    const [upscaleMethod, setUpscaleMethod] = useState('Subtle');

    // Enhance settings
    const [showEnhance, setShowEnhance] = useState(false);
    const [enhanceEnabled, setEnhanceEnabled] = useState(false);
    const [enhanceMethod, setEnhanceMethod] = useState('Subtle');

    // Style presets
    const [activeStyles, setActiveStyles] = useState<string[]>(['Fooocus V2', 'Fooocus Enhance', 'Fooocus Sharp']);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setLogCallback((entry) => {
            setLogs(prev => [entry, ...prev].slice(0, 50));
        });
        checkConnection();
    }, []);

    const stylePresets = [
        'Fooocus V2', 'Fooocus Enhance', 'Fooocus Sharp',
        'Cinematic', 'Photographic', 'Anime', 'Digital Art',
        'Fantasy Art', 'Neon Punk', 'Low Poly', '3D Model'
    ];

    const aspectRatios = [
        '704×1408', '704×1344', '768×1344', '768×1280', '832×1216',
        '832×1152', '896×1152', '896×1088', '960×1088', '960×1024',
        '1024×1024', '1024×960', '1088×960', '1088×896', '1152×896',
        '1152×832', '1216×832', '1280×768', '1344×768', '1344×704',
        '1408×704', '1472×704', '1536×640', '1600×640', '1664×576',
        '1728×576'
    ];

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setInputImage(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setInputImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const toggleStyle = (style: string) => {
        setActiveStyles(prev =>
            prev.includes(style)
                ? prev.filter(s => s !== style)
                : [...prev, style]
        );
    };

    const handleGenerate = useCallback(async () => {
        if (!prompt.trim()) return;

        setIsGenerating(true);
        setProgress(0);
        setStatusMessage('Starting generation...');
        setGeneratedImage(null);

        try {
            const imageUrl = await generateImage(
                {
                    prompt,
                    negativePrompt,
                    aspectRatio,
                    seed: seed === -1 ? undefined : seed,
                },
                (prog, msg) => {
                    setProgress(prog);
                    setStatusMessage(msg);
                }
            );

            if (imageUrl) {
                setGeneratedImage(imageUrl);
                setStatusMessage('Complete!');
            } else {
                setStatusMessage('No image returned');
            }
        } catch (error) {
            setStatusMessage(`Error: ${error instanceof Error ? error.message : 'Unknown'}`);
        } finally {
            setIsGenerating(false);
        }
    }, [prompt, negativePrompt, aspectRatio, seed]);

    const getLogColor = (level: string) => {
        switch (level) {
            case 'success': return 'text-emerald-400';
            case 'warning': return 'text-amber-400';
            case 'error': return 'text-red-400';
            default: return 'text-[#71717a]';
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-[#fafafa] tracking-tight mb-1">Create</h1>
                <p className="text-sm text-[#71717a]">Generate stunning AI images with advanced controls</p>
            </div>

            <div className="grid lg:grid-cols-5 gap-6">
                {/* Left Column - Controls */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Prompt */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="section-title">Prompt</label>
                            <span className="text-[10px] text-[#52525b]">{prompt.length}/2000</span>
                        </div>
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Describe your image in detail..."
                            className="textarea-field min-h-[100px]"
                            maxLength={2000}
                        />
                    </div>

                    {/* Negative Prompt */}
                    <div>
                        <label className="section-title mb-2 block">Negative Prompt</label>
                        <textarea
                            value={negativePrompt}
                            onChange={(e) => setNegativePrompt(e.target.value)}
                            placeholder="What to avoid..."
                            className="textarea-field min-h-[50px] text-sm"
                        />
                    </div>

                    {/* Style Presets */}
                    <div>
                        <label className="section-title mb-2 block">Styles</label>
                        <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1">
                            {stylePresets.map((style) => (
                                <button
                                    key={style}
                                    onClick={() => toggleStyle(style)}
                                    className={`preset-btn text-xs py-2 ${activeStyles.includes(style) ? 'active' : ''}`}
                                >
                                    {style}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Image Input Section */}
                    <div className="border-t border-[#27272a] pt-4">
                        <button
                            onClick={() => setShowImageInput(!showImageInput)}
                            className="flex items-center justify-between w-full text-sm text-[#71717a] hover:text-[#a1a1aa] transition-colors mb-3"
                        >
                            <span className="section-title">📎 Input Image</span>
                            <svg className={`w-4 h-4 transition-transform ${showImageInput ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        {showImageInput && (
                            <div className="space-y-3">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="btn-secondary w-full text-sm py-2"
                                >
                                    {inputImage ? 'Change Image' : 'Upload Image'}
                                </button>

                                {inputImagePreview && (
                                    <div className="relative">
                                        <img src={inputImagePreview} alt="Input" className="w-full rounded-lg" />
                                        <button
                                            onClick={() => {
                                                setInputImage(null);
                                                setInputImagePreview(null);
                                            }}
                                            className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                                        >
                                            ×
                                        </button>
                                    </div>
                                )}

                                <div className="grid grid-cols-3 gap-2">
                                    {['upscale', 'variation', 'inpaint'].map((mode) => (
                                        <button
                                            key={mode}
                                            onClick={() => setImageInputMode(mode as any)}
                                            className={`preset-btn text-xs capitalize ${imageInputMode === mode ? 'active' : ''}`}
                                        >
                                            {mode}
                                        </button>
                                    ))}
                                </div>

                                {imageInputMode === 'upscale' && (
                                    <select value={upscaleMethod} onChange={(e) => setUpscaleMethod(e.target.value)} className="input-field text-sm">
                                        <option>Subtle</option>
                                        <option>Strong</option>
                                        <option>Fast</option>
                                    </select>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Enhance Section */}
                    <div className="border-t border-[#27272a] pt-4">
                        <button
                            onClick={() => setShowEnhance(!showEnhance)}
                            className="flex items-center justify-between w-full text-sm text-[#71717a] hover:text-[#a1a1aa] transition-colors mb-3"
                        >
                            <span className="section-title">✨ Enhance</span>
                            <svg className={`w-4 h-4 transition-transform ${showEnhance ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        {showEnhance && (
                            <div className="space-y-3">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={enhanceEnabled}
                                        onChange={(e) => setEnhanceEnabled(e.target.checked)}
                                        className="w-4 h-4"
                                    />
                                    <span className="text-sm text-[#a1a1aa]">Enable Enhancement</span>
                                </label>

                                {enhanceEnabled && (
                                    <select value={enhanceMethod} onChange={(e) => setEnhanceMethod(e.target.value)} className="input-field text-sm">
                                        <option>Subtle</option>
                                        <option>Strong</option>
                                        <option>Detail</option>
                                    </select>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Advanced Settings */}
                    <div className="border-t border-[#27272a] pt-4">
                        <button
                            onClick={() => setShowAdvanced(!showAdvanced)}
                            className="flex items-center justify-between w-full text-sm text-[#71717a] hover:text-[#a1a1aa] transition-colors mb-3"
                        >
                            <span className="section-title">⚙️ Advanced Settings</span>
                            <svg className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        {showAdvanced && (
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-[#71717a] mb-2 block">Performance</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['Speed', 'Quality', 'Extreme Speed'].map((perf) => (
                                            <button
                                                key={perf}
                                                onClick={() => setPerformance(perf)}
                                                className={`preset-btn text-xs ${performance === perf ? 'active' : ''}`}
                                            >
                                                {perf.split(' ')[0]}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs text-[#71717a] mb-2 block">Aspect Ratio</label>
                                    <select value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)} className="input-field text-sm">
                                        {aspectRatios.map(ratio => (
                                            <option key={ratio} value={ratio}>{ratio}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-xs text-[#71717a] mb-2 block">Image Count: {imageCount}</label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="8"
                                        value={imageCount}
                                        onChange={(e) => setImageCount(Number(e.target.value))}
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs text-[#71717a] mb-2 block">Guidance Scale: {guidanceScale}</label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="30"
                                        step="0.5"
                                        value={guidanceScale}
                                        onChange={(e) => setGuidanceScale(Number(e.target.value))}
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs text-[#71717a] mb-2 block">Sharpness: {sharpness}</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="30"
                                        step="0.5"
                                        value={sharpness}
                                        onChange={(e) => setSharpness(Number(e.target.value))}
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs text-[#71717a] mb-2 block">Seed (-1 for random)</label>
                                    <input
                                        type="number"
                                        value={seed}
                                        onChange={(e) => setSeed(Number(e.target.value))}
                                        className="input-field text-sm"
                                        placeholder="-1"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Model Settings */}
                    <div className="border-t border-[#27272a] pt-4">
                        <button
                            onClick={() => setShowModels(!showModels)}
                            className="flex items-center justify-between w-full text-sm text-[#71717a] hover:text-[#a1a1aa] transition-colors mb-3"
                        >
                            <span className="section-title">🎨 Models</span>
                            <svg className={`w-4 h-4 transition-transform ${showModels ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        {showModels && (
                            <div className="space-y-3">
                                <div>
                                    <label className="text-xs text-[#71717a] mb-2 block">Base Model</label>
                                    <select value={baseModel} onChange={(e) => setBaseModel(e.target.value)} className="input-field text-sm">
                                        <option>juggernautXL_v8Rundiffusion.safetensors</option>
                                        <option>realisticVisionV60B1_v51VAE.safetensors</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-xs text-[#71717a] mb-2 block">Refiner</label>
                                    <select value={refinerModel} onChange={(e) => setRefinerModel(e.target.value)} className="input-field text-sm">
                                        <option>None</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* LoRA Settings */}
                    <div className="border-t border-[#27272a] pt-4">
                        <button
                            onClick={() => setShowLoras(!showLoras)}
                            className="flex items-center justify-between w-full text-sm text-[#71717a] hover:text-[#a1a1aa] transition-colors mb-3"
                        >
                            <span className="section-title">🔧 LoRAs</span>
                            <svg className={`w-4 h-4 transition-transform ${showLoras ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        {showLoras && (
                            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                                {loras.map((lora, idx) => (
                                    <div key={idx} className="flex items-center gap-2 p-2 bg-[#18181b] rounded-lg border border-[#27272a]">
                                        <input
                                            type="checkbox"
                                            checked={lora.enabled}
                                            onChange={(e) => {
                                                const newLoras = [...loras];
                                                newLoras[idx].enabled = e.target.checked;
                                                setLoras(newLoras);
                                            }}
                                            className="w-4 h-4"
                                        />
                                        <select
                                            value={lora.name}
                                            onChange={(e) => {
                                                const newLoras = [...loras];
                                                newLoras[idx].name = e.target.value;
                                                setLoras(newLoras);
                                            }}
                                            className="input-field text-xs flex-1 py-1"
                                        >
                                            <option>None</option>
                                        </select>
                                        <input
                                            type="number"
                                            value={lora.weight}
                                            onChange={(e) => {
                                                const newLoras = [...loras];
                                                newLoras[idx].weight = Number(e.target.value);
                                                setLoras(newLoras);
                                            }}
                                            className="input-field text-xs w-16 py-1"
                                            step="0.1"
                                            min="-2"
                                            max="2"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Generate Button */}
                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating || !prompt.trim()}
                        className="btn-primary w-full py-3.5 flex items-center justify-center gap-2"
                    >
                        {isGenerating ? (
                            <>
                                <div className="spinner w-4 h-4" />
                                <span>Generating... {progress > 0 ? `${progress}%` : ''}</span>
                            </>
                        ) : (
                            <>
                                <span>Generate</span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </>
                        )}
                    </button>

                    {statusMessage && (
                        <p className="text-xs text-center text-[#71717a]">{statusMessage}</p>
                    )}
                </div>

                {/* Right Column - Preview + Logs */}
                <div className="lg:col-span-3 space-y-4">
                    {/* Preview */}
                    <div className="aspect-[4/3] rounded-xl bg-[#18181b] border border-[#27272a] flex items-center justify-center overflow-hidden relative">
                        {isGenerating ? (
                            <div className="text-center">
                                <div className="spinner spinner-lg mx-auto mb-3" />
                                <p className="text-sm text-[#71717a]">{statusMessage || 'Processing...'}</p>
                                {progress > 0 && (
                                    <div className="w-48 h-1 bg-[#27272a] rounded-full mt-3 mx-auto overflow-hidden">
                                        <div
                                            className="h-full bg-[#fafafa] transition-all duration-300"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                )}
                            </div>
                        ) : generatedImage ? (
                            <>
                                <img src={generatedImage} alt="Generated" className="w-full h-full object-contain" />
                                <div className="absolute bottom-3 right-3 flex gap-2">
                                    <a
                                        href={generatedImage}
                                        download
                                        target="_blank"
                                        className="btn-secondary text-xs px-3 py-2"
                                    >
                                        Download
                                    </a>
                                </div>
                            </>
                        ) : (
                            <div className="text-center px-8">
                                <div className="w-14 h-14 rounded-xl bg-[#27272a] mx-auto mb-3 flex items-center justify-center">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#52525b" strokeWidth="1.5">
                                        <rect x="3" y="3" width="18" height="18" rx="2" />
                                        <circle cx="8.5" cy="8.5" r="1.5" fill="#52525b" />
                                        <path d="M21 15l-5-5L5 21" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <p className="text-sm text-[#52525b]">Your creation will appear here</p>
                            </div>
                        )}
                    </div>

                    {/* Logs Panel */}
                    <div className="bg-[#18181b] border border-[#27272a] rounded-xl overflow-hidden">
                        <button
                            onClick={() => setShowLogs(!showLogs)}
                            className="w-full px-4 py-2.5 flex items-center justify-between text-xs border-b border-[#27272a]"
                        >
                            <span className="section-title">API Logs</span>
                            <div className="flex items-center gap-2">
                                <span className="text-[#52525b]">{logs.length} entries</span>
                                <svg
                                    className={`w-3.5 h-3.5 text-[#52525b] transition-transform ${showLogs ? 'rotate-180' : ''}`}
                                    fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                                >
                                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </button>

                        {showLogs && (
                            <div className="max-h-48 overflow-y-auto p-2 font-mono text-[11px]">
                                {logs.length === 0 ? (
                                    <p className="text-[#52525b] p-2">No logs yet. Generate an image to see API activity.</p>
                                ) : (
                                    logs.map((log) => (
                                        <div key={log.id} className="py-1 px-2 hover:bg-[#27272a]/50 rounded">
                                            <span className="text-[#52525b]">
                                                {log.timestamp.toLocaleTimeString()}
                                            </span>
                                            <span className={`ml-2 ${getLogColor(log.level)}`}>
                                                [{log.level.toUpperCase()}]
                                            </span>
                                            <span className="ml-2 text-[#a1a1aa]">{log.message}</span>
                                            {log.details && (
                                                <span className="ml-1 text-[#52525b]">— {log.details}</span>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
