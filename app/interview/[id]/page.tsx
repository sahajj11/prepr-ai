/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; 
import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Vapi from "@vapi-ai/web";
import { supabase } from "../../../services/supabaseClient";
import { 
  Mic, MicOff, ChevronLeft, Loader2, User, 
  Sparkles, ShieldCheck, Waves, Info 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function InterviewRoom() {
  const { id } = useParams();
  const router = useRouter();
  const vapiRef = useRef<any>(null);

  const [candidate, setCandidate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isCalling, setIsCalling] = useState(false);
  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
    if (publicKey && !vapiRef.current) {
      vapiRef.current = new Vapi(publicKey);
    }

    const fetchCandidate = async () => {
      try {
        const { data, error } = await supabase
          .from("interviews")
          .select("*")
          .eq("id", id)
          .single();
        if (error) throw error;
        if (data) setCandidate(data);
      } catch (err) {
        console.error("Error fetching candidate:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();

    const vapi = vapiRef.current;
    if (vapi) {
      vapi.on("call-start", () => setIsCalling(true));
      vapi.on("call-end", () => setIsCalling(false));
      vapi.on("speech-start", () => setAssistantIsSpeaking(true));
      vapi.on("speech-end", () => setAssistantIsSpeaking(false));
    }

    return () => {
      if (vapi) vapi.removeAllListeners();
    };
  }, [id]);

  const handleCall = () => {
    const vapi = vapiRef.current;
    const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;

    if (!vapi || !candidate) return;

    if (isCalling) {
      vapi.stop();
    } else {
      vapi.start(assistantId, {
        variableValues: {
          id: String(id),
          candidate_name: String(candidate?.candidate_name || "Candidate"),
          candidate_role: String(candidate?.candidate_role || "Applicant"),
          resume_text: String(candidate?.resume_text || "No resume provided"),
        },
      });
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-indigo-600 size-12" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Initializing Secure Line</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 relative overflow-hidden">
      {/* Background Polish */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-50/50 via-transparent to-transparent -z-10" />

      <div className="max-w-6xl mx-auto p-6 lg:p-12">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-12">
          <button 
            onClick={() => router.back()} 
            className="group flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-red-500 transition-all"
          >
            <div className="p-2 bg-white rounded-xl border border-slate-200 group-hover:border-red-100 group-hover:bg-red-50 shadow-sm transition-all">
               <ChevronLeft className="size-4" />
            </div>
            Abort Session
          </button>

          <div className="flex items-center gap-3">
             <Badge className="bg-white text-slate-600 border border-slate-200 px-4 py-1.5 rounded-full shadow-sm flex gap-2 items-center">
                <ShieldCheck className="size-3 text-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-widest">Encrypted</span>
             </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* --- LEFT: CANDIDATE DOSSIER (4 Cols) --- */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="bg-white border-slate-200/60 shadow-xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden">
              <CardContent className="pt-10 pb-8 flex flex-col items-center text-center">
                <div className="size-24 rounded-[2rem] bg-gradient-to-br from-slate-100 to-slate-50 border-2 border-white shadow-inner flex items-center justify-center mb-6 relative">
                  <User className="text-slate-400 size-10" />
                  <div className="absolute -bottom-2 -right-2 size-8 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                     <Sparkles className="size-4 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    {candidate?.name || "New Candidate"}
                </h2>
                <p className="text-[11px] font-black text-indigo-600 uppercase tracking-widest mt-1">Oral Exam Mode</p>
              </CardContent>
            </Card>
            
            <div className="p-8 rounded-[2rem] bg-white border border-slate-200/60 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-600 opacity-20" />
              <div className="flex items-center gap-2 mb-4">
                 <Info className="size-3 text-slate-400" />
                 <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Active Context</p>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-[10] font-medium">
                {candidate?.resume_text || "No document material provided."}
              </p>
            </div>
          </div>

          {/* --- RIGHT: INTERVIEW ENGINE (8 Cols) --- */}
          <div className="lg:col-span-8">
            <Card className="bg-white border-slate-200/60 shadow-2xl shadow-indigo-100/30 rounded-[3rem] py-16 flex flex-col items-center justify-center relative overflow-hidden">
              
              {/* Background Animated Wave Decor */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                 <Waves className="size-full scale-150 rotate-12" />
              </div>

              {/* Central Pulse Visualizer */}
              <div className="relative flex items-center justify-center mb-16">
                <div className={`absolute inset-0 rounded-full bg-indigo-500/10 transition-all duration-700 ${assistantIsSpeaking ? 'scale-[2] opacity-100' : 'scale-100 opacity-0'}`} />
                <div className={`absolute -inset-8 rounded-full border border-indigo-100/50 transition-all duration-1000 ${isCalling ? 'scale-110 opacity-100 animate-pulse' : 'scale-100 opacity-0'}`} />
                
                <div className={`size-56 rounded-full border-[10px] border-white shadow-2xl flex items-center justify-center transition-all duration-500 relative z-10 ${isCalling ? 'bg-indigo-600 shadow-indigo-200' : 'bg-slate-50 border-slate-100 shadow-none'}`}>
                  {isCalling ? (
                    <div className="flex gap-1 items-center h-12">
                       <div className={`w-1.5 bg-white rounded-full transition-all duration-300 ${assistantIsSpeaking ? 'h-12' : 'h-4'}`} />
                       <div className={`w-1.5 bg-white rounded-full transition-all duration-500 ${assistantIsSpeaking ? 'h-8' : 'h-6'}`} />
                       <div className={`w-1.5 bg-white rounded-full transition-all duration-300 ${assistantIsSpeaking ? 'h-10' : 'h-4'}`} />
                    </div>
                  ) : (
                    <Mic className="size-20 text-slate-200" />
                  )}
                </div>
              </div>

              <div className="text-center space-y-3 mb-12 px-10 relative z-10">
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                  {isCalling ? (assistantIsSpeaking ? "AI is speaking..." : "Listening...") : "Initialize Session"}
                </h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto font-medium leading-relaxed">
                  {isCalling 
                    ? "The AI Agent is analyzing the candidate's responses in real-time." 
                    : "Ensure you are in a quiet environment. The AI will start by introducing the exam rules."}
                </p>
              </div>

              <Button 
                onClick={handleCall}
                className={`h-20 px-16 cursor-pointer rounded-[2rem] text-xl font-black transition-all hover:scale-105 shadow-2xl active:scale-95 ${
                    isCalling 
                    ? 'bg-slate-900 hover:bg-red-600 text-white shadow-slate-200' 
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
                }`}
              >
                {isCalling ? <><MicOff className="mr-3 size-6" /> Stop Interview</> : <><Mic className="mr-3 size-6" /> Start Oral Exam</>}
              </Button>
            </Card>

            {/* Hint Box */}
            <div className="mt-8 flex justify-center">
               <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <div className="size-2 bg-indigo-500 rounded-full animate-bounce" />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Voice Activity Detection Active</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}