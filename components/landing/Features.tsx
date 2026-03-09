"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, BarChart3, MessageSquare, Brain, Target, Shield, Sparkles } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

const features = [
  { icon: <Zap className="w-6 h-6 text-amber-500" />, title: "Sub-600ms Latency", desc: "No more awkward pauses. Experience natural, real-time conversation flow." },
  { icon: <BarChart3 className="w-6 h-6 text-indigo-500" />, title: "AI Scorecard", desc: "Detailed breakdown of communication, confidence, and technical depth." },
  { icon: <MessageSquare className="w-6 h-6 text-emerald-500" />, title: "Contextual Follow-ups", desc: "AI recruits like a human, digging deeper into your previous answers." },
  { icon: <Brain className="w-6 h-6 text-pink-500" />, title: "Knowledge Mapping", desc: "The AI identifies your tech stack gaps and suggests what to study." },
  { icon: <Target className="w-6 h-6 text-blue-500" />, title: "Role-Specific Personas", desc: "Switch between SDE, PM, or HR specialized interviewers instantly." },
  { icon: <Shield className="w-6 h-6 text-slate-700" />, title: "Stress-Free Prep", desc: "Build bulletproof confidence in a judgment-free environment." },
];

export const Features = () => {
  // Triple the list to ensure there's never a gap in the slider on any screen size
  const sliderItems = [...features, ...features, ...features];

  return (
    <section id="features" className=" relative overflow-hidden bg-white">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-50/40 via-transparent to-transparent -z-10" />

      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-4">
          <Sparkles className="w-3 h-3" /> System Capabilities
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6 leading-tight">
          Everything you need to <br />
          <span className="text-indigo-600 underline decoration-indigo-100 decoration-8 underline-offset-4">crush the interview.</span>
        </h2>
      </div>

      {/* --- INFINITE MARQUEE SLIDER --- */}
      <div className="flex overflow-hidden select-none group relative py-10">
        {/* Left/Right Fades: Essential for the "Premium" look */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

        <motion.div 
          className="flex gap-6"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{
            ease: "linear",
            duration: 30,
            repeat: Infinity,
          }}
          whileHover={{ animationPlayState: "paused" }} // Pauses on hover
        >
          {sliderItems.map((f, i) => (
            <div key={i} className="w-[350px] md:w-[420px] flex-shrink-0">
              <div className="relative group/card h-full">
                {/* Outer Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-[2.5rem] opacity-0 group-hover/card:opacity-20 transition duration-500 blur-md" />
                
                <GlassCard className="relative p-10 h-full flex flex-col items-start border-white/60 bg-white/40 group-hover/card:bg-white/95 transition-all duration-500 shadow-xl shadow-indigo-100/10">
                  {/* Icon Container */}
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 group-hover/card:scale-110 group-hover/card:bg-indigo-600 transition-all duration-300">
                    <div className="group-hover/card:text-white transition-colors duration-300">
                      {f.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover/card:text-indigo-600 transition-colors">
                    {f.title}
                  </h3>
                  
                  <p className="text-slate-500 font-medium leading-relaxed text-lg">
                    {f.desc}
                  </p>

                  <div className="mt-8 flex items-center text-xs font-black text-indigo-400 tracking-widest opacity-0 group-hover/card:opacity-100 transition-all transform translate-y-2 group-hover/card:translate-y-0">
                    ANALYSIS MODULE ACTIVE <div className="ml-3 w-8 h-px bg-indigo-600" />
                  </div>
                </GlassCard>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Stats Bar for Social Proof */}
     
    </section>
  );
};

