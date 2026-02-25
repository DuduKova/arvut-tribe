import { createServiceClient } from "@/lib/supabase/server";

export interface HealerApplication {
  // Personal & Professional Background
  fullName: string;
  gender: string;
  age: string;
  mainProfession: string;
  treatments: string;
  // Experience & Expertise
  traumaExperience: string;
  retreatExperience: string;
  teamExperience: string;
  // Motivation & Self-Assessment
  motivation: string;
  strengths: string;
  weaknesses: string;
  extremeTools: string;
  // Specialized Knowledge & Personal Journey
  shamanicExperience: string;
  personalJourney: string;
  priorities: string;
  availability: string;
  teamNature: string;
  contactEmail: string;
  contactPhone: string;
}

export interface PatientRegistration {
  // Personal Details
  fullName: string;
  gender: string;
  age: string;
  email: string;
  phone: string;
  city: string;
  // Medical Background
  chronicIllnesses: string;
  medicationHistory: string;
  // Therapeutic History
  mentalTreatment: string;
  previousRetreats: string;
  ptsdDiagnosis: string;
  psychiatricMedication: string;
  hospitalizations: string;
  addictions: string;
  // Guidelines & Support
  reasonForHealing: string;
  supportSystem: string;
  readinessLevel: string;
  expectations: string;
  currentSituation: string;
  // Privacy consent
  privacyConsent: boolean;
}

export async function submitHealerApplication(data: HealerApplication) {
  const supabase = createServiceClient();

  // Store all form data in JSONB column for flexibility
  const formData = {
    // Personal & Professional Background
    fullName: data.fullName,
    gender: data.gender,
    age: data.age,
    mainProfession: data.mainProfession,
    treatments: data.treatments,
    // Experience & Expertise
    traumaExperience: data.traumaExperience,
    retreatExperience: data.retreatExperience,
    teamExperience: data.teamExperience,
    // Motivation & Self-Assessment
    motivation: data.motivation,
    strengths: data.strengths,
    weaknesses: data.weaknesses,
    extremeTools: data.extremeTools,
    // Specialized Knowledge & Personal Journey
    shamanicExperience: data.shamanicExperience,
    personalJourney: data.personalJourney,
    priorities: data.priorities,
    availability: data.availability,
    teamNature: data.teamNature,
    contactEmail: data.contactEmail,
    contactPhone: data.contactPhone,
  };

  const { data: result, error } = await supabase
    .from("healer_applications")
    .insert([
      {
        name: data.fullName,
        email: data.contactEmail || "",
        phone: data.contactPhone || "",
        experience:
          `${data.traumaExperience || ""} ${data.retreatExperience || ""}`.trim() ||
          "Not provided",
        qualifications: data.mainProfession || "Not provided",
        availability: data.availability || "Not provided",
        preferences: data.priorities || "Not provided",
        form_data: formData,
        status: "pending",
      },
    ])
    .select();

  if (error) {
    throw new Error(`Failed to submit application: ${error.message}`);
  }

  return result;
}

