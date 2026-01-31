import React from 'react';
import { Button } from '@/components/ui/Button';

export default function GalleryPage() {
    return (
        <div className="bg-gallery-bg text-gallery-text font-sans min-h-screen flex flex-col selection:bg-white selection:text-black">

            {/* Header */}
            <header className="sticky top-0 z-40 bg-gallery-bg/90 backdrop-blur-md border-b border-white/5 px-8 py-6">
                <div className="flex justify-between items-center max-w-[1600px] mx-auto w-full">
                    <div className="flex items-center gap-12">
                        <h1 className="text-2xl font-serif italic font-light tracking-wide text-white">Archives.</h1>
                        <nav className="hidden md:flex items-center gap-8">
                            {['Curated Selections', 'Recent Bundles', 'Favorites'].map((item, i) => (
                                <a key={item} href="#" className={`text-[10px] uppercase tracking-widest hover:text-white transition-colors pb-1 border-b border-transparent hover:border-white ${i === 0 ? 'text-white border-white' : 'text-gallery-secondary'}`}>
                                    {item}
                                </a>
                            ))}
                        </nav>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-2 border-b border-gallery-secondary/30 pb-1">
                            <span className="material-symbols-outlined text-gallery-secondary text-lg">search</span>
                            <input className="bg-transparent border-none outline-none text-xs w-48 text-white placeholder:text-gallery-secondary" placeholder="Search collections..." />
                        </div>
                        <div className="size-8 rounded-full bg-white text-black flex items-center justify-center font-serif italic border border-white/20">A</div>
                    </div>
                </div>
            </header>

            {/* Filters (Horizontal Bar) */}
            <div className="border-b border-white/5 py-4 px-8 overflow-x-auto">
                <div className="max-w-[1600px] mx-auto w-full flex items-center gap-4 min-w-max">
                    <span className="text-[10px] uppercase tracking-widest text-gallery-secondary mr-4 border-r border-white/10 pr-4 h-4 flex items-center">Filter By</span>
                    {['Editorial', 'Street Style', 'Cyberpunk', 'Minimalism', 'Portraiture', 'Nature'].map(tag => (
                        <button key={tag} className="px-3 py-1 rounded-full border border-white/5 bg-white/5 hover:bg-white hover:text-black text-[10px] uppercase tracking-widest transition-all text-gallery-secondary">
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            <main className="flex-1 p-8">
                <div className="max-w-[1600px] mx-auto w-full">

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[
                            { title: 'Neon Nights', count: 12, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiO3S_3T0Z-6bT-R_M0a4bXn0VAgq-N7F3uS3dG9X5w0l2_VqH4yT6nB8jK1aD7mC5pL9rF9vW8xU4zE_tYQ1sO0kH3lA7_V6bJ5nC2yR4dM9pW8zS7tF6uG3vH1X0_aK5qB4nL9mD2rE8sJ7cT6oP5vU4_w', tags: ['Cyberpunk', 'Urban'] },
                            { title: 'Morning Coffee', count: 8, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0jW2qX8d7L9V3pT4kH6mS1nB8vF0_c2gL5hY9zQ3xW7rU6oO2lM5kI1vE9nJ4d8pB3qA7sT0cW1xV5_zH6jK9mN4lB8qD2vS7oT6pW0yX9rU3kL4nO2vJ6wT5_yQ8sA4mC9lH1pG3vF8zE7jK4nL9_w', tags: ['Lifestyle', 'Cafe'] },
                            { title: 'Desert Mirage', count: 15, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqH2vK9_n5W7rT4mS8pL1oV6xU0yB3wF5zG9lH4kQ2jC8vD7nS1mX9oI6wE5tJ4vK8_pL3nB7mC0yR4dM9pW8zS7tF6uG3vH1X0_aK5qB4nL9mD2rE8sJ7cT6oP5vU4_w', tags: ['Nature', 'Abstract'] },
                            { title: 'Tokyo Drift', count: 24, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCj8nK4_mV7pW9sS2lT5oR1qU6yV0xB3wF5zG9lH4kQ2jC8vD7nS1mX9oI6wE5tJ4vK8_pL3nB7mC0yR4dM9pW8zS7tF6uG3vH1X0_aK5qB4nL9mD2rE8sJ7cT6oP5vU4_w', tags: ['Automotive', 'Neon'] },
                            { title: 'Minimalist Home', count: 6, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBj9wK4_nV7pW9sS2lT5oR1qU6yV0xB3wF5zG9lH4kQ2jC8vD7nS1mX9oI6wE5tJ4vK8_pL3nB7mC0yR4dM9pW8zS7tF6uG3vH1X0_aK5qB4nL9mD2rE8sJ7cT6oP5vU4_w', tags: ['Interior', 'Clean'] },
                            { title: 'Abstract Forms', count: 18, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDi2vK9_n5W7rT4mS8pL1oV6xU0yB3wF5zG9lH4kQ2jC8vD7nS1mX9oI6wE5tJ4vK8_pL3nB7mC0yR4dM9pW8zS7tF6uG3vH1X0_aK5qB4nL9mD2rE8sJ7cT6oP5vU4_w', tags: ['Art', '3D'] },
                            { title: 'Vintage Portrait', count: 9, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqH2vK9_n5W7rT4mS8pL1oV6xU0yB3wF5zG9lH4kQ2jC8vD7nS1mX9oI6wE5tJ4vK8_pL3nB7mC0yR4dM9pW8zS7tF6uG3vH1X0_aK5qB4nL9mD2rE8sJ7cT6oP5vU4_w', tags: ['Portrait', 'Retro'] },
                            { title: 'Cyber City', count: 32, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk8wK4_nV7pW9sS2lT5oR1qU6yV0xB3wF5zG9lH4kQ2jC8vD7nS1mX9oI6wE5tJ4vK8_pL3nB7mC0yR4dM9pW8zS7tF6uG3vH1X0_aK5qB4nL9mD2rE8sJ7cT6oP5vU4_w', tags: ['Sci-Fi', 'City'] },
                        ].map((item, i) => (
                            <div key={i} className="group relative aspect-[4/5] overflow-hidden bg-gallery-card cursor-pointer">
                                <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${item.img}')` }}></div>
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>

                                {/* Overlay Content */}
                                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-100 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/80 via-transparent to-transparent">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <h3 className="text-white text-xl font-serif italic mb-1">{item.title}</h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gallery-secondary text-[10px] uppercase tracking-widest">{item.count} Assets</span>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                                <button className="size-8 flex items-center justify-center rounded-full bg-white text-black hover:bg-gray-200"><span className="material-symbols-outlined text-sm">arrow_outward</span></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-20">
                        <Button variant="gallery" className="bg-transparent border border-white/20 text-white hover:bg-white hover:text-black hover:border-white h-12 px-8">Load More Archives</Button>
                    </div>
                </div>
            </main>

            <footer className="border-t border-white/5 py-12 px-8 mt-auto bg-gallery-bg">
                <div className="max-w-[1600px] mx-auto flex justify-between items-center text-gallery-secondary">
                    <span className="text-[10px] uppercase tracking-widest">© 2024 Fooocus Studio</span>
                    <div className="flex gap-6">
                        {['Terms', 'Privacy', 'Help'].map(item => <a key={item} href="#" className="text-[10px] uppercase tracking-widest hover:text-white transition-colors">{item}</a>)}
                    </div>
                </div>
            </footer>
        </div>
    );
}
