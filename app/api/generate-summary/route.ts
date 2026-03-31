/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { supabase } from "@/services/supabaseClient";
import axios from "axios";

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

export async function POST(req: Request) { 
  try {
    const { interviewId } = await req.json();
    console.log("🚀 Analysis started for ID:", interviewId)

    if (!interviewId) {
      return NextResponse.json({ error: "Interview ID is required" }, { status: 400 });
    }

    // 1. Fetch the transcript that the Webhook already saved
    const { data: interview, error: fetchError } = await supabase
      .from("interviews")
      .select("transcript")
      .eq("id", interviewId) 
      .single();

    if (fetchError || !interview?.transcript) {
      return NextResponse.json({ error: "Transcript not found in database" }, { status: 404 });
    }

    // 2. Prepare the AI Prompt
    const prompt = `
      As an expert technical recruiter, analyze this interview transcript:
      "${interview.transcript}"
      
      Provide a JSON response with exactly these two fields:
      1. "overall_score": A number from 1.0 to 5.0.
      2. "testimonial_summary": A 2-3 sentence professional evaluation of the candidate.
      
      Return ONLY valid JSON.
    `;

    // 3. Axios Call to Gemini
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          response_mime_type: "application/json",
        },
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const aiData = JSON.parse(response.data.candidates[0].content.parts[0].text);

    // 4. Save the AI results back to Supabase
    const { error: updateError } = await supabase
      .from("interviews")
      .update({
         scorecard: aiData.overall_score,
        feedback_summary: aiData.testimonial_summary,
        // We leave the transcript alone since it's already there
      })
      .eq("id", interviewId);

    if (updateError) throw updateError;

    return NextResponse.json({ 
      success: true, 
      data: aiData 
    }, { status: 200 });

  } catch (error: any) {
    console.error("❌ Analysis Error:", error.response?.data || error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}