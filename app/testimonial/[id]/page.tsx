/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../../services/supabaseClient";
import { 
  ChevronLeft, 
  Star,  
  Quote, 
  CheckCircle2, 
  Clock, 
  User,
  FileText,
  Sparkles,
  ShieldCheck,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function TestimonialPage() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterviewData = async () => {
      const { data, error } = await supabase
        .from("interviews")
        .select("*")
        .eq("id", id)
        .single();

      if (data) setData(data);
      setLoading(false);
    };

    fetchInterviewData();
  }, [id]);

  if (loading) return <TestimonialSkeleton />;

  return (
    <div className="min-h-screen bg-[#fcfcfd] text-slate-900 relative overflow-hidden p-6 lg:p-12">
      {/* Brand Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-indigo-50/50 to-transparent -z-10" />
      <div className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] bg-blue-50/60 blur-[120px] rounded-full -z-10" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-12">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/dashboard')} 
            className="group text-slate-500 hover:text-indigo-600 flex gap-2 p-0 font-bold transition-all"
          >
            <div className="p-2 bg-white rounded-xl border border-slate-200 group-hover:border-indigo-100 shadow-sm">
               <ChevronLeft className="size-4" />
            </div>
            Back to Dashboard
          </Button>
          
          <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-4 py-1.5 rounded-full flex gap-2">
             <ShieldCheck className="size-3" />
             <span className="text-[10px] font-black uppercase tracking-widest">Verified Report</span>
          </Badge>
        </div>

        <main className="space-y-10">
          {/* Profile & Score Section */}
          <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-10 border-b border-slate-200/60">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-100">
                    <TrendingUp className="size-4 text-white" />
                 </div>
                 <span className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.2em]">Session Complete</span>
              </div>
              <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
                {data?.candidate_name}
              </h1>
              <p className="text-slate-500 font-medium flex items-center gap-2">
                Assessment for <span className="text-slate-900 font-bold border-b-2 border-indigo-200 pb-0.5">{data?.candidate_role || "Technical Role"}</span>
              </p>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-2xl shadow-indigo-100/20 flex items-center gap-10">
              <div className="text-center">
                <p className="text-slate-400 text-[10px] uppercase tracking-widest mb-2 font-black">Performance Score</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-indigo-600 tracking-tighter">{data?.overall_score || "0"}</span>
                  <span className="text-slate-300 font-bold text-xl">/5</span>
                </div>
              </div>
              <div className="h-14 w-[1px] bg-slate-100" />
              <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`size-5 ${star <= Math.round(data?.overall_score || 0) ? 'text-indigo-500 fill-indigo-500' : 'text-slate-100'}`} 
                    />
                  ))}
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase text-center">AI Rating</p>
              </div>
            </div>
          </section>

          {/* AI Generated Testimonial */}
          <section>
            <Card className="bg-white border border-indigo-500/30 shadow-[0_0_25px_rgba(99,102,241,0.4)] rounded-[3rem] relative overflow-hidden group">
               <Quote className="absolute -top-6 -right-6 size-44 text-slate-50 opacity-[0.03] rotate-12 group-hover:opacity-[0.05] transition-opacity" />
               <CardHeader className="pt-10 px-10">
                 <CardTitle className="text-indigo-600 text-[11px] uppercase tracking-[0.3em] font-black flex items-center gap-3">
                   <Sparkles className="size-4" /> AI Examiner Summary
                 </CardTitle>
               </CardHeader>
               <CardContent className="px-10 pb-12">
                 <p className="text-2xl leading-[1.6] font-medium text-slate-800 tracking-tight italic">
                    &quot;{data?.testimonial_summary || "Our AI agent is currently finalizing the performance analysis. Please refresh in a moment..."}&quot;
                 </p>
               </CardContent>
            </Card>
          </section>

          {/* Two Column Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Transcript Area */}
            <Card className="lg:col-span-7 bg-white border-slate-200/60 rounded-[2.5rem] shadow-sm overflow-hidden">
              <CardHeader className="border-b border-slate-50 bg-slate-50/30 px-8 py-6">
                <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-3">
                  <FileText className="size-4" /> Technical Transcript
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 max-h-[500px] overflow-y-auto">
                <div className="p-8 space-y-4">
                  {data?.transcript ? (
                    <div className="text-[13px] text-slate-600 font-medium leading-[1.8] whitespace-pre-wrap bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                      {typeof data.transcript === 'string' ? data.transcript : JSON.stringify(data.transcript, null, 2)}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                       <div className="size-10 rounded-full border-2 border-slate-100 border-t-indigo-600 animate-spin" />
                       <p className="text-slate-400 text-xs font-bold uppercase">Processing Voice Data...</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Metadata */}
            <div className="lg:col-span-5 space-y-8">
              <Card className="bg-white border-slate-200/60 rounded-[2.5rem] p-8 shadow-sm">
                <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Session Audit</CardTitle>
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                    <span className="text-xs font-bold text-slate-400 flex items-center gap-2"><Clock className="size-3" /> Timestamp</span>
                    <span className="text-sm font-black text-slate-900">{new Date(data?.created_at).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 flex items-center gap-2"><User className="size-3" /> Verification</span>
                    <Badge className="bg-indigo-50 text-indigo-700 border-none font-black text-[10px]">AI-CERTIFIED</Badge>
                  </div>
                </div>
              </Card>

              <div className="p-8 rounded-[2.5rem] bg-indigo-600 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 scale-150 rotate-12 group-hover:rotate-45 transition-transform duration-1000">
                   <TrendingUp className="size-20" />
                </div>
                <h4 className="font-black text-sm uppercase tracking-widest mb-3 opacity-80">Hiring Insight</h4>
                <p className="text-sm leading-relaxed font-medium">
                  The candidate demonstrates strong technical proficiency based on source material. 
                  Recommendation: Proceed to final behavioral round to verify culture fit.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function TestimonialSkeleton() {
  return (
    <div className="min-h-screen bg-[#fcfcfd] p-12 max-w-5xl mx-auto space-y-12">
      <Skeleton className="h-10 w-40 bg-slate-100 rounded-xl" />
      <div className="flex justify-between items-center">
        <div className="space-y-4">
          <Skeleton className="h-4 w-32 bg-slate-100" />
          <Skeleton className="h-16 w-80 bg-slate-100 rounded-2xl" />
          <Skeleton className="h-6 w-56 bg-slate-100" />
        </div>
        <Skeleton className="h-32 w-64 bg-slate-100 rounded-[2.5rem]" />
      </div>
      <Skeleton className="h-64 w-full bg-slate-100 rounded-[3rem]" />
    </div>
  );
}