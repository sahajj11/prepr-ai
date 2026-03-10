/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "@/services/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message } = body;

    // 1. Only process if the call has ended
    if (message.type === "end-of-call-report") {
      const callId = message.call.id;
      const transcript = message.transcript;
      
      // 2. Extract the Interview ID we passed earlier in variableValues
      const interviewId = message.call.assistantOverrides.variableValues.id;

      // 3. Update Supabase with the final data
      const { error } = await supabase
        .from("interviews")
        .update({
          transcript: transcript,
          status: "completed",
          // You can also store the total duration or recording URL
          vapi_call_id: callId 
        })
        .eq("id", interviewId);

      if (error) throw error;
      
      console.log(`✅ Interview ${interviewId} updated with transcript.`);
    }

    return NextResponse.json({ message: "Webhook received" }, { status: 200 });
  } catch (error: any) {
    console.error("❌ Webhook Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}