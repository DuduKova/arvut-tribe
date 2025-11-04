import { NextRequest, NextResponse } from "next/server";
import {
  submitHealerApplication,
  sendWhatsAppNotification,
  sendEmailNotification,
  type HealerApplication,
} from "@/lib/supabase/forms";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.fullName || !body.contactPhone) {
      return NextResponse.json(
        { error: "שם מלא ומספר טלפון הם שדות חובה" },
        { status: 400 },
      );
    }

    // Map form data to HealerApplication interface
    const healerData: HealerApplication = {
      fullName: body.fullName || "",
      age: body.age || "",
      mainProfession: body.mainProfession || "",
      treatments: body.treatments || "",
      traumaExperience: body.traumaExperience || "",
      retreatExperience: body.retreatExperience || "",
      teamExperience: body.teamExperience || "",
      motivation: body.motivation || "",
      strengths: body.strengths || "",
      weaknesses: body.weaknesses || "",
      extremeTools: body.extremeTools || "",
      shamanicExperience: body.shamanicExperience || "",
      personalJourney: body.personalJourney || "",
      priorities: body.priorities || "",
      availability: body.availability || "",
      teamNature: body.teamNature || "",
      contactEmail: body.contactEmail || "",
      contactPhone: body.contactPhone || "",
    };

    // Save to Supabase
    const result = await submitHealerApplication(healerData);

    // Send WhatsApp notification (non-blocking)
    try {
      await sendWhatsAppNotification("healer", healerData);
    } catch (whatsappError) {
      // Log error but don't fail the request
      console.error("WhatsApp notification failed:", whatsappError);
    }

    // Send email notification (non-blocking)
    try {
      await sendEmailNotification("healer", healerData);
    } catch (emailError) {
      // Log error but don't fail the request
      console.error("Email notification failed:", emailError);
    }

    return NextResponse.json(
      {
        success: true,
        message: "הבקשה נשלחה בהצלחה",
        data: result,
      },
      { status: 201 },
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error("Error submitting healer application:", error);
    return NextResponse.json(
      {
        error: errorMessage || "שגיאה בשליחת הבקשה. אנא נסה שוב.",
        details:
          process.env.NODE_ENV === "development" ? errorStack : undefined,
      },
      { status: 500 },
    );
  }
}
