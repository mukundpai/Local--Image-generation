export default function HistoryView() {
    const history: any[] = [];

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-2xl font-semibold text-[#fafafa] tracking-tight mb-1">
                        History
                    </h1>
                    <p className="text-sm text-[#71717a]">
                        Your generation history
                    </p>
                </div>

                {history.length > 0 && (
                    <button className="btn-secondary text-xs">
                        Clear All
                    </button>
                )}
            </div>

            {/* History List */}
            {history.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24">
                    <div className="w-20 h-20 rounded-2xl bg-[#18181b] border border-[#27272a] flex items-center justify-center mb-5">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3f3f46" strokeWidth="1.5">
                            <circle cx="12" cy="12" r="9" />
                            <path d="M12 7v5l3 3" strokeLinecap="round" />
                        </svg>
                    </div>
                    <p className="text-[#52525b] text-sm mb-1">No history yet</p>
                    <p className="text-[#3f3f46] text-xs">Start creating to build your history</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {/* History items would be mapped here */}
                </div>
            )}
        </div>
    );
}