export async function submitPatientRegistration(data: PatientRegistration) {
  const supabase = createServiceClient();

  // Store all form data in JSONB column for flexibility
  const formData = {
    // Personal Details
    fullName: data.fullName,
    gender: data.gender,
    age: data.age,
    email: data.email,
    phone: data.phone,
    city: data.city,
    // Medical Background
    chronicIllnesses: data.chronicIllnesses,
    medicationHistory: data.medicationHistory,
    // Therapeutic History
    mentalTreatment: data.mentalTreatment,
    previousRetreats: data.previousRetreats,
    ptsdDiagnosis: data.ptsdDiagnosis,
    psychiatricMedication: data.psychiatricMedication,
    hospitalizations: data.hospitalizations,
    addictions: data.addictions,
    // Guidelines & Support
    reasonForHealing: data.reasonForHealing,
    supportSystem: data.supportSystem,
    readinessLevel: data.readinessLevel,
    expectations: data.expectations,
    currentSituation: data.currentSituation,
    privacyConsent: data.privacyConsent,
  };

  // Combine health background information
  const healthBackground =
    [
      data.chronicIllnesses && `מחלות כרוניות: ${data.chronicIllnesses}`,
      data.medicationHistory && `תרופות: ${data.medicationHistory}`,
      data.mentalTreatment && `טיפול נפשי: ${data.mentalTreatment}`,
      data.ptsdDiagnosis && `PTSD: ${data.ptsdDiagnosis}`,
      data.psychiatricMedication &&
        `תרופות פסיכיאטריות: ${data.psychiatricMedication}`,
    ]
      .filter(Boolean)
      .join("\n") || "Not provided";

  const { data: result, error } = await supabase
    .from("patient_registrations")
    .insert([
      {
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        health_background: healthBackground,
        preferences: data.reasonForHealing || "Not provided",
        availability: data.readinessLevel || "Not provided",
        form_data: formData,
        status: "pending",
      },
    ])
    .select();

  if (error) {
    throw new Error(`Failed to submit registration: ${error.message}`);
  }

  return result;
}

export async function sendEmailNotification(
  type: "healer" | "patient",
  data: HealerApplication | PatientRegistration,
) {
  try {
    const { sendFormSubmissionEmail } = await import("@/lib/email");
    await sendFormSubmissionEmail(type, data);
  } catch (error) {
    // Log error but don't throw - email notification failure shouldn't block form submission
    console.error("Failed to send email notification:", error);
  }
}

export async function sendWhatsAppNotification(
  type: "healer" | "patient",
  data: HealerApplication | PatientRegistration,
) {
  const adminPhone = process.env.ADMIN_PHONE_NUMBER;

  if (!adminPhone) {
    console.warn(
      "ADMIN_PHONE_NUMBER not configured, skipping WhatsApp notification",
    );
    return;
  }

  try {
    const { sendWhatsAppTextMessage } = await import("@/lib/whatsapp");

    let message: string;

    if (type === "healer") {
      const healerData = data as HealerApplication;
      const experienceSummary = healerData.traumaExperience
        ? healerData.traumaExperience.substring(0, 100) +
          (healerData.traumaExperience.length > 100 ? "..." : "")
        : "לא צוין";

      message = `🔔 בקשה חדשה להתנדבות כמרפא

שם: ${healerData.fullName}
מין: ${healerData.gender === "female" ? "נקבה" : "זכר"}
גיל: ${healerData.age}
טלפון: ${healerData.contactPhone || "לא צוין"}
אימייל: ${healerData.contactEmail || "לא צוין"}
מקצוע עיקרי: ${healerData.mainProfession || "לא צוין"}

ניסיון:
${experienceSummary}

אנא בדוק את הבקשה במערכת הניהול.`;
    } else {
      const patientData = data as PatientRegistration;
      const healthSummary = patientData.chronicIllnesses
        ? patientData.chronicIllnesses.substring(0, 100) +
          (patientData.chronicIllnesses.length > 100 ? "..." : "")
        : "לא צוין";

      message = `🔔 הרשמה חדשה כמטופל

שם: ${patientData.fullName}
מין: ${patientData.gender === "female" ? "נקבה" : "זכר"}
גיל: ${patientData.age}
אימייל: ${patientData.email}
טלפון: ${patientData.phone}
עיר: ${patientData.city || "לא צוין"}

רקע בריאותי:
${healthSummary}

סיבת פניה: ${patientData.reasonForHealing || "לא צוין"}

אנא בדוק את ההרשמה במערכת הניהול.`;
    }

    await sendWhatsAppTextMessage(adminPhone, message);
  } catch (error) {
    // Log error but don't throw - WhatsApp notification failure shouldn't block form submission
    console.error("Failed to send WhatsApp notification:", error);
  }
}
