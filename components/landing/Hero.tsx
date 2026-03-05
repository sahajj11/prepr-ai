import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

export const Hero = () => (
  <section className="relative pt-32 pb-20 px-6 overflow-hidden">
    {/* --- BACKGROUND ORBS --- */}
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-[120px] -z-10 animate-pulse" />
    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-100/20 rounded-full blur-[120px] -z-10" />

    <div className="max-w-6xl mx-auto text-center relative">
      
      {/* 1. THE BADGE */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 border border-indigo-100 backdrop-blur-md shadow-sm mb-10 hover:border-indigo-200 transition-colors cursor-default group">
        <Sparkles className="w-4 h-4 text-indigo-600 animate-spin-slow" />
        <span className="text-sm font-semibold text-slate-700">New: Vapi AI v2 Integration</span>
        <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping ml-1" />
      </div>

      {/* 2. ENHANCED TYPOGRAPHY */}
      <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-slate-900 mb-8 leading-[0.9]">
        Speak. Prep. <br />
        <span className="bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
          Get Hired.
        </span>
      </h1>

      <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
        Stop practicing in the mirror. Talk to Prepr AI and get real-time feedback on your technical and communication skills.
      </p>
      
      {/* 3. BUTTONS WITH DEPTH */}
      <div className="flex flex-col sm:flex-row justify-center gap-5 mb-24">
        <button className="group relative bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-slate-200">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative z-10">Start Mock Call</span>
          <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        
        <button className="group bg-white/80 backdrop-blur-md border border-slate-200 text-slate-900 px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-white hover:border-indigo-200 transition-all shadow-sm">
          <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
            <Play className="w-3 h-3 fill-indigo-600 text-indigo-600" />
          </div>
          View Demo
        </button>
      </div>

      {/* 4. THE VISUALIZER UPGRADE */}
      
    </div>
  </section>
);