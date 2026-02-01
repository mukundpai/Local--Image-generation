'use client';

import { trpc } from '@/lib/trpc/client';
import { useState } from 'react';

interface ImageHistoryPanelProps {
    influencerId: string;
    onSelectImage?: (imageUrl: string, prompt: string, seed: bigint) => void;
}

export function ImageHistoryPanel({ influencerId, onSelectImage }: ImageHistoryPanelProps) {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const { data, fetchNextPage, hasNextPage, isLoading, refetch } = trpc.images.getHistory.useInfiniteQuery(
        { influencerId, limit: 20 },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        }
    );

    const deleteMutation = trpc.images.delete.useMutation({
        onSuccess: () => {
            refetch();
        },
    });

    const handleImageClick = (image: any) => {
        setSelectedId(image.id);
        if (onSelectImage) {
            onSelectImage(image.imageUrl, image.prompt, image.seed);
        }
    };

    const handleDelete = (e: React.MouseEvent, imageId: string) => {
        e.stopPropagation();
        if (confirm('Delete this image?')) {
            deleteMutation.mutate({ id: imageId });
        }
    };

    const allImages = data?.pages.flatMap((page) => page.images) || [];

    if (isLoading) {
        return (
            <div className="h-24 border-t border-border-dark bg-background-dark flex items-center justify-center">
                <span className="text-text-secondary text-xs font-mono uppercase">Loading history...</span>
            </div>
        );
    }

    return (
        <div className="h-24 border-t border-border-dark bg-background-dark flex items-center px-4 gap-4 overflow-x-auto shrink-0 custom-scrollbar z-20 relative">
            <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-background-dark to-transparent pointer-events-none z-10"></div>

            {allImages.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                    <span className="text-text-secondary text-xs font-mono uppercase">No images yet - start generating!</span>
                </div>
            ) : (
                <>
                    {allImages.map((image) => (
                        <div
                            key={image.id}
                            className={`relative h-16 w-16 border ${selectedId === image.id ? 'border-white' : 'border-border-dark hover:border-white'
                                } bg-cover bg-center cursor-pointer opacity-50 hover:opacity-100 grayscale hover:grayscale-0 transition-all shrink-0 group`}
                            style={{ backgroundImage: `url('${image.imageUrl}')` }}
                            onClick={() => handleImageClick(image)}
                            title={image.prompt.slice(0, 100)}
                        >
                            {image.status === 'GENERATING' && (
                                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-white text-sm animate-spin">progress_activity</span>
                                </div>
                            )}
                            {image.status === 'FAILED' && (
                                <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-red-500 text-sm">error</span>
                                </div>
                            )}
                            <button
                                onClick={(e) => handleDelete(e, image.id)}
                                className="absolute top-0 right-0 bg-black/80 text-white p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <span className="material-symbols-outlined text-xs">close</span>
                            </button>
                        </div>
                    ))}

                    {hasNextPage && (
                        <button
                            onClick={() => fetchNextPage()}
                            className="h-16 w-16 border border-dashed border-border-dark flex items-center justify-center hover:bg-surface-dark cursor-pointer text-text-secondary hover:text-white shrink-0"
                        >
                            <span className="material-symbols-outlined text-lg">more_horiz</span>
                        </button>
                    )}
                </>
            )}
        </div>
    );
}
