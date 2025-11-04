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

export default function VolunteerHealerForm() {
  const params = useParams();
  const router = useRouter();
  const locale = (params.locale as string) || "he";
  const isHebrew = locale === "he";
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const shamanicExperienceRef = useRef<HTMLTextAreaElement>(null);
  const [formData, setFormData] = useState({
    // Step 1: Personal & Professional Background
    fullName: "",
    age: "",
    mainProfession: "",
    treatments: "",
    // Step 2: Experience & Expertise
    traumaExperience: "",
    retreatExperience: "",
    teamExperience: "",
    // Step 3: Motivation & Self-Assessment
    motivation: "",
    strengths: "",
    weaknesses: "",
    extremeTools: "",
    // Step 4: Specialized Knowledge & Personal Journey
    shamanicExperience: "",
    personalJourney: "",
    priorities: "",
    availability: "",
    teamNature: "",
    contactEmail: "",
    contactPhone: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const nextStep = () => {
    if (currentStep < 3) {
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

  // Prevent auto-focus on shamanicExperience field (step 3)
  useEffect(() => {
    if (currentStep === 3 && shamanicExperienceRef.current) {
      // Blur the field after a short delay to override browser auto-focus
      setTimeout(() => {
        if (shamanicExperienceRef.current) {
          shamanicExperienceRef.current.blur();
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
      if (!formData.fullName || !formData.contactPhone) {
        setSubmitError(
          isHebrew
            ? "שם מלא ומספר טלפון הם שדות חובה"
            : "Full name and phone number are required",
        );
        setIsSubmitting(false);
        return;
      }

      const response = await fetch("/api/forms/healer", {
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
      title:
        isHebrew
          ? "רקע אישי ומקצועי"
          : "Personal & Professional Background",
      titleEn: "Background",
    },
    {
      title: isHebrew ? "ניסיון ומומחיות" : "Experience & Expertise",
      titleEn: "Experience",
    },
    {
      title:
        isHebrew
          ? "מוטיבציה והערכה עצמית"
          : "Motivation & Self-Assessment",
      titleEn: "Motivation",
    },
    {
      title:
        isHebrew
          ? "ידע מיוחד ומסע אישי"
          : "Specialized Knowledge & Personal Journey",
      titleEn: "Knowledge",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {isHebrew
                ? "שאלון מיון למטפלים"
                : "Therapist Screening Form"}
            </h1>
            <p className="text-lg text-gray-600">
              {isHebrew
                ? "שאלון מיון לצוות המטפלים של ריטריט שומרי השבט"
                : "Screening questionnaire for The Tribe Guardians retreat therapy team"}
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

          {/* Form Steps */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal & Professional Background */}
              {currentStep === 0 && (
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
                      {isHebrew
                        ? "מקצוע עיקרי והסמכות מקצועיות *"
                        : "Main Profession and Professional Certifications *"}
                    </label>
                    <textarea
                      value={formData.mainProfession}
                      onChange={(e) =>
                        updateField("mainProfession", e.target.value)
                      }
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      lang={locale}
                      dir={isHebrew ? "rtl" : "ltr"}
                      placeholder={
                        isHebrew
                          ? "פרט את המקצוע העיקרי וההסמכות המקצועיות שלך..."
                          : "Detail your main profession and professional certifications..."
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isHebrew
                        ? "סוגי טיפולים, הכשרות ושיטות טיפול בהן אתה מוסמך *"
                        : "Types of Treatments, Training, and Therapeutic Methods You Are Certified In *"}
                    </label>
                    <textarea
                      value={formData.treatments}
                      onChange={(e) =>
                        updateField("treatments", e.target.value)
                      }
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      lang={locale}
                      dir={isHebrew ? "rtl" : "ltr"}
                      placeholder={
                        isHebrew
                          ? "פרט את כל סוגי הטיפולים, ההכשרות ושיטות הטיפול..."
                          : "Detail all types of treatments, training, and therapeutic methods..."
                      }
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Experience & Expertise */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {steps[1].title}
                  </h2>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isHebrew
                        ? "ניסיון טיפולי בשטח מול אוכלוסיות פוסט טראומטיות *"
                        : "Therapeutic Field Experience with Post-Traumatic Populations *"}
                    </label>
                    <textarea
                      value={formData.traumaExperience}
                      onChange={(e) =>
                        updateField("traumaExperience", e.target.value)
                      }
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      lang={locale}
                      dir={isHebrew ? "rtl" : "ltr"}
                      placeholder={
                        isHebrew
                          ? "תאר את הניסיון הטיפולי שלך מול אוכלוסיות פוסט טראומטיות..."
                          : "Describe your therapeutic experience with post-traumatic populations..."
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isHebrew
                        ? 'ניסיון בריטריטים/טקסים קבוצתיים, בארץ ובחו"ל *'
                        : "Experience in Retreats/Group Ceremonies, in Israel and Abroad *"}
                    </label>
                    <textarea
                      value={formData.retreatExperience}
                      onChange={(e) =>
                        updateField("retreatExperience", e.target.value)
                      }
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      lang={locale}
                      dir={isHebrew ? "rtl" : "ltr"}
                      placeholder={
                        isHebrew
                          ? "פרט את הניסיון שלך בריטריטים וטקסים קבוצתיים..."
                          : "Detail your experience in retreats and group ceremonies..."
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isHebrew
                        ? "ניסיון עבודה עם צוות רב-מקצועי/רב-דורי *"
                        : "Experience Working with Multidisciplinary/Multigenerational Teams *"}
                    </label>
                    <textarea
                      value={formData.teamExperience}
                      onChange={(e) =>
                        updateField("teamExperience", e.target.value)
                      }
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      lang={locale}
                      dir={isHebrew ? "rtl" : "ltr"}
                      placeholder={
                        isHebrew
                          ? "תאר את הניסיון שלך בעבודה עם צוותים רב-מקצועיים ורב-דוריים..."
                          : "Describe your experience working with multidisciplinary and multigenerational teams..."
                      }
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Motivation & Self-Assessment */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {steps[2].title}
                  </h2>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isHebrew
                        ? "מה מושך אותך להשתלב בפרויקט? *"
                        : "What Attracts You to Join This Project? *"}
                    </label>
                    <textarea
                      value={formData.motivation}
                      onChange={(e) =>
                        updateField("motivation", e.target.value)
                      }
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      lang={locale}
                      dir={isHebrew ? "rtl" : "ltr"}
                      placeholder={
                        isHebrew
                          ? "תאר מה מושך אותך להשתלב בפרויקט הזה..."
                          : "Describe what attracts you to join this project..."
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isHebrew
                        ? "מה החוזקות שלך כאיש/אשת טיפול? *"
                        : "What Are Your Strengths as a Therapist? *"}
                    </label>
                    <textarea
                      value={formData.strengths}
                      onChange={(e) => updateField("strengths", e.target.value)}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      lang={locale}
                      dir={isHebrew ? "rtl" : "ltr"}
                      placeholder={
                        isHebrew
                          ? "תאר את החוזקות שלך כמטפל/ת..."
                          : "Describe your strengths as a therapist..."
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isHebrew
                        ? "מהן חולשות/אתגרים שאתה פוגש בעבודת צוות או טיפול? *"
                        : "What Are Weaknesses/Challenges You Encounter in Teamwork or Therapy? *"}
                    </label>
                    <textarea
                      value={formData.weaknesses}
                      onChange={(e) =>
                        updateField("weaknesses", e.target.value)
                      }
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      lang={locale}
                      dir={isHebrew ? "rtl" : "ltr"}
                      placeholder={
                        isHebrew
                          ? "שתף באופן כן וישיר על האתגרים והחולשות..."
                          : "Share honestly and directly about challenges and weaknesses..."
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isHebrew
                        ? "באילו כלים אתה משתמש בעבודה עם מצבי קיצון רגשיים או התפרקות נפשית? *"
                        : "What Tools Do You Use When Working with Emotional Extremes or Mental Breakdown? *"}
                    </label>
                    <textarea
                      value={formData.extremeTools}
                      onChange={(e) =>
                        updateField("extremeTools", e.target.value)
                      }
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      lang={locale}
                      dir={isHebrew ? "rtl" : "ltr"}
                      placeholder={
                        isHebrew
                          ? "פרט את הכלים והשיטות שאתה משתמש בהם..."
                          : "Detail the tools and methods you use..."
                      }
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Specialized Knowledge & Personal Journey */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {steps[3].title}
                  </h2>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isHebrew
                        ? "האם יש לך הכשרה או ניסיון רלוונטי לטיפול בפטריות/מדיסין/תהליכים שמאניים? *"
                        : "Do You Have Training or Relevant Experience in Mushroom/Medicine/Shamanic Processes? *"}
                    </label>
                    <textarea
                      ref={shamanicExperienceRef}
                      value={formData.shamanicExperience}
                      onChange={(e) =>
                        updateField("shamanicExperience", e.target.value)
                      }
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      lang={locale}
                      dir={isHebrew ? "rtl" : "ltr"}
                      placeholder={
                        isHebrew
                          ? "פרט את ההכשרה והניסיון שלך בתחום..."
                          : "Detail your training and experience in this field..."
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isHebrew
                        ? "האם עברת תהליכים אישיים משמעותיים או טיפול/ריטריט אישי מרפא? *"
                        : "Have You Undergone Significant Personal Processes or Healing Therapy/Retreat? *"}
                    </label>
                    <textarea
                      value={formData.personalJourney}
                      onChange={(e) =>
                        updateField("personalJourney", e.target.value)
                      }
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      lang={locale}
                      dir={isHebrew ? "rtl" : "ltr"}
                      placeholder={
                        isHebrew
                          ? "שתף על המסע האישי הטיפולי שלך..."
                          : "Share about your personal therapeutic journey..."
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isHebrew
                        ? "מהו סדר עדיפויות פנימי שלך כשותף בפרויקט (משמעות, כסף, מקצועיות, קהילה)? *"
                        : "What Is Your Internal Priority Order as a Partner in the Project (Meaning, Money, Professionalism, Community)? *"}
                    </label>
                    <textarea
                      value={formData.priorities}
                      onChange={(e) =>
                        updateField("priorities", e.target.value)
                      }
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      lang={locale}
                      dir={isHebrew ? "rtl" : "ltr"}
                      placeholder={
                        isHebrew
                          ? "תאר את סדר העדיפויות הפנימי שלך..."
                          : "Describe your internal priority order..."
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isHebrew
                        ? "האם יש לך זמינות להשתתף במפגשים קבוצתיים, הכשרות וסופרוויז'ן? *"
                        : "Do You Have Availability to Participate in Group Meetings, Training, and Supervision? *"}
                    </label>
                    <textarea
                      value={formData.availability}
                      onChange={(e) =>
                        updateField("availability", e.target.value)
                      }
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      lang={locale}
                      dir={isHebrew ? "rtl" : "ltr"}
                      placeholder={
                        isHebrew
                          ? "פרט את הזמינות שלך למפגשים, הכשרות וסופרוויז'ן..."
                          : "Detail your availability for meetings, training, and supervision..."
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isHebrew
                        ? "מה לדעתך חשוב במיוחד באופי הצוות ובאופי הטיפול בפרויקט מסוג זה? *"
                        : "What Do You Think Is Especially Important in the Nature of the Team and Treatment in This Type of Project? *"}
                    </label>
                    <textarea
                      value={formData.teamNature}
                      onChange={(e) =>
                        updateField("teamNature", e.target.value)
                      }
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      lang={locale}
                      dir={isHebrew ? "rtl" : "ltr"}
                      placeholder={
                        isHebrew
                          ? "שתף את דעתך על אופי הצוות והטיפול..."
                          : "Share your thoughts on team and treatment nature..."
                      }
                      required
                    />
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {isHebrew
                        ? "פרטי יצירת קשר"
                        : "Contact Information"}
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {isHebrew
                            ? "כתובת אימייל *"
                            : "Email Address *"}
                        </label>
                        <input
                          type="email"
                          value={formData.contactEmail}
                          onChange={(e) =>
                            updateField("contactEmail", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={
                            isHebrew
                              ? "example@email.com"
                              : "example@email.com"
                          }
                          lang={locale}
                          dir={isHebrew ? "rtl" : "ltr"}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {isHebrew
                            ? "טלפון ליצירת קשר *"
                            : "Contact Phone *"}
                        </label>
                        <input
                          type="tel"
                          value={formData.contactPhone}
                          onChange={(e) =>
                            updateField("contactPhone", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          lang={locale}
                          dir={isHebrew ? "rtl" : "ltr"}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
