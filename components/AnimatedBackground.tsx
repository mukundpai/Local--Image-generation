export default function AnimatedBackground() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-grid opacity-30" />

            {/* Very subtle gradient orbs */}
            <div
                className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full animate-float"
                style={{
                    background: 'radial-gradient(circle, rgba(212,165,116,0.03) 0%, transparent 70%)',
                    animationDelay: '0s'
                }}
            />
            <div
                className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full animate-float"
                style={{
                    background: 'radial-gradient(circle, rgba(161,161,170,0.02) 0%, transparent 70%)',
                    animationDelay: '4s'
                }}
            />
        </div>
    );
}
