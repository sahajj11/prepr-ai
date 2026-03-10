import { SignIn } from "@clerk/nextjs";
import { ArrowLeft, Mic } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white relative overflow-hidden">

        {/* --- BACK BUTTON (Top Left) --- */}
      <div className="absolute top-8 left-8 z-20">
        <Link
          href="/" 
          className="group flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-50 transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </div>
      
      {/* Background Decorative Gradients - Matching Landing Page */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-indigo-50/50 to-transparent -z-10" />
      <div className="absolute top-[10%] right-[-10%] w-[400px] h-[400px] bg-blue-50 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-[20%] left-[-5%] w-[300px] h-[300px] bg-indigo-50 blur-[100px] rounded-full -z-10" />

      {/* Brand Header */}
      <div className="mb-8 flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-200">
          <Mic className="text-white w-6 h-6" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Prepr AI</h1>
          <p className="text-sm text-slate-500 font-medium">Elevate your interview game.</p>
        </div>
      </div>
      
      {/* Clerk SignIn Component with Custom Theming */}
      <div className="relative group shadow-2xl shadow-indigo-100/50 rounded-3xl">
         {/* Subtle Glow behind the card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-[2rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
        
        <SignIn 
          appearance={{
            elements: {
              card: "bg-white/80 backdrop-blur-xl border border-white/50 shadow-none rounded-3xl",
              headerTitle: "text-slate-900 font-bold",
              headerSubtitle: "text-slate-500",
              socialButtonsBlockButton: "bg-white border-slate-200 hover:bg-slate-50 transition-all rounded-xl",
              socialButtonsBlockButtonText: "text-slate-600 font-semibold",
              formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-sm normal-case rounded-xl shadow-lg shadow-indigo-100",
              footerAction: "hidden", 
              formFieldInput: "rounded-xl border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500",
              formFieldLabel: "text-slate-700 font-semibold"
            },
            variables: {
              colorPrimary: '#4f46e5', // Indigo-600
            }
          }}
        />
      </div>

    
     
    </div>
  );
}