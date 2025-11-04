"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function RegisterPatientForm() {
  const params = useParams();
  const router = useRouter();
  const locale = (params.locale as string) || "he";
  const isHebrew = locale === "he";
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const reasonForHealingRef = useRef<HTMLTextAreaElement>(null);
  const [formData, setFormData] = useState({
    // Step 1: Personal Details
    fullName: "",
    age: "",
    phone: "",
    city: "",
    // Step 2: Medical Background
    chronicIllnesses: "",
    medicationHistory: "",
    // Step 3: Therapeutic History
    mentalTreatment: "",
    previousRetreats: "",
    ptsdDiagnosis: "",
    psychiatricMedication: "",
    hospitalizations: "",
    addictions: "",
    // Step 4: Guidelines & Support
    reasonForHealing: "",
    supportSystem: "",
    readinessLevel: "",
    expectations: "",
    currentSituation: "",
    // Privacy consent
    privacyConsent: false,
  });

  const updateField = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      // Scroll to top when navigating to next step
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // Scroll to top when navigating to previous step
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  // Prevent auto-focus on reasonForHealing field (step 3)
  useEffect(() => {
    if (currentStep === 3 && reasonForHealingRef.current) {
      // Blur the field after a short delay to override browser auto-focus
      setTimeout(() => {
        if (reasonForHealingRef.current) {
          reasonForHealingRef.current.blur();
        }
      }, 100);
    }
  }, [currentStep]);

  // Navigate to home page after successful submission
  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => {
        router.push(`/${locale}`);
      }, 3000); // Navigate after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [submitSuccess, router, locale]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      // Basic validation
      if (!formData.fullName || !formData.phone) {
        setSubmitError(
          isHebrew
            ? "שם מלא ומספר טלפון הם שדות חובה"
            : "Full name and phone number are required",
        );
        setIsSubmitting(false);
        return;
      }

      if (!formData.privacyConsent) {
        setSubmitError(
          isHebrew
            ? "יש לאשר את הסכמת הפרטיות"
            : "You must consent to privacy policy",
        );
        setIsSubmitting(false);
        return;
      }

      const response = await fetch("/api/forms/patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "שגיאה בשליחת הטופס");
      }

      setSubmitSuccess(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error("Error submitting form:", error);
      setSubmitError(
        errorMessage ||
          (isHebrew
            ? "שגיאה בשליחת הטופס. אנא נסה שוב."
            : "Error submitting form. Please try again."),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    {
      title: isHebrew ? "פרטים אישיים" : "Personal Details",
      titleEn: "Personal Details",
    },
    {
      title:
        isHebrew ? "רקע רפואי ופיזי" : "Medical and Physical Background",
      titleEn: "Medical Background",
    },
    {
      title:
        isHebrew
          ? "היסטוריה טיפולית ונפשית"
          : "Therapeutic and Mental History",
      titleEn: "Mental History",
    },
    {
      title:
        isHebrew
          ? "הכוונה, תמיכה ומוכנות"
          : "Guidelines, Support, and Readiness",
      titleEn: "Readiness & Support",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {isHebrew ? "הרשמה כמטופל" : "Patient Registration"}
            </h1>
            <p className="text-lg text-gray-600">
              {isHebrew
                ? "אנא מלא את כל השדות בקפידה. המידע מיועד לצוות המקצועי בלבד."
                : "Please fill out all fields carefully. Information is for professional staff only."}
            </p>
          </div>

          {/* Error Messages */}
          {submitError && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {submitError}
            </div>
          )}

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      index <= currentStep
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-1 mx-2 ${
                        index < currentStep ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {steps.map((step, index) => (
                <div key={index} className="text-xs text-center w-24">
                  {isHebrew ? step.title : step.titleEn}
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Notice - Show before Step 1 */}
          {currentStep === 0 && !formData.privacyConsent && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {isHebrew
                  ? "הודעת פרטיות והסכמה"
                  : "Privacy Notice and Consent"}
              </h3>
              <div className="text-sm text-gray-700 mb-4 space-y-2">
                {isHebrew ? (
                  <>
                    <p>
                      מידע זה נאסף למטרות רפואיות וטיפוליות בלבד ויישמר בסודיות
                      מלאה.
                    </p>
                    <p>
                      הנתונים שלך מאובטחים ומוגנים בהתאם לתקנות הגנת הפרטיות
                      והיפא (HIPAA).
                    </p>
                    <p>רק צוות מקצועי מורשה יוכל לגשת למידע שלך.</p>
                  </>
                ) : (
                  <>
                    <p>
                      This information is collected for medical and therapeutic
                      purposes only and will be kept strictly confidential.
                    </p>
                    <p>
                      Your data is secured and protected in accordance with
                      privacy regulations and HIPAA.
                    </p>
                    <p>
                      Only authorized professional staff will have access to
                      your information.
                    </p>
                  </>
                )}
              </div>
              <label className="flex items-start space-x-3 space-x-reverse">
                <input
                  type="checkbox"
                  checked={formData.privacyConsent}
                  onChange={(e) =>
                    updateField("privacyConsent", e.target.checked)
                  }
                  className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  required
                />
                <span className="text-sm text-gray-800">
                  {isHebrew
                    ? "אני מסכים/ה לאיסוף ועיבוד של מידע רפואי רגיש לצורך תהליך הריפוי"
                    : "I consent to the collection and processing of sensitive medical information for the healing process"}
                </span>
              </label>
            </div>
          )}

          {/* Form Steps */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Details */}
              {currentStep === 0 && formData.privacyConsent && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {steps[0].title}
                  </h2>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isHebrew ? "שם מלא *" : "Full Name *"}
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => updateField("fullName", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      lang={locale}
                      dir={isHebrew ? "rtl" : "ltr"}
                      placeholder={
                        isHebrew
                          ? "הכנס את שמך המלא"
                          : "Enter your full name"
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isHebrew ? "גיל *" : "Age *"}
                    </label>
                    <input
                      type="text"
                      value={formData.age}
                      onChange={(e) => updateField("age", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      lang={locale}
                      dir={isHebrew ? "rtl" : "ltr"}
                      placeholder={
                        isHebrew ? "הכנס את גילך" : "Enter your age"
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isHebrew ? "טלפון *" : "Phone *"}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      lang={locale}
                      dir={isHebrew ? "rtl" : "ltr"}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isHebrew ? "עיר מגורים *" : "City of Residence *"}
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      lang={locale}
                      dir={isHebrew ? "rtl" : "ltr"}
                      placeholder={
                        isHebrew
                          ? "הכנס את עיר מגוריך"
                          : "Enter your city of residence"
                      }
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Medical Background */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {steps[1].title}
                  </h2>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isHebrew
                        ? "האם יש לך מחלות כרוניות או מגבלות פיזיות? פירוט *"
                        : "Do you have any chronic illnesses or physical limitations? Details *"}
                    </label>
                    <textarea
                      value={formData.chronicIllnesses}
                      onChange={(e) =>
                        updateField("chronicIllnesses", e.target.value)
                      }
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      lang={locale}
                      dir={isHebrew ? "rtl" : "ltr"}
                      placeholder={
                        isHebrew
                          ? "אנא תאר בפירוט כל מחלה כרונית או מגבלה פיזית..."
                          : "Please describe in detail any chronic illness or physical limitation..."
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isHebrew
                        ? "האם אתה נוטל/ת תרופות כרגע או שנטלת בעבר? אנא פרט מאוד *"
                        : "Are you currently taking medication or have you taken it in the past? Please be very specific *"}
                    </label>
                    <p className="text-xs text-gray-500 mb-2">
                      {isHebrew
                        ? "סוג התרופה, תקופה, סיבה"
                        : "Type of medication, period, reason"}
                    </p>
                    <textarea
                      value={formData.medicationHistory}
                      onChange={(e) =>
                        updateField("medicationHistory", e.target.value)
                      }
                      rows={8}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      lang={locale}
                      dir={isHebrew ? "rtl" : "ltr"}
                      placeholder={
                        isHebrew
                          ? "אנא פרט: סוג התרופה, התקופה בה נטלת אותה, והסיבה למתן התרופה..."
                          : "Please specify: type of medication, period taken, and reason for medication..."
                      }
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Therapeutic History */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {steps[2].title}
                  </h2>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isHebrew
                        ? "האם עברת או עובר/ת תהליך טיפולי נפשי/פסיכולוגי? אנא פרט את סוג הטיפול, תקופה, מסגרת *"
                        : "Have you undergone or are undergoing mental/psychological treatment? Please specify type, period, setting *"}
                    </label>
                    <textarea
                      value={formData.mentalTreatment}
                      onChange={(e) =>
                        updateField("mentalTreatment", e.target.value)
                      }
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      lang={locale}
                      dir={isHebrew ? "rtl" : "ltr"}
                      placeholder={
                        isHebrew
                          ? "סוג הטיפול, תקופה, מסגרת..."
                          : "Type of treatment, period, setting..."
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isHebrew
                        ? "באילו רטריטים או תהליכי ריפוי אישיים או קבוצתיים השתתפת? אנא פרט *"
                        : "What retreats or personal/group healing processes have you participated in? Please specify *"}
                    </label>
                    <p className="text-xs text-gray-500 mb-2">
                      {isHebrew
                        ? "שם הרטריט/תהליך, סוג, תאריך, שם המנחה אם רלוונטי"
                        : "Name of retreat/process, type, date, facilitator name if applicable"}
                    </p>
                    <textarea
                      value={formData.previousRetreats}
                      onChange={(e) =>
                        updateField("previousRetreats", e.target.value)
                      }
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      lang={locale}
                      dir={isHebrew ? "rtl" : "ltr"}
                      placeholder={
                        isHebrew
                          ? "שם הרטריט/תהליך, סוג, תאריך, שם המנחה..."
                          : "Name, type, date, facilitator..."
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isHebrew
                        ? "האם אובחנת בעבר או בהווה עם הפרעת דחק פוסט-טראומטית או הפרעה נפשית אחרת? *"
                        : "Have you been diagnosed with PTSD or another mental disorder in the past or present? *"}
                    </label>
                    <p className="text-xs text-gray-500 mb-2">
                      {isHebrew
                        ? "פרטי האבחנה, תקופה, גורם מאבחן"
                        : "Details of diagnosis, period, diagnostic factor"}
                    </p>
                    <textarea
                      value={formData.ptsdDiagnosis}
                      onChange={(e) =>
                        updateField("ptsdDiagnosis", e.target.value)
                      }
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      lang={locale}
                      dir={isHebrew ? "rtl" : "ltr"}
                      placeholder={
                        isHebrew
                          ? "פרטי האבחנה, תקופה, גורם מאבחן..."
                          : "Diagnosis details, period, diagnostic factor..."
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isHebrew
                        ? "האם אתה נוטל או נטלת בעבר תרופות פסיכיאטריות? אנא פרט *"
                        : "Are you taking or have you taken psychiatric medication in the past? Please specify *"}
                    </label>
                    <textarea
                      value={formData.psychiatricMedication}
                      onChange={(e) =>
                        updateField("psychiatricMedication", e.target.value)
                      }
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      lang={locale}
                      dir={isHebrew ? "rtl" : "ltr"}
                      placeholder={
                        isHebrew
                          ? "סוג התרופה, תקופה, מינון..."
                          : "Type of medication, period, dosage..."
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isHebrew
                        ? "האם היו אשפוזים פסיכיאטריים, ניסיונות התאבדות או התמוטטויות נפשיות חריפות (עבר/הווה)? אנא פרט *"
                        : "Have there been any psychiatric hospitalizations, suicide attempts, or acute mental breakdowns (past/present)? Please specify *"}
                    </label>
                    <textarea
                      value={formData.hospitalizations}
                      onChange={(e) =>
                        updateField("hospitalizations", e.target.value)
                      }
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      lang={locale}
                      dir={isHebrew ? "rtl" : "ltr"}
                      placeholder={
                        isHebrew
                          ? "פירוט מלא של מקרים, תקופות, נסיבות..."
                          : "Full details of incidents, periods, circumstances..."
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isHebrew
                        ? "האם יש התמכרויות פעילות או עבר (אלכוהול/סמים/אחר)? אנא פרט *"
                        : "Are there any active or past addictions (alcohol/drugs/other)? Please specify *"}
                    </label>
                    <textarea
                      value={formData.addictions}
                      onChange={(e) =>
                        updateField("addictions", e.target.value)
                      }
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      lang={locale}
                      dir={isHebrew ? "rtl" : "ltr"}
                      placeholder={
                        isHebrew
                          ? "סוג ההתמכרות, תקופה, מצב נוכחי..."
                          : "Type of addiction, period, current status..."
                      }
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Guidelines & Support */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {steps[3].title}
                  </h2>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isHebrew
                        ? "מהי הסיבה שבגללה אתה מבקש לעבור תהליך ריפוי? *"
                        : "What is the reason you are seeking to undergo a healing process? *"}
                    </label>
                    <textarea
                      ref={reasonForHealingRef}
                      value={formData.reasonForHealing}
                      onChange={(e) =>
                        updateField("reasonForHealing", e.target.value)
                      }
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      lang={locale}
                      dir={isHebrew ? "rtl" : "ltr"}
                      placeholder={
                        isHebrew
                          ? "תאר את הסיבה המרכזית לפנייתך..."
                          : "Describe the main reason for your request..."
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isHebrew
                        ? "האם יש לך מישהו שתומך בך בתהליך? *"
                        : "Do you have someone who supports you in the process? *"}
                    </label>
                    <textarea
                      value={formData.supportSystem}
                      onChange={(e) =>
                        updateField("supportSystem", e.target.value)
                      }
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      lang={locale}
                      dir={isHebrew ? "rtl" : "ltr"}
                      placeholder={
                        isHebrew
                          ? "מי תומך בך? משפחה, חברים, מטפל..."
                          : "Who supports you? Family, friends, therapist..."
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      {isHebrew
                        ? "עד כמה אתה מרגיש מוכן להתחייב למסע טיפולי אינטנסיבי הדורש התמודדות ומשאבים נפשיים? *"
                        : "To what extent do you feel ready to commit to an intensive therapeutic journey that requires coping and mental resources? *"}
                    </label>
                    <div className="space-y-2">
                      {[
                        {
                          value: "not-at-all",
                          labelHe: "לא בכלל",
                          labelEn: "Not at all",
                        },
                        {
                          value: "a-little",
                          labelHe: "מעט",
                          labelEn: "A little",
                        },
                        {
                          value: "medium",
                          labelHe: "בינוני",
                          labelEn: "Medium",
                        },
                        { value: "a-lot", labelHe: "הרבה", labelEn: "A lot" },
                        {
                          value: "completely",
                          labelHe: "לחלוטין",
                          labelEn: "Completely",
                        },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className="flex items-center space-x-3 space-x-reverse"
                        >
                          <input
                            type="radio"
                            name="readinessLevel"
                            value={option.value}
                            checked={formData.readinessLevel === option.value}
                            onChange={(e) =>
                              updateField("readinessLevel", e.target.value)
                            }
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            required
                          />
                          <span className="text-sm text-gray-700">
                            {isHebrew ? option.labelHe : option.labelEn}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isHebrew
                        ? "מהן הציפיות שלך מתהליך הריפוי שאתה יוצא אליו? מה אתה מחפש לפגוש? לקבל? מה חסר בתהליכי הריפוי שנתקלת בהם בעבר? *"
                        : "What are your expectations from the healing process you are embarking on? What are you looking to meet? To receive? What was missing from past healing processes? *"}
                    </label>
                    <textarea
                      value={formData.expectations}
                      onChange={(e) =>
                        updateField("expectations", e.target.value)
                      }
                      rows={8}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      lang={locale}
                      dir={isHebrew ? "rtl" : "ltr"}
                      placeholder={
                        isHebrew
                          ? "תאר את הציפיות, הצרכים והחוויות הקודמות שלך..."
                          : "Describe your expectations, needs, and past experiences..."
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isHebrew
                        ? "ספר/י לנו על מצב חייך הנוכחי, האתגרים שלך, מה את/ה מחפש/ת במסע הקרוב, ומה תרצה שהצוות ידע עליך כדי לתמוך בך בתהליך *"
                        : "Tell us about your current life situation, your challenges, what you are looking for in your upcoming journey, and what you would like staff to know about you *"}
                    </label>
                    <textarea
                      value={formData.currentSituation}
                      onChange={(e) =>
                        updateField("currentSituation", e.target.value)
                      }
                      rows={10}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      lang={locale}
                      dir={isHebrew ? "rtl" : "ltr"}
                      placeholder={
                        isHebrew
                          ? "שתף/י איתנו באופן פתוח ומפורט..."
                          : "Share with us openly and in detail..."
                      }
                      required
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={currentStep === 0 && !formData.privacyConsent}
                    className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    tabIndex={1}
                  >
                    {isHebrew ? "הבא" : "Next"}
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="ml-auto px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    tabIndex={1}
                  >
                    {isSubmitting
                      ? isHebrew
                        ? "שולח..."
                        : "Submitting..."
                      : isHebrew
                        ? "שלח טופס"
                        : "Submit Form"}
                  </button>
                )}

                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    tabIndex={2}
                  >
                    {isHebrew ? "הקודם" : "Previous"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={submitSuccess} onOpenChange={() => {}}>
        <DialogContent className="text-center">
          <DialogHeader>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <DialogTitle>
              {isHebrew
                ? "הטופס נשלח בהצלחה!"
                : "Form Submitted Successfully!"}
            </DialogTitle>
            <DialogDescription className="mt-2">
              {isHebrew
                ? "תודה על השלמת הטופס. נחזור אליך בהקדם האפשרי."
                : "Thank you for submitting the form. We will get back to you as soon as possible."}
            </DialogDescription>
            <p className="text-sm text-gray-500 mt-4">
              {isHebrew
                ? "מעבירים אותך לדף הבית..."
                : "Redirecting to home page..."}
            </p>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
