'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { trpc } from '@/lib/trpc/client';
import { useInfluencer } from '@/components/InfluencerSelector';

interface CreatePostModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export function CreatePostModal({ isOpen, onClose, onSuccess }: CreatePostModalProps) {
    const { currentInfluencer } = useInfluencer();
    const [caption, setCaption] = useState('');
    const [hashtags, setHashtags] = useState('');
    const [scheduledDate, setScheduledDate] = useState('');
    const [scheduledTime, setScheduledTime] = useState('10:00');
    const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

    // Fetch available images
    const { data: availableImages } = trpc.images.getHistory.useQuery({
        influencerId: currentInfluencer?.id || 'sara-influencer-001',
        limit: 12,
    });

    // Schedule post mutation
    const schedulePostMutation = trpc.posts.schedule.useMutation({
        onSuccess: () => {
            onSuccess?.();
            onClose();
            resetForm();
        },
    });

    const resetForm = () => {
        setCaption('');
        setHashtags('');
        setScheduledDate('');
        setScheduledTime('10:00');
        setSelectedImageId(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!scheduledDate || !caption) return;

        const scheduledTime24 = new Date(`${scheduledDate}T${scheduledTime}`);

        schedulePostMutation.mutate({
            influencerId: currentInfluencer?.id || 'sara-influencer-001',
            imageId: selectedImageId || '',
            caption,
            hashtags: hashtags.split(',').map((h) => h.trim()).filter(Boolean),
            scheduledTime: scheduledTime24,
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-zinc-900 border border-white/10 rounded-xl shadow-2xl">
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-zinc-900 border-b border-white/10">
                    <h2 className="text-xl font-bold text-white">Schedule New Post</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Image Selection */}
                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-3">
                            Select Image
                        </label>
                        <div className="grid grid-cols-4 gap-3 max-h-48 overflow-y-auto">
                            {availableImages?.images?.map((image: any) => (
                                <button
                                    key={image.id}
                                    type="button"
                                    onClick={() => setSelectedImageId(image.id)}
                                    className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${selectedImageId === image.id
                                        ? 'border-purple-500 ring-2 ring-purple-500/50'
                                        : 'border-white/10 hover:border-white/30'
                                        }`}
                                >
                                    <img
                                        src={image.imageUrl}
                                        alt={image.prompt?.slice(0, 20)}
                                        className="w-full h-full object-cover"
                                    />
                                    {selectedImageId === image.id && (
                                        <div className="absolute inset-0 bg-purple-500/20 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-white text-2xl">check_circle</span>
                                        </div>
                                    )}
                                </button>
                            )) || (
                                    <p className="col-span-4 text-center text-white/40 py-8">
                                        No images available. Generate some first!
                                    </p>
                                )}
                        </div>
                    </div>

                    {/* Caption */}
                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                            Caption
                        </label>
                        <Textarea
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Write your caption..."
                            className="w-full min-h-[100px] bg-white/5 border-white/10 text-white placeholder:text-white/30"
                        />
                    </div>

                    {/* Hashtags */}
                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                            Hashtags (comma separated)
                        </label>
                        <input
                            type="text"
                            value={hashtags}
                            onChange={(e) => setHashtags(e.target.value)}
                            placeholder="#influencer, #lifestyle, #fashion"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* Schedule Date & Time */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                Date
                            </label>
                            <input
                                type="date"
                                value={scheduledDate}
                                onChange={(e) => setScheduledDate(e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                Time
                            </label>
                            <input
                                type="time"
                                value={scheduledTime}
                                onChange={(e) => setScheduledTime(e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t border-white/10">
                        <Button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={!scheduledDate || !caption || schedulePostMutation.isPending}
                            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
                        >
                            {schedulePostMutation.isPending ? 'Scheduling...' : 'Schedule Post'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreatePostModal;
