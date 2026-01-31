import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col items-center justify-center p-8 font-sans selection:bg-white selection:text-black">
      <div className="max-w-2xl w-full text-center space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
            Fooocus Studio
          </h1>
          <p className="text-lg text-gray-400">
            Next-Gen AI Creative Suite Demos
          </p>
        </div>

        <div className="grid gap-4 w-full text-left">
          {[
            { name: "AI Image Studio", path: "/generate", desc: "Industrial Darkroom Interface", color: "hover:border-[#d9e021] hover:text-[#d9e021] hover:shadow-[0_0_20px_rgba(217,224,33,0.2)]" },
            { name: "Influencer Dashboard", path: "/influencers", desc: "Vintage Synth Manager", color: "hover:border-[#d4c5a9] hover:text-[#d4c5a9] hover:shadow-[0_0_20px_rgba(212,197,169,0.2)]" },
            { name: "LLM Control Center", path: "/prompts", desc: "Cyberpunk Terminal", color: "hover:border-[#d97706] hover:text-[#d97706] hover:shadow-[0_0_20px_rgba(217,119,6,0.2)]" },
            { name: "Asset Gallery", path: "/gallery", desc: "Minimalist Archive", color: "hover:border-white hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]" },
            { name: "Post Scheduler", path: "/scheduler", desc: "Editorial Planner", color: "hover:border-white hover:text-white bg-white text-black hover:bg-gray-200" }
          ].map((item) => (
            <Link key={item.path} href={item.path} className="group">
              <div className={`flex items-center justify-between p-6 border border-white/10 rounded-lg bg-white/5 transition-all duration-300 ${item.color}`}>
                <div>
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mt-1 group-hover:text-current opacity-70 font-mono transition-opacity">{item.desc}</p>
                </div>
                <span className="material-symbols-outlined transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </Link>
          ))}
        </div>

        <footer className="text-xs text-gray-600 font-mono pt-12">
          FOOOCUS_STUDIO // BUILD_V2.0
        </footer>
      </div>
    </div>
  );
}
