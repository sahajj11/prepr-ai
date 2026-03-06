"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"; 
import { Mic } from "lucide-react";
import Link from "next/link";

export const DashboardNavbar = () => (
  <nav className="fixed top-0 w-full z-50 px-6 py-6">
    <div className="max-w-7xl mx-auto">
      <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-3 flex justify-between items-center shadow-sm">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Mic className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-slate-900">Prepr AI</span>
        </Link>

       

        {/* Dynamic Buttons */}
        <div className="flex items-center gap-4">
          <SignedOut>
            {/* Swapped SignInButton for a direct Link to our /login page */}
           
            
            <Link 
              href="/login" 
              className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all"
            >
              Sign In / Sign Up
            </Link>
          </SignedOut>
          <SignedIn>
          
           
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </div>
  </nav>
);

