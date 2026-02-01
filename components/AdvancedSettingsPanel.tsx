'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';

export interface AdvancedSettings {
    // Performance & Quality
    performance: 'Speed' | 'Quality' | 'Extreme Speed';
    aspectRatio: string;
    imageNumber: number;
    outputFormat: 'png' | 'jpg' | 'webp';
    seed: number | null;
    sharpness: number;
    guidanceScale: number;

    // Model Settings
    baseModel: string;
    refinerModel: string;
    refinerSwitch: number;

    // LoRA Settings
    loras: Array<{
        enabled: boolean;
        model: string;
        weight: number;
    }>;

    // Sampler Settings
    sampler: string;
    scheduler: string;
    clipSkip: number;

    // Advanced
    adaptiveCfg: number;
    admScalerPositive: number;
    admScalerNegative: number;
    admScalerEnd: number;

    // FreeU
    freeuEnabled: boolean;
    freeuB1: number;
    freeuB2: number;
    freeuS1: number;
    freeuS2: number;

    // ControlNet
    controlnetSoftness: number;
}

export const DEFAULT_SETTINGS: AdvancedSettings = {
    performance: 'Speed',
    aspectRatio: '1152×896',
    imageNumber: 1,
    outputFormat: 'png',
    seed: null,
    sharpness: 2.0,
    guidanceScale: 4.0,

    baseModel: 'juggernautXL_v8Rundiffusion.safetensors',
    refinerModel: 'None',
    refinerSwitch: 0.5,

    loras: [
        { enabled: false, model: 'None', weight: 1.0 },
        { enabled: false, model: 'None', weight: 1.0 },
        { enabled: false, model: 'None', weight: 1.0 },
        { enabled: false, model: 'None', weight: 1.0 },
        { enabled: false, model: 'None', weight: 1.0 },
    ],

    sampler: 'dpmpp_2m_sde_gpu',
    scheduler: 'karras',
    clipSkip: 2,

    adaptiveCfg: 7.0,
    admScalerPositive: 1.5,
    admScalerNegative: 0.8,
    admScalerEnd: 0.3,

    freeuEnabled: false,
    freeuB1: 1.01,
    freeuB2: 1.02,
    freeuS1: 0.99,
    freeuS2: 0.95,

    controlnetSoftness: 0.25,
};

// Available options from Fooocus
export const ASPECT_RATIOS = [
    '704×1408', '704×1344', '768×1344', '768×1280', '832×1216', '832×1152',
    '896×1152', '896×1088', '960×1088', '960×1024', '1024×1024', '1024×960',
    '1088×960', '1088×896', '1152×896', '1152×832', '1216×832', '1280×768',
    '1344×768', '1344×704', '1408×704', '1472×704', '1536×640', '1600×640',
    '1664×576', '1728×576',
];

export const PERFORMANCE_MODES = ['Speed', 'Quality', 'Extreme Speed'];

export const SAMPLERS = [
    'euler', 'euler_ancestral', 'heun', 'heunpp2', 'dpm_2', 'dpm_2_ancestral',
    'lms', 'dpm_fast', 'dpm_adaptive', 'dpmpp_2s_ancestral', 'dpmpp_sde',
    'dpmpp_sde_gpu', 'dpmpp_2m', 'dpmpp_2m_sde', 'dpmpp_2m_sde_gpu', 'dpmpp_3m_sde',
    'dpmpp_3m_sde_gpu', 'ddpm', 'lcm', 'uni_pc', 'uni_pc_bh2',
];

export const SCHEDULERS = [
    'normal', 'karras', 'exponential', 'sgm_uniform', 'simple', 'ddim_uniform',
    'lcm', 'turbo',
];

export const BASE_MODELS = [
    'juggernautXL_v8Rundiffusion.safetensors',
    'juggernautXL_version6Rundiffusion.safetensors',
    'RealVisXL_V4.0.safetensors',
    'dreamshaperXL_v21TurboDPMSDE.safetensors',
    'realisticStockPhoto_v20.safetensors',
    'None',
];

export const LORA_MODELS = [
    'None',
    'sd_xl_offset_example-lora_1.0.safetensors',
    'SDXL_FILM_PHOTOGRAPHY_STYLE_BetaV0.4.safetensors',
    'add_detail.safetensors',
];

interface AdvancedSettingsPanelProps {
    settings: AdvancedSettings;
    onSettingsChange: (settings: AdvancedSettings) => void;
    isOpen: boolean;
    onToggle: () => void;
}

export function AdvancedSettingsPanel({
    settings,
    onSettingsChange,
    isOpen,
    onToggle,
}: AdvancedSettingsPanelProps) {
    const [activeTab, setActiveTab] = useState<'basic' | 'model' | 'sampler' | 'advanced'>('basic');

    const updateSetting = <K extends keyof AdvancedSettings>(
        key: K,
        value: AdvancedSettings[K]
    ) => {
        onSettingsChange({ ...settings, [key]: value });
    };

    const updateLora = (index: number, field: keyof AdvancedSettings['loras'][0], value: any) => {
        const newLoras = [...settings.loras];
        newLoras[index] = { ...newLoras[index], [field]: value };
        onSettingsChange({ ...settings, loras: newLoras });
    };

    if (!isOpen) {
        return (
            <button
                onClick={onToggle}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white"
            >
                <span className="material-symbols-outlined text-sm">tune</span>
                <span className="text-sm">Advanced Settings</span>
                <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>
        );
    }

    return (
        <div className="bg-zinc-900 border border-white/10 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-white/60">tune</span>
                    <span className="text-sm font-medium text-white">Advanced Settings</span>
                </div>
                <button
                    onClick={onToggle}
                    className="p-1 text-white/60 hover:text-white hover:bg-white/10 rounded transition-colors"
                >
                    <span className="material-symbols-outlined text-sm">expand_less</span>
                </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10">
                {[
                    { id: 'basic', label: 'Basic', icon: 'image' },
                    { id: 'model', label: 'Models', icon: 'model_training' },
                    { id: 'sampler', label: 'Sampler', icon: 'blur_on' },
                    { id: 'advanced', label: 'Advanced', icon: 'settings' },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-xs transition-colors ${activeTab === tab.id
                                ? 'bg-white/10 text-white border-b-2 border-purple-500'
                                : 'text-white/60 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <span className="material-symbols-outlined text-sm">{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
                {activeTab === 'basic' && (
                    <>
                        {/* Performance */}
                        <div>
                            <label className="block text-xs text-white/60 mb-2">Performance Mode</label>
                            <div className="flex gap-2">
                                {PERFORMANCE_MODES.map((mode) => (
                                    <button
                                        key={mode}
                                        onClick={() => updateSetting('performance', mode as any)}
                                        className={`flex-1 px-3 py-2 text-xs rounded-lg border transition-colors ${settings.performance === mode
                                                ? 'bg-purple-500/20 border-purple-500 text-purple-400'
                                                : 'border-white/10 text-white/60 hover:border-white/20'
                                            }`}
                                    >
                                        {mode}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Aspect Ratio */}
                        <div>
                            <label className="block text-xs text-white/60 mb-2">Aspect Ratio</label>
                            <select
                                value={settings.aspectRatio}
                                onChange={(e) => updateSetting('aspectRatio', e.target.value)}
                                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                {ASPECT_RATIOS.map((ratio) => (
                                    <option key={ratio} value={ratio}>{ratio}</option>
                                ))}
                            </select>
                        </div>

                        {/* Image Number */}
                        <div>
                            <label className="block text-xs text-white/60 mb-2">Number of Images: {settings.imageNumber}</label>
                            <input
                                type="range"
                                min="1"
                                max="8"
                                value={settings.imageNumber}
                                onChange={(e) => updateSetting('imageNumber', parseInt(e.target.value))}
                                className="w-full accent-purple-500"
                            />
                        </div>

                        {/* Seed */}
                        <div>
                            <label className="block text-xs text-white/60 mb-2">Seed (-1 for random)</label>
                            <input
                                type="number"
                                value={settings.seed ?? -1}
                                onChange={(e) => updateSetting('seed', e.target.value === '-1' ? null : parseInt(e.target.value))}
                                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        {/* Sharpness & Guidance */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-white/60 mb-2">Sharpness: {settings.sharpness.toFixed(1)}</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    value={settings.sharpness}
                                    onChange={(e) => updateSetting('sharpness', parseFloat(e.target.value))}
                                    className="w-full accent-purple-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-white/60 mb-2">Guidance Scale: {settings.guidanceScale.toFixed(1)}</label>
                                <input
                                    type="range"
                                    min="1"
                                    max="30"
                                    step="0.5"
                                    value={settings.guidanceScale}
                                    onChange={(e) => updateSetting('guidanceScale', parseFloat(e.target.value))}
                                    className="w-full accent-purple-500"
                                />
                            </div>
                        </div>

                        {/* Output Format */}
                        <div>
                            <label className="block text-xs text-white/60 mb-2">Output Format</label>
                            <div className="flex gap-2">
                                {['png', 'jpg', 'webp'].map((format) => (
                                    <button
                                        key={format}
                                        onClick={() => updateSetting('outputFormat', format as any)}
                                        className={`flex-1 px-3 py-2 text-xs rounded-lg border transition-colors uppercase ${settings.outputFormat === format
                                                ? 'bg-purple-500/20 border-purple-500 text-purple-400'
                                                : 'border-white/10 text-white/60 hover:border-white/20'
                                            }`}
                                    >
                                        {format}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'model' && (
                    <>
                        {/* Base Model */}
                        <div>
                            <label className="block text-xs text-white/60 mb-2">Base Model</label>
                            <select
                                value={settings.baseModel}
                                onChange={(e) => updateSetting('baseModel', e.target.value)}
                                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                {BASE_MODELS.map((model) => (
                                    <option key={model} value={model}>{model.replace('.safetensors', '')}</option>
                                ))}
                            </select>
                        </div>

                        {/* Refiner */}
                        <div>
                            <label className="block text-xs text-white/60 mb-2">Refiner Model</label>
                            <select
                                value={settings.refinerModel}
                                onChange={(e) => updateSetting('refinerModel', e.target.value)}
                                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="None">None</option>
                                {BASE_MODELS.filter((m) => m !== 'None').map((model) => (
                                    <option key={model} value={model}>{model.replace('.safetensors', '')}</option>
                                ))}
                            </select>
                        </div>

                        {settings.refinerModel !== 'None' && (
                            <div>
                                <label className="block text-xs text-white/60 mb-2">Refiner Switch: {settings.refinerSwitch.toFixed(2)}</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.05"
                                    value={settings.refinerSwitch}
                                    onChange={(e) => updateSetting('refinerSwitch', parseFloat(e.target.value))}
                                    className="w-full accent-purple-500"
                                />
                            </div>
                        )}

                        {/* LoRAs */}
                        <div className="border-t border-white/10 pt-4">
                            <label className="block text-xs text-white/60 mb-3">LoRA Models</label>
                            <div className="space-y-3">
                                {settings.loras.map((lora, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={lora.enabled}
                                            onChange={(e) => updateLora(i, 'enabled', e.target.checked)}
                                            className="accent-purple-500"
                                        />
                                        <select
                                            value={lora.model}
                                            onChange={(e) => updateLora(i, 'model', e.target.value)}
                                            disabled={!lora.enabled}
                                            className="flex-1 px-2 py-1.5 bg-white/5 border border-white/10 rounded text-white text-xs focus:outline-none disabled:opacity-50"
                                        >
                                            {LORA_MODELS.map((model) => (
                                                <option key={model} value={model}>{model.replace('.safetensors', '')}</option>
                                            ))}
                                        </select>
                                        <input
                                            type="number"
                                            value={lora.weight}
                                            onChange={(e) => updateLora(i, 'weight', parseFloat(e.target.value) || 1)}
                                            disabled={!lora.enabled}
                                            min="-2"
                                            max="2"
                                            step="0.1"
                                            className="w-16 px-2 py-1.5 bg-white/5 border border-white/10 rounded text-white text-xs focus:outline-none disabled:opacity-50"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'sampler' && (
                    <>
                        {/* Sampler */}
                        <div>
                            <label className="block text-xs text-white/60 mb-2">Sampler</label>
                            <select
                                value={settings.sampler}
                                onChange={(e) => updateSetting('sampler', e.target.value)}
                                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                {SAMPLERS.map((sampler) => (
                                    <option key={sampler} value={sampler}>{sampler}</option>
                                ))}
                            </select>
                        </div>

                        {/* Scheduler */}
                        <div>
                            <label className="block text-xs text-white/60 mb-2">Scheduler</label>
                            <select
                                value={settings.scheduler}
                                onChange={(e) => updateSetting('scheduler', e.target.value)}
                                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                {SCHEDULERS.map((scheduler) => (
                                    <option key={scheduler} value={scheduler}>{scheduler}</option>
                                ))}
                            </select>
                        </div>

                        {/* CLIP Skip */}
                        <div>
                            <label className="block text-xs text-white/60 mb-2">CLIP Skip: {settings.clipSkip}</label>
                            <input
                                type="range"
                                min="1"
                                max="12"
                                value={settings.clipSkip}
                                onChange={(e) => updateSetting('clipSkip', parseInt(e.target.value))}
                                className="w-full accent-purple-500"
                            />
                        </div>
                    </>
                )}

                {activeTab === 'advanced' && (
                    <>
                        {/* Adaptive CFG */}
                        <div>
                            <label className="block text-xs text-white/60 mb-2">Adaptive CFG: {settings.adaptiveCfg.toFixed(1)}</label>
                            <input
                                type="range"
                                min="1"
                                max="30"
                                step="0.5"
                                value={settings.adaptiveCfg}
                                onChange={(e) => updateSetting('adaptiveCfg', parseFloat(e.target.value))}
                                className="w-full accent-purple-500"
                            />
                        </div>

                        {/* ADM Scalers */}
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <label className="block text-xs text-white/60 mb-2">ADM Pos: {settings.admScalerPositive.toFixed(1)}</label>
                                <input
                                    type="range"
                                    min="0.1"
                                    max="3"
                                    step="0.1"
                                    value={settings.admScalerPositive}
                                    onChange={(e) => updateSetting('admScalerPositive', parseFloat(e.target.value))}
                                    className="w-full accent-purple-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-white/60 mb-2">ADM Neg: {settings.admScalerNegative.toFixed(1)}</label>
                                <input
                                    type="range"
                                    min="0.1"
                                    max="3"
                                    step="0.1"
                                    value={settings.admScalerNegative}
                                    onChange={(e) => updateSetting('admScalerNegative', parseFloat(e.target.value))}
                                    className="w-full accent-purple-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-white/60 mb-2">ADM End: {settings.admScalerEnd.toFixed(1)}</label>
                                <input
                                    type="range"
                                    min="0.1"
                                    max="1"
                                    step="0.1"
                                    value={settings.admScalerEnd}
                                    onChange={(e) => updateSetting('admScalerEnd', parseFloat(e.target.value))}
                                    className="w-full accent-purple-500"
                                />
                            </div>
                        </div>

                        {/* FreeU */}
                        <div className="border-t border-white/10 pt-4">
                            <div className="flex items-center justify-between mb-3">
                                <label className="text-xs text-white/60">FreeU</label>
                                <input
                                    type="checkbox"
                                    checked={settings.freeuEnabled}
                                    onChange={(e) => updateSetting('freeuEnabled', e.target.checked)}
                                    className="accent-purple-500"
                                />
                            </div>
                            {settings.freeuEnabled && (
                                <div className="grid grid-cols-4 gap-2">
                                    {[
                                        { key: 'freeuB1', label: 'B1', value: settings.freeuB1 },
                                        { key: 'freeuB2', label: 'B2', value: settings.freeuB2 },
                                        { key: 'freeuS1', label: 'S1', value: settings.freeuS1 },
                                        { key: 'freeuS2', label: 'S2', value: settings.freeuS2 },
                                    ].map((item) => (
                                        <div key={item.key}>
                                            <label className="block text-xs text-white/40 mb-1">{item.label}</label>
                                            <input
                                                type="number"
                                                value={item.value}
                                                onChange={(e) => updateSetting(item.key as any, parseFloat(e.target.value))}
                                                step="0.01"
                                                className="w-full px-2 py-1 bg-white/5 border border-white/10 rounded text-white text-xs"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* ControlNet Softness */}
                        <div className="border-t border-white/10 pt-4">
                            <label className="block text-xs text-white/60 mb-2">ControlNet Softness: {settings.controlnetSoftness.toFixed(2)}</label>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.05"
                                value={settings.controlnetSoftness}
                                onChange={(e) => updateSetting('controlnetSoftness', parseFloat(e.target.value))}
                                className="w-full accent-purple-500"
                            />
                        </div>
                    </>
                )}
            </div>

            {/* Reset Button */}
            <div className="px-4 py-3 border-t border-white/10 bg-white/5">
                <Button
                    onClick={() => onSettingsChange(DEFAULT_SETTINGS)}
                    className="w-full bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10 text-xs"
                >
                    Reset to Defaults
                </Button>
            </div>
        </div>
    );
}

export default AdvancedSettingsPanel;
