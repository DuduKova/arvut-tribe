import type { SubmissionType } from "@/lib/admin/types";

type SupportedLocale = "he" | "en";

interface LocalizedText {
  he: string;
  en: string;
}

export interface FormFieldConfig {
  key: string;
  labels: LocalizedText;
}

export interface FormSectionConfig {
  id: string;
  titles: LocalizedText;
  fields: FormFieldConfig[];
}

export interface ReadableFormField {
  key: string;
  label: string;
  value: string;
  isStructuredValue: boolean;
}

export interface ReadableFormSection {
  id: string;
  title: string;
  fields: ReadableFormField[];
}

const YES_NO_LABELS: Record<SupportedLocale, { yes: string; no: string }> = {
  he: { yes: "כן", no: "לא" },
  en: { yes: "Yes", no: "No" },
};

const GENDER_LABELS: Record<SupportedLocale, Record<string, string>> = {
  he: {
    male: "זכר",
    female: "נקבה",
  },
  en: {
    male: "Male",
    female: "Female",
  },
};

const ADDITIONAL_FIELDS_TITLE: LocalizedText = {
  he: "שדות נוספים",
  en: "Additional fields",
};

const HEALER_SECTIONS: FormSectionConfig[] = [
  {
    id: "personal-professional",
    titles: {
      he: "רקע אישי ומקצועי",
      en: "Personal & Professional Background",
    },
    fields: [
      { key: "fullName", labels: { he: "שם מלא", en: "Full name" } },
      { key: "gender", labels: { he: "מין", en: "Gender" } },
      { key: "age", labels: { he: "גיל", en: "Age" } },
      {
        key: "mainProfession",
        labels: {
          he: "מקצוע עיקרי והסמכות מקצועיות",
          en: "Main profession and certifications",
        },
      },
      {
        key: "treatments",
        labels: {
          he: "סוגי טיפולים, הכשרות ושיטות טיפול",
          en: "Treatments, training, and methods",
        },
      },
    ],
  },
  {
    id: "experience",
    titles: {
      he: "ניסיון ומומחיות",
      en: "Experience & Expertise",
    },
    fields: [
      {
        key: "traumaExperience",
        labels: {
          he: "ניסיון טיפולי מול אוכלוסיות פוסט טראומטיות",
          en: "Trauma-related therapeutic experience",
        },
      },
      {
        key: "retreatExperience",
        labels: {
          he: "ניסיון בריטריטים או טקסים קבוצתיים",
          en: "Retreat/group ceremony experience",
        },
      },
      {
        key: "teamExperience",
        labels: {
          he: "ניסיון עבודה בצוות רב-מקצועי",
          en: "Multidisciplinary team experience",
        },
      },
    ],
  },
  {
    id: "motivation",
    titles: {
      he: "מוטיבציה והערכה עצמית",
      en: "Motivation & Self-Assessment",
    },
    fields: [
      { key: "motivation", labels: { he: "מה מושך אותך לפרויקט", en: "Motivation" } },
      { key: "strengths", labels: { he: "חוזקות", en: "Strengths" } },
      { key: "weaknesses", labels: { he: "חולשות או אתגרים", en: "Weaknesses or challenges" } },
      {
        key: "extremeTools",
        labels: {
          he: "כלים למצבי קיצון רגשיים",
          en: "Tools for emotional crisis situations",
        },
      },
    ],
  },
  {
    id: "specialized-journey",
    titles: {
      he: "ידע מיוחד ומסע אישי",
      en: "Specialized Knowledge & Personal Journey",
    },
    fields: [
      {
        key: "shamanicExperience",
        labels: {
          he: "ניסיון או הכשרה בתחום שמאני/מדיסין",
          en: "Shamanic or medicine-related experience",
        },
      },
      {
        key: "personalJourney",
        labels: {
          he: "מסע אישי משמעותי",
          en: "Personal healing journey",
        },
      },
      { key: "priorities", labels: { he: "סדרי עדיפויות", en: "Priorities" } },
      { key: "availability", labels: { he: "זמינות", en: "Availability" } },
      {
        key: "teamNature",
        labels: {
          he: "מה חשוב באופי הצוות והטיפול",
          en: "Preferred team/treatment qualities",
        },
      },
    ],
  },
  {
    id: "contact",
    titles: {
      he: "פרטי קשר",
      en: "Contact",
    },
    fields: [
      { key: "contactEmail", labels: { he: "אימייל", en: "Email" } },
      { key: "contactPhone", labels: { he: "טלפון", en: "Phone" } },
    ],
  },
];

const PATIENT_SECTIONS: FormSectionConfig[] = [
  {
    id: "personal-details",
    titles: {
      he: "פרטים אישיים",
      en: "Personal Details",
    },
    fields: [
      { key: "fullName", labels: { he: "שם מלא", en: "Full name" } },
      { key: "gender", labels: { he: "מין", en: "Gender" } },
      { key: "age", labels: { he: "גיל", en: "Age" } },
      { key: "email", labels: { he: "אימייל", en: "Email" } },
      { key: "phone", labels: { he: "טלפון", en: "Phone" } },
      { key: "city", labels: { he: "עיר מגורים", en: "City" } },
    ],
  },
  {
    id: "medical-background",
    titles: {
      he: "רקע רפואי ופיזי",
      en: "Medical Background",
    },
    fields: [
      {
        key: "chronicIllnesses",
        labels: {
          he: "מחלות כרוניות או מגבלות פיזיות",
          en: "Chronic illnesses or physical limitations",
        },
      },
      {
        key: "medicationHistory",
        labels: {
          he: "תרופות (נוכחיות או בעבר)",
          en: "Medication history",
        },
      },
    ],
  },
  {
    id: "mental-history",
    titles: {
      he: "היסטוריה טיפולית ונפשית",
      en: "Therapeutic & Mental History",
    },
    fields: [
      {
        key: "mentalTreatment",
        labels: { he: "תהליך טיפולי נפשי/פסיכולוגי", en: "Mental treatment history" },
      },
      {
        key: "previousRetreats",
        labels: { he: "ריטריטים או תהליכי ריפוי קודמים", en: "Previous retreats/healing processes" },
      },
      {
        key: "ptsdDiagnosis",
        labels: { he: "אבחנת PTSD או הפרעה אחרת", en: "PTSD or other diagnosis" },
      },
      {
        key: "psychiatricMedication",
        labels: { he: "תרופות פסיכיאטריות", en: "Psychiatric medication" },
      },
      {
        key: "hospitalizations",
        labels: {
          he: "אשפוזים פסיכיאטריים/ניסיונות התאבדות/התמוטטויות",
          en: "Psychiatric hospitalizations/suicidality/breakdowns",
        },
      },
      { key: "addictions", labels: { he: "התמכרויות", en: "Addictions" } },
    ],
  },
  {
    id: "support-readiness",
    titles: {
      he: "הכוונה, תמיכה ומוכנות",
      en: "Guidance, Support & Readiness",
    },
    fields: [
      {
        key: "reasonForHealing",
        labels: { he: "סיבת הפנייה", en: "Reason for healing" },
      },
      { key: "supportSystem", labels: { he: "מערכת תמיכה", en: "Support system" } },
      {
        key: "readinessLevel",
        labels: { he: "רמת מוכנות לתהליך", en: "Readiness level" },
      },
      {
        key: "expectations",
        labels: { he: "ציפיות מהתהליך", en: "Expectations" },
      },
      {
        key: "currentSituation",
        labels: { he: "מצב חיים נוכחי", en: "Current life situation" },
      },
    ],
  },
  {
    id: "consent",
    titles: {
      he: "הסכמות",
      en: "Consent",
    },
    fields: [
      {
        key: "privacyConsent",
        labels: { he: "הסכמה לפרטיות", en: "Privacy consent" },
      },
    ],
  },
];

const SECTION_CONFIG_BY_TYPE: Record<SubmissionType, FormSectionConfig[]> = {
  healer: HEALER_SECTIONS,
  patient: PATIENT_SECTIONS,
};

function normalizeLocale(locale: string): SupportedLocale {
  return locale.startsWith("he") ? "he" : "en";
}

function localizeText(text: LocalizedText, locale: SupportedLocale): string {
  return text[locale];
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isStructuredValue(value: unknown): boolean {
  return Array.isArray(value) || isPlainObject(value);
}

export function isEmptyValue(value: unknown): boolean {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === "string") {
    return value.trim().length === 0;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (isPlainObject(value)) {
    return Object.keys(value).length === 0;
  }

  return false;
}

function humanizeKey(key: string): string {
  const spaced = key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!spaced) {
    return key;
  }

  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export function formatFieldValue(
  key: string,
  value: unknown,
  localeInput: string,
): string {
  const locale = normalizeLocale(localeInput);

  if (key === "gender" && typeof value === "string") {
    return GENDER_LABELS[locale][value] ?? value;
  }

  if (typeof value === "boolean") {
    return value ? YES_NO_LABELS[locale].yes : YES_NO_LABELS[locale].no;
  }

  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (isStructuredValue(value)) {
    try {
      return JSON.stringify(value, null, 2);
    } catch {
      return String(value);
    }
  }

  return String(value);
}

export function buildReadableFormSections(
  submissionType: SubmissionType,
  formData: Record<string, unknown> | null,
  localeInput: string,
): ReadableFormSection[] {
  if (!formData || !isPlainObject(formData)) {
    return [];
  }

  const locale = normalizeLocale(localeInput);
  const sectionConfigs = SECTION_CONFIG_BY_TYPE[submissionType];
  const knownKeys = new Set(sectionConfigs.flatMap((section) => section.fields.map((field) => field.key)));

  const sections: ReadableFormSection[] = sectionConfigs
    .map((section) => {
      const fields = section.fields
        .map((field) => {
          const rawValue = formData[field.key];

          if (isEmptyValue(rawValue)) {
            return null;
          }

          return {
            key: field.key,
            label: localizeText(field.labels, locale),
            value: formatFieldValue(field.key, rawValue, locale),
            isStructuredValue: isStructuredValue(rawValue),
          };
        })
        .filter((field): field is ReadableFormField => field !== null);

      return {
        id: section.id,
        title: localizeText(section.titles, locale),
        fields,
      };
    })
    .filter((section) => section.fields.length > 0);

  const additionalFields = Object.entries(formData)
    .filter(([key, value]) => !knownKeys.has(key) && !isEmptyValue(value))
    .map(([key, value]) => ({
      key,
      label: humanizeKey(key),
      value: formatFieldValue(key, value, locale),
      isStructuredValue: isStructuredValue(value),
    }));

  if (additionalFields.length > 0) {
    sections.push({
      id: "additional-fields",
      title: localizeText(ADDITIONAL_FIELDS_TITLE, locale),
      fields: additionalFields,
    });
  }

  return sections;
}
