import React from 'react';
import { Mic, Github, Twitter, Linkedin, ArrowUpRight } from 'lucide-react';

export const Footer = () => (
  <footer className="relative   px-6 overflow-hidden">
    {/* Subtle Mesh Gradient Background */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-indigo-50/40 via-transparent to-transparent -z-10" />

    <div className="max-w-7xl mx-auto">
      {/* --- TOP SECTION: BRAND & NEWSLETTER --- */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-t border-slate-100 pt-20">
        
        {/* Brand Info */}
        <div className="md:col-span-4 space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <Mic className="text-white w-5 h-5" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900">
              Prepr AI
            </span>
          </div>
          <p className="text-slate-500 font-medium leading-relaxed max-w-sm">
            The voice-native interview simulator designed to turn nervous candidates into confident hires.
          </p>
          <div className="flex gap-4">
            <SocialIcon icon={<Twitter className="w-4 h-4" />} href="#" />
            <SocialIcon icon={<Github className="w-4 h-4" />} href="https://github.com/sahajj11" />
            <SocialIcon icon={<Linkedin className="w-4 h-4" />} href="#" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-2 space-y-6">
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Platform</h4>
          <ul className="space-y-4 text-sm font-semibold text-slate-500">
            <li><a href="#" className="hover:text-indigo-600 transition">Voice Demo</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition">Personas</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition">Analytics</a></li>
          </ul>
        </div>

        <div className="md:col-span-2 space-y-6">
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Company</h4>
          <ul className="space-y-4 text-sm font-semibold text-slate-500">
            <li><a href="#" className="hover:text-indigo-600 transition">About</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition">Privacy</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition">Terms</a></li>
          </ul>
        </div>

        {/* Newsletter / CTA */}
        <div className="md:col-span-4 space-y-6">
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Stay Updated</h4>
          <div className="relative group">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
            />
            <button className="absolute right-2 top-2 bottom-2 bg-slate-900 text-white px-4 rounded-xl text-xs font-bold hover:bg-indigo-600 transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
            * No spam. Just product updates and interview tips.
          </p>
        </div>
      </div>

      {/* --- BOTTOM SECTION: LEGAL & CREDITS --- */}
     
    </div>
  </footer>
);

const SocialIcon = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
  <a 
    href={href} 
    className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-md transition-all duration-300"
  >
    {icon}
  </a>
);