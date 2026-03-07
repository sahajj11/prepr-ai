/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  ChevronLeft, Upload, User, FileText, 
  Sparkles, Loader2, CheckCircle, Info, 
  ArrowRight, MousePointer2 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "../../services/supabaseClient";

let pdfjsLib: any = null;

export default function CreateInterview() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [loading, setLoading] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role:"",
    resume: "",
    instructions: "",
  });

  useEffect(() => {
    const initPdf = async () => {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
      pdfjsLib = pdfjs;
    };
    initPdf();
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || file.type !== "application/pdf") return;
    if (!pdfjsLib) return;

    setIsParsing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        fullText += textContent.items.map((item: any) => item.str).join(" ") + "\n";
      }
      setFormData((prev) => ({ ...prev, resume: fullText.trim() }));
    } catch (error) {
      console.error(error);
    } finally {
      setIsParsing(false);
    }
  };

  const handleStart = async () => {
    if (!formData.name || !formData.resume) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("interviews")
        .insert([{
          
            name: formData.name,
            resume_text: formData.resume,
            role_title:formData.role,
            special_instructions: formData.instructions
        }])
        .select();
      if (error) throw error;
      router.push(`/interview/${data[0].id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-indigo-50 to-transparent -z-10" />
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-50/50 blur-[120px] rounded-full -z-10" />

      <div className="max-w-6xl mx-auto px-6 py-12 lg:py-20">
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-12">
          <button 
            onClick={() => router.back()} 
            className="group flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-all"
          >
            <div className="p-2 bg-white rounded-lg border border-slate-200 group-hover:border-indigo-100 group-hover:bg-indigo-50 shadow-sm transition-all">
               <ChevronLeft className="size-4" />
            </div>
            Back to Dashboard
          </button>
          
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100">
             <div className="size-2 bg-emerald-500 rounded-full animate-pulse" />
             <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">AI Agent Ready</span>
          </div>
        </div>

        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Configure Your <span className="text-indigo-600">Oral Exam.</span>
          </h1>
          <p className="text-slate-500 mt-4 text-lg font-medium max-w-2xl">
            Upload your material and let Prepr AI generate a customized questioning strategy.
          </p>
        </div>

        {/* Main Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: The Main Form (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            <Card className="bg-white border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] overflow-hidden">
              <CardContent className="p-8 lg:p-10 space-y-8">
                
                {/* Field: Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-slate-400">Student Name</Label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                      <Input 
                        id="name" 
                        value={formData.name} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} 
                        placeholder="e.g. Sahaj Rajput" 
                        className="bg-slate-50/50 border-slate-200 pl-11 h-14 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-semibold" 
                      />
                    </div>
                  </div>


                   <div className="space-y-3">
                    <Label htmlFor="role" className="text-xs font-black uppercase tracking-widest text-slate-400">Role</Label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                      <Input 
                        id="role" 
                        value={formData.role} 
                        onChange={(e) => setFormData({...formData, role: e.target.value})} 
                        placeholder="e.g. Frontend Developer" 
                        className="bg-slate-50/50 border-slate-200 pl-11 h-14 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-semibold" 
                      />
                    </div>
                  </div>

                 
                </div>

                {/* Field: Instructions */}
                <div className="space-y-3">
                  <Label htmlFor="instructions" className="text-xs font-black uppercase tracking-widest text-slate-400">Custom Constraints</Label>
                  <Textarea 
                    id="instructions" 
                    value={formData.instructions} 
                    onChange={(e) => setFormData({...formData, instructions: e.target.value})} 
                    placeholder="e.g. Ask 5 technical questions followed by one soft-skill question." 
                    className="bg-slate-50/50 border-slate-200 min-h-[100px] p-5 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-medium resize-none" 
                  />
                </div>

                {/* Field: Upload Area */}
                <div className="space-y-3">
                   <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Material Selection</Label>
                   <div 
                    onClick={() => fileInputRef.current?.click()} 
                    className={`group relative overflow-hidden border-2 border-dashed rounded-[2rem] p-10 flex flex-col items-center justify-center gap-4 transition-all cursor-pointer ${
                        formData.resume 
                        ? "border-indigo-600 bg-indigo-50/30" 
                        : "border-slate-200 bg-slate-50/50 hover:border-indigo-400 hover:bg-white"
                    }`}
                  >
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".pdf" />
                    
                    <div className={`size-16 rounded-2xl flex items-center justify-center transition-all ${formData.resume ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-400'}`}>
                       {isParsing ? <Loader2 className="animate-spin" /> : formData.resume ? <CheckCircle /> : <Upload />}
                    </div>

                    <div className="text-center">
                       <p className="font-black text-slate-900 tracking-tight">
                         {isParsing ? "Reading Document..." : formData.resume ? "Material Processed" : "Upload Exam Material"}
                       </p>
                       <p className="text-xs font-bold text-slate-400 mt-1">PDF documents only (Max 5MB)</p>
                    </div>

                    {formData.resume && (
                       <button 
                        onClick={(e) => { e.stopPropagation(); setFormData({...formData, resume: ""}) }} 
                        className="absolute top-4 right-4 text-[10px] font-black text-red-500 uppercase hover:bg-red-50 px-3 py-1 rounded-full transition-all"
                       >
                         Remove
                       </button>
                    )}
                  </div>
                </div>

                <Button 
                    onClick={handleStart} 
                    disabled={loading || isParsing}
                    className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-black h-16 rounded-2xl text-lg flex gap-3 transition-all hover:scale-[1.01] shadow-xl shadow-slate-200 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" /> : (
                    <>Initialize Voice Agent <ArrowRight className="size-5" /></>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT: Preview & Tips (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Bento Tip 1: Content Preview */}
            <Card className="bg-indigo-600 border-none text-white rounded-[2.5rem] shadow-2xl shadow-indigo-200/50 overflow-hidden relative group">
              <div className="absolute top-[-20%] right-[-10%] size-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-black uppercase tracking-widest opacity-70">Live Text Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white/10 rounded-2xl p-5 border border-white/10 h-[220px] overflow-hidden relative">
                   <Textarea 
                      readOnly
                      value={formData.resume} 
                      placeholder="Waiting for document content..." 
                      className="bg-transparent border-none text-white placeholder:text-white/30 text-xs leading-relaxed resize-none h-full scrollbar-hide focus:ring-0" 
                    />
                    <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-indigo-600 to-transparent z-10" />
                </div>
                <div className="flex items-center gap-2">
                   <MousePointer2 className="size-4 text-white/60" />
                   <p className="text-[10px] font-bold text-white/60 uppercase">System automatically updates context</p>
                </div>
              </CardContent>
            </Card>

            {/* Bento Tip 2: Quick Steps */}
            <Card className="bg-white border-slate-200/60 rounded-[2.5rem] p-8 shadow-sm">
               <div className="space-y-8">
                  <div className="flex gap-4">
                     <div className="size-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 font-black">1</div>
                     <div>
                        <p className="font-black text-slate-900 text-sm">Semantic Mapping</p>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed mt-1">Our AI extracts 50+ key entities from your PDF to build a knowledge graph.</p>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <div className="size-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 font-black border border-indigo-100">2</div>
                     <div>
                        <p className="font-black text-slate-900 text-sm">Agent Generation</p>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed mt-1">A voice identity is created specifically for this candidate material.</p>
                     </div>
                  </div>
               </div>
            </Card>

            {/* Pro Note */}
           

          </div>
        </div>
      </div>
    </div>
  );
}