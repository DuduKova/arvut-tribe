import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = createServiceClient();

    // Perform a lightweight query to keep Supabase active
    // Query one of the existing tables with a limit to keep it lightweight
    const { error } = await supabase
      .from("healer_applications")
      .select("id")
      .limit(1);

    if (error) {
      throw new Error(`Supabase connection failed: ${error.message}`);
    }

    return NextResponse.json(
      {
        status: "ok",
        timestamp: new Date().toISOString(),
        message: "Supabase is active",
      },
      { status: 200 },
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Health check failed:", error);

    return NextResponse.json(
      {
        status: "error",
        timestamp: new Date().toISOString(),
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}

