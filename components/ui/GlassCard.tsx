import { ReactNode } from 'react';

export const GlassCard = ({ children, className = "" }: { children: ReactNode, className?: string }) => (
  <div className={`
    bg-white/40 backdrop-blur-xl 
    border border-white/50 
    shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] 
    rounded-3xl ${className}
  `}>
    {children}
  </div>
);