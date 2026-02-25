import { Resend } from "resend";
import type {
  HealerApplication,
  PatientRegistration,
} from "@/lib/supabase/forms";

const resend = new Resend(process.env.RESEND_API_KEY);

const RECIPIENT_EMAIL = "thetribeguardians@gmail.com";

/**
 * Format form data into a readable HTML email for healer applications
 */
function formatHealerEmailHTML(data: HealerApplication): string {
  return `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background-color: #4F46E5;
      color: white;
      padding: 20px;
      border-radius: 8px 8px 0 0;
    }
    .content {
      background-color: #f9fafb;
      padding: 20px;
      border: 1px solid #e5e7eb;
    }
    .section {
      margin-bottom: 20px;
      padding: 15px;
      background-color: white;
      border-radius: 4px;
      border-left: 4px solid #4F46E5;
    }
    .section-title {
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 10px;
      color: #4F46E5;
    }
    .field {
      margin-bottom: 10px;
    }
    .field-label {
      font-weight: bold;
      color: #666;
      margin-bottom: 5px;
    }
    .field-value {
      color: #333;
      white-space: pre-wrap;
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #666;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🔔 בקשה חדשה להתנדבות כמרפא</h1>
  </div>
  <div class="content">
    <div class="section">
      <div class="section-title">פרטים אישיים</div>
      <div class="field">
        <div class="field-label">שם מלא:</div>
        <div class="field-value">${data.fullName || "לא צוין"}</div>
      </div>
      <div class="field">
        <div class="field-label">מין:</div>
        <div class="field-value">${data.gender === "female" ? "נקבה" : "זכר"}</div>
      </div>
      <div class="field">
        <div class="field-label">גיל:</div>
        <div class="field-value">${data.age || "לא צוין"}</div>
      </div>
      <div class="field">
        <div class="field-label">טלפון:</div>
        <div class="field-value">${data.contactPhone || "לא צוין"}</div>
      </div>
      <div class="field">
        <div class="field-label">אימייל:</div>
        <div class="field-value">${data.contactEmail || "לא צוין"}</div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">רקע מקצועי</div>
      <div class="field">
        <div class="field-label">מקצוע עיקרי והסמכות מקצועיות:</div>
        <div class="field-value">${data.mainProfession || "לא צוין"}</div>
      </div>
      <div class="field">
        <div class="field-label">סוגי טיפולים, הכשרות ושיטות טיפול:</div>
        <div class="field-value">${data.treatments || "לא צוין"}</div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">ניסיון ומומחיות</div>
      <div class="field">
        <div class="field-label">ניסיון טיפולי בשטח מול אוכלוסיות פוסט טראומטיות:</div>
        <div class="field-value">${data.traumaExperience || "לא צוין"}</div>
      </div>
      <div class="field">
        <div class="field-label">ניסיון בריטריטים/טקסים קבוצתיים:</div>
        <div class="field-value">${data.retreatExperience || "לא צוין"}</div>
      </div>
      <div class="field">
        <div class="field-label">ניסיון עבודה עם צוות רב-מקצועי/רב-דורי:</div>
        <div class="field-value">${data.teamExperience || "לא צוין"}</div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">מוטיבציה והערכה עצמית</div>
      <div class="field">
        <div class="field-label">מה מושך אותך להשתלב בפרויקט:</div>
        <div class="field-value">${data.motivation || "לא צוין"}</div>
      </div>
      <div class="field">
        <div class="field-label">מה החוזקות שלך כאיש/אשת טיפול:</div>
        <div class="field-value">${data.strengths || "לא צוין"}</div>
      </div>
      <div class="field">
        <div class="field-label">מה הן חולשות/אתגרים שאתה פוגש בעבודת צוות או טיפול:</div>
        <div class="field-value">${data.weaknesses || "לא צוין"}</div>
      </div>
      <div class="field">
        <div class="field-label">כלים בעבודה עם מצבי קיצון רגשיים או התפרקות נפשית:</div>
        <div class="field-value">${data.extremeTools || "לא צוין"}</div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">ידע מיוחד ומסע אישי</div>
      <div class="field">
        <div class="field-label">הכשרה או ניסיון רלוונטי לטיפול בפטריות/מדיסין/תהליכים שמאניים:</div>
        <div class="field-value">${data.shamanicExperience || "לא צוין"}</div>
      </div>
      <div class="field">
        <div class="field-label">תהליכים אישיים משמעותיים או טיפול/ריטריט אישי מרפא:</div>
        <div class="field-value">${data.personalJourney || "לא צוין"}</div>
      </div>
      <div class="field">
        <div class="field-label">סדר עדיפויות פנימי כשותף בפרויקט:</div>
        <div class="field-value">${data.priorities || "לא צוין"}</div>
      </div>
      <div class="field">
        <div class="field-label">זמינות להשתתף במפגשים קבוצתיים, הכשרות וסופרוויז'ן:</div>
        <div class="field-value">${data.availability || "לא צוין"}</div>
      </div>
      <div class="field">
        <div class="field-label">מה חשוב במיוחד באופי הצוות ובאופי הטיפול בפרויקט מסוג זה:</div>
        <div class="field-value">${data.teamNature || "לא צוין"}</div>
      </div>
    </div>
  </div>
  <div class="footer">
    <p>אנא בדוק את הבקשה במערכת הניהול.</p>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Format form data into a readable HTML email for patient registrations
 */
function formatPatientEmailHTML(data: PatientRegistration): string {
  return `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background-color: #059669;
      color: white;
      padding: 20px;
      border-radius: 8px 8px 0 0;
    }
    .content {
      background-color: #f9fafb;
      padding: 20px;
      border: 1px solid #e5e7eb;
    }
    .section {
      margin-bottom: 20px;
      padding: 15px;
      background-color: white;
      border-radius: 4px;
      border-left: 4px solid #059669;
    }
    .section-title {
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 10px;
      color: #059669;
    }
    .field {
      margin-bottom: 10px;
    }
    .field-label {
      font-weight: bold;
      color: #666;
      margin-bottom: 5px;
    }
    .field-value {
      color: #333;
      white-space: pre-wrap;
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #666;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🔔 הרשמה חדשה כמטופל</h1>
  </div>
  <div class="content">
    <div class="section">
      <div class="section-title">פרטים אישיים</div>
      <div class="field">
        <div class="field-label">שם מלא:</div>
        <div class="field-value">${data.fullName || "לא צוין"}</div>
      </div>
      <div class="field">
        <div class="field-label">מין:</div>
        <div class="field-value">${data.gender === "female" ? "נקבה" : "זכר"}</div>
      </div>
      <div class="field">
        <div class="field-label">גיל:</div>
        <div class="field-value">${data.age || "לא צוין"}</div>
      </div>
      <div class="field">
        <div class="field-label">אימייל:</div>
        <div class="field-value">${data.email || "לא צוין"}</div>
      </div>
      <div class="field">
        <div class="field-label">טלפון:</div>
        <div class="field-value">${data.phone || "לא צוין"}</div>
      </div>
      <div class="field">
        <div class="field-label">עיר מגורים:</div>
        <div class="field-value">${data.city || "לא צוין"}</div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">רקע רפואי ופיזי</div>
      <div class="field">
        <div class="field-label">מחלות כרוניות או מגבלות פיזיות:</div>
        <div class="field-value">${data.chronicIllnesses || "לא צוין"}</div>
      </div>
      <div class="field">
        <div class="field-label">תרופות (נוכחיות או בעבר):</div>
        <div class="field-value">${data.medicationHistory || "לא צוין"}</div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">היסטוריה טיפולית ונפשית</div>
      <div class="field">
        <div class="field-label">תהליך טיפולי נפשי/פסיכולוגי:</div>
        <div class="field-value">${data.mentalTreatment || "לא צוין"}</div>
      </div>
      <div class="field">
        <div class="field-label">רטריטים או תהליכי ריפוי קודמים:</div>
        <div class="field-value">${data.previousRetreats || "לא צוין"}</div>
      </div>
      <div class="field">
        <div class="field-label">אבחנת PTSD או הפרעה נפשית אחרת:</div>
        <div class="field-value">${data.ptsdDiagnosis || "לא צוין"}</div>
      </div>
      <div class="field">
        <div class="field-label">תרופות פסיכיאטריות:</div>
        <div class="field-value">${data.psychiatricMedication || "לא צוין"}</div>
      </div>
      <div class="field">
        <div class="field-label">אשפוזים פסיכיאטריים, ניסיונות התאבדות או התמוטטויות נפשיות:</div>
        <div class="field-value">${data.hospitalizations || "לא צוין"}</div>
      </div>
      <div class="field">
        <div class="field-label">התמכרויות (פעילות או עבר):</div>
        <div class="field-value">${data.addictions || "לא צוין"}</div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">הכוונה, תמיכה ומוכנות</div>
      <div class="field">
        <div class="field-label">סיבת פניה - מהי הסיבה שבגללה אתה מבקש לעבור תהליך ריפוי:</div>
        <div class="field-value">${data.reasonForHealing || "לא צוין"}</div>
      </div>
      <div class="field">
        <div class="field-label">מערכת תמיכה:</div>
        <div class="field-value">${data.supportSystem || "לא צוין"}</div>
      </div>
      <div class="field">
        <div class="field-label">רמת מוכנות להתחייב למסע טיפולי אינטנסיבי:</div>
        <div class="field-value">${data.readinessLevel || "לא צוין"}</div>
      </div>
      <div class="field">
        <div class="field-label">ציפיות מתהליך הריפוי:</div>
        <div class="field-value">${data.expectations || "לא צוין"}</div>
      </div>
      <div class="field">
        <div class="field-label">מצב חיים נוכחי, אתגרים ומה תרצה שהצוות ידע:</div>
        <div class="field-value">${data.currentSituation || "לא צוין"}</div>
      </div>
    </div>
  </div>
  <div class="footer">
    <p>אנא בדוק את ההרשמה במערכת הניהול.</p>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Send email notification for form submission
 */
export async function sendFormSubmissionEmail(
  type: "healer" | "patient",
  data: HealerApplication | PatientRegistration,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn(
      "RESEND_API_KEY not configured, skipping email notification",
    );
    return;
  }

  try {
    const isHealer = type === "healer";
    const healerData = isHealer ? (data as HealerApplication) : null;
    const patientData = isHealer ? null : (data as PatientRegistration);

    const subject = isHealer
      ? `בקשה חדשה להתנדבות כמרפא - ${healerData?.fullName || "אין שם"}`
      : `הרשמה חדשה כמטופל - ${patientData?.fullName || "אין שם"}`;

    const htmlContent = isHealer
      ? formatHealerEmailHTML(data as HealerApplication)
      : formatPatientEmailHTML(data as PatientRegistration);

    await resend.emails.send({
      from: "The Tribe Guardians Forms <onboarding@resend.dev>", // You'll need to verify your domain with Resend
      to: [RECIPIENT_EMAIL],
      subject: subject,
      html: htmlContent,
    });

    console.log(`Email notification sent successfully for ${type} form submission`);
  } catch (error) {
    // Log error but don't throw - email notification failure shouldn't block form submission
    console.error("Failed to send email notification:", error);
  }
}
