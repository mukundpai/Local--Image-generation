interface SidebarProps {
    currentView: string;
    onViewChange: (view: 'generate' | 'gallery' | 'history' | 'settings') => void;
    isConnected: boolean;
}

export default function Sidebar({ currentView, onViewChange, isConnected }: SidebarProps) {
    const navItems = [
        {
            id: 'generate', label: 'Create', icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
            )
        },
        {
            id: 'gallery', label: 'Gallery', icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
            )
        },
        {
            id: 'history', label: 'History', icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 3" strokeLinecap="round" />
                </svg>
            )
        },
        {
            id: 'settings', label: 'Settings', icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                </svg>
            )
        },
    ];

    return (
        <aside className="w-56 border-r border-[#27272a] flex flex-col bg-[#09090b]">
            {/* Logo */}
            <div className="p-5 border-b border-[#27272a]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#18181b] border border-[#27272a] flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d4a574" strokeWidth="2">
                            <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-sm font-semibold text-[#fafafa] tracking-tight">Fooocus</h1>
                        <p className="text-[10px] text-[#71717a] tracking-wide uppercase">Studio</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onViewChange(item.id as any)}
                        className={`nav-item ${currentView === item.id ? 'active' : ''}`}
                    >
                        <span className={currentView === item.id ? 'text-[#fafafa]' : 'text-[#71717a]'}>
                            {item.icon}
                        </span>
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>

            {/* Connection Status */}
            <div className="p-4 border-t border-[#27272a]">
                <div className="flex items-center gap-2 text-xs">
                    <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-emerald-500' : 'bg-red-500'}`} />
                    <span className="text-[#71717a]">
                        {isConnected ? 'Connected' : 'Offline'}
                    </span>
                </div>
            </div>
        </aside>
    );
}
