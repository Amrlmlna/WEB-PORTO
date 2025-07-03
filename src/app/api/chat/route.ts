import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/ai/flows/chat-flow";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const result = await chat(body);
    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json(
      { message: e.message || "Error" },
      { status: 500 }
    );
  }
}
