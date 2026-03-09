/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { Mic, Search, ExternalLink, Sparkles, LayoutGrid } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardNavbar } from "@/components/ui/dashboard-navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { supabase } from "@/services/supabaseClient";
import { Navbar } from "@/components/landing/Navbar";

export default function Dashboard() {
  const router = useRouter();
  const [interviews, setInterviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterviews = async () => {
      const { data, error } = await supabase
        .from("interviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) setInterviews(data);
      setLoading(false);
    };

    fetchInterviews();
  }, []);

  return (
    // Changed bg-white to a very subtle slate-50 to make cards pop
    <div className="min-h-screen bg-[#fcfcfd] relative overflow-hidden p-8 pt-28">

      <DashboardNavbar />
      
      {/* Background Decorative Gradients - Enhanced Opacity */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-indigo-100/30 to-transparent -z-10" />
      <div className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/40 blur-[140px] rounded-full -z-10" />
      <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-indigo-100/40 blur-[120px] rounded-full -z-10" />

      <main className="grid grid-cols-1 mt-4 lg:grid-cols-12 gap-8 max-w-7xl mx-auto relative z-10">
        
        {/* --- LEFT CARD: 5-column span --- */}
        <div className="lg:col-span-5">
          <Card className="h-full bg-white/80 backdrop-blur-2xl border border-slate-200/60 shadow-[0_20px_50px_rgba(79,70,229,0.05)] rounded-[2.5rem] overflow-hidden">
            <CardHeader className="pb-2 border-b border-slate-100/50 bg-white/30">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-indigo-50 rounded-lg">
                    <Sparkles className="size-4 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Recruiter Lab</h2>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Mark Zuck AI</p>
                  </div>
                </div>
                <Badge className="bg-emerald-50 text-emerald-600 border-none text-[10px] font-bold px-3 py-1">Online</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-16 gap-10">
              <div className="relative flex items-center justify-center">
                {/* Layered Rings for Depth */}
                <div className="absolute inset-0 rounded-full bg-indigo-400/10 animate-ping" />
                <div className="absolute -inset-6 rounded-full border border-indigo-50/50" />
                <div className="size-48 rounded-full border-[8px] border-white shadow-2xl flex items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-600 relative z-10">
                  <Mic className="size-20 text-white drop-shadow-lg" />
                </div>
              </div>
              
              <div className="text-center space-y-3">
                <h3 className="text-2xl font-black text-slate-900">Conduct Oral Exam</h3>
                <p className="text-slate-500 text-sm max-w-[280px] font-medium leading-relaxed">
                  Start an AI-powered voice session to assess technical and communication skills instantly.
                </p>
              </div>

              <Button 
                onClick={() => router.push('/create')}
                className="w-full max-w-[260px] cursor-pointer bg-slate-900 hover:bg-indigo-600 text-white font-bold h-14 rounded-2xl flex gap-3 transition-all hover:scale-[1.02] shadow-xl shadow-slate-200"
              >
                <LayoutGrid className="size-4" /> Setup Interview
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* --- RIGHT CARD: 7-column span --- */}
        <div className="lg:col-span-7">
          <Card className="bg-white/50 backdrop-blur-md border border-slate-200/60 shadow-xl rounded-[2.5rem] flex flex-col h-full">
            <CardHeader className="pb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <CardTitle className="text-xl font-black text-slate-900">Past Sessions</CardTitle>
                <div className="relative w-full md:w-64 group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                  <input 
                    placeholder="Search candidate..." 
                    className="w-full bg-white/80 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none text-slate-900 shadow-sm transition-all"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
              <ScrollArea className="h-[460px] pr-4">
                <div className="space-y-3">
                  {loading ? (
                     <div className="flex flex-col items-center justify-center py-20 gap-3">
                        <div className="size-8 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Syncing Records</p>
                     </div>
                  ) : interviews.length === 0 ? (
                     <p className="text-slate-400 text-center py-20 font-medium italic">No sessions recorded yet.</p>
                  ) : (
                    interviews.map((interview) => (
                      <div 
                        key={interview.id} 
                        onClick={() => router.push(`/testimonial/${interview.id}`)}
                        className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-50/50 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar className="size-11 border-2 border-slate-50 shadow-sm">
                             <AvatarFallback className="bg-slate-900 text-[10px] font-black text-white uppercase tracking-tighter">
                               {interview.name?.substring(0, 2)}
                             </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">{interview.name}</p>
                            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-tighter">{interview.role_title}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                           <div className="text-right">
                              <p className="text-xs font-black text-slate-900">{interview.overall_score || "0"}/5</p>
                              <div className="h-1 w-12 bg-slate-100 rounded-full mt-1 overflow-hidden">
                                <div 
                                  className="h-full bg-indigo-500" 
                                  style={{ width: `${(interview.overall_score / 5) * 100}%` }}
                                />
                              </div>
                           </div>
                           <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-indigo-600 transition-colors">
                            <ExternalLink className="size-4 text-slate-400 group-hover:text-white transition-colors" />
                           </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

       
       
      </main>
    </div>
  );
}