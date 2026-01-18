'use client';

import { useState } from 'react';

interface SettingsViewProps {
    onConnectionTest: () => void;
}

export default function SettingsView({ onConnectionTest }: SettingsViewProps) {
    const [apiUrl, setApiUrl] = useState('http://127.0.0.1:7865');
    const [autoSave, setAutoSave] = useState(true);
    const [notifications, setNotifications] = useState(true);

    return (
        <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-[#fafafa] tracking-tight mb-1">
                    Settings
                </h1>
                <p className="text-sm text-[#71717a]">
                    Configure your preferences
                </p>
            </div>

            <div className="space-y-6">
                {/* Connection */}
                <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-5">
                    <h3 className="section-title mb-4">Connection</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs text-[#71717a] mb-2 block">API Endpoint</label>
                            <input
                                type="text"
                                value={apiUrl}
                                onChange={(e) => setApiUrl(e.target.value)}
                                className="input-field text-sm"
                                placeholder="http://127.0.0.1:7865"
                            />
                        </div>
                        <button onClick={onConnectionTest} className="btn-secondary text-xs">
                            Test Connection
                        </button>
                    </div>
                </div>

                {/* Preferences */}
                <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-5">
                    <h3 className="section-title mb-4">Preferences</h3>
                    <div className="space-y-4">
                        <label className="flex items-center justify-between cursor-pointer group">
                            <span className="text-sm text-[#a1a1aa] group-hover:text-[#fafafa] transition-colors">
                                Auto-save images
                            </span>
                            <div
                                onClick={() => setAutoSave(!autoSave)}
                                className={`w-10 h-6 rounded-full transition-colors cursor-pointer flex items-center px-1 ${autoSave ? 'bg-[#fafafa]' : 'bg-[#27272a]'
                                    }`}
                            >
                                <div className={`w-4 h-4 rounded-full transition-all ${autoSave ? 'bg-[#09090b] translate-x-4' : 'bg-[#52525b] translate-x-0'
                                    }`} />
                            </div>
                        </label>
                        <label className="flex items-center justify-between cursor-pointer group">
                            <span className="text-sm text-[#a1a1aa] group-hover:text-[#fafafa] transition-colors">
                                Show notifications
                            </span>
                            <div
                                onClick={() => setNotifications(!notifications)}
                                className={`w-10 h-6 rounded-full transition-colors cursor-pointer flex items-center px-1 ${notifications ? 'bg-[#fafafa]' : 'bg-[#27272a]'
                                    }`}
                            >
                                <div className={`w-4 h-4 rounded-full transition-all ${notifications ? 'bg-[#09090b] translate-x-4' : 'bg-[#52525b] translate-x-0'
                                    }`} />
                            </div>
                        </label>
                    </div>
                </div>

                {/* Data */}
                <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-5">
                    <h3 className="section-title mb-4">Data</h3>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-[#a1a1aa]">Local storage</p>
                            <p className="text-xs text-[#52525b] mt-0.5">0 images saved</p>
                        </div>
                        <button className="text-xs text-red-400 hover:text-red-300 transition-colors">
                            Clear Data
                        </button>
                    </div>
                </div>

                {/* About */}
                <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-5">
                    <h3 className="section-title mb-4">About</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-sm text-[#71717a]">Version</span>
                            <span className="text-sm text-[#a1a1aa]">1.0.0</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-[#71717a]">Framework</span>
                            <span className="text-sm text-[#a1a1aa]">Next.js 15</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
