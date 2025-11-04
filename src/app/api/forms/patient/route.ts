import { NextRequest, NextResponse } from "next/server";
import {
  submitPatientRegistration,
  sendWhatsAppNotification,
  sendEmailNotification,
  type PatientRegistration,
} from "@/lib/supabase/forms";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.fullName || !body.phone) {
      return NextResponse.json(
        { error: "שם מלא ומספר טלפון הם שדות חובה" },
        { status: 400 },
      );
    }

    // Validate privacy consent
    if (!body.privacyConsent) {
      return NextResponse.json(
        { error: "יש לאשר את הסכמת הפרטיות" },
        { status: 400 },
      );
    }

    // Map form data to PatientRegistration interface
    const patientData: PatientRegistration = {
      fullName: body.fullName || "",
      age: body.age || "",
      phone: body.phone || "",
      city: body.city || "",
      chronicIllnesses: body.chronicIllnesses || "",
      medicationHistory: body.medicationHistory || "",
      mentalTreatment: body.mentalTreatment || "",
      previousRetreats: body.previousRetreats || "",
      ptsdDiagnosis: body.ptsdDiagnosis || "",
      psychiatricMedication: body.psychiatricMedication || "",
      hospitalizations: body.hospitalizations || "",
      addictions: body.addictions || "",
      reasonForHealing: body.reasonForHealing || "",
      supportSystem: body.supportSystem || "",
      readinessLevel: body.readinessLevel || "",
      expectations: body.expectations || "",
      currentSituation: body.currentSituation || "",
      privacyConsent: body.privacyConsent || false,
    };

    // Save to Supabase
    const result = await submitPatientRegistration(patientData);

    // Send WhatsApp notification (non-blocking)
    try {
      await sendWhatsAppNotification("patient", patientData);
    } catch (whatsappError) {
      // Log error but don't fail the request
      console.error("WhatsApp notification failed:", whatsappError);
    }

    // Send email notification (non-blocking)
    try {
      await sendEmailNotification("patient", patientData);
    } catch (emailError) {
      // Log error but don't fail the request
      console.error("Email notification failed:", emailError);
    }

    return NextResponse.json(
      {
        success: true,
        message: "ההרשמה נשלחה בהצלחה",
        data: result,
      },
      { status: 201 },
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error("Error submitting patient registration:", error);
    return NextResponse.json(
      {
        error: errorMessage || "שגיאה בשליחת ההרשמה. אנא נסה שוב.",
        details:
          process.env.NODE_ENV === "development" ? errorStack : undefined,
      },
      { status: 500 },
    );
  }
}
