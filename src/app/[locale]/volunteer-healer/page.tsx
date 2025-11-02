'use client'

import { useState } from 'react'

export default function VolunteerHealerForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    // Step 1: Personal & Professional Background
    fullName: '',
    age: '',
    mainProfession: '',
    treatments: '',
    // Step 2: Experience & Expertise
    traumaExperience: '',
    retreatExperience: '',
    teamExperience: '',
    // Step 3: Motivation & Self-Assessment
    motivation: '',
    strengths: '',
    weaknesses: '',
    extremeTools: '',
    // Step 4: Specialized Knowledge & Personal Journey
    shamanicExperience: '',
    personalJourney: '',
    priorities: '',
    availability: '',
    teamNature: '',
    contactEmail: '',
    contactPhone: ''
  })

  const [locale] = useState('he') // You can get this from URL or context

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert(locale === 'he' ? 'הטופס נשלח בהצלחה!' : 'Form submitted successfully!')
  }

  const steps = [
    {
      title: locale === 'he' ? 'רקע אישי ומקצועי' : 'Personal & Professional Background',
      titleEn: 'Background'
    },
    {
      title: locale === 'he' ? 'ניסיון ומומחיות' : 'Experience & Expertise',
      titleEn: 'Experience'
    },
    {
      title: locale === 'he' ? 'מוטיבציה והערכה עצמית' : 'Motivation & Self-Assessment',
      titleEn: 'Motivation'
    },
    {
      title: locale === 'he' ? 'ידע מיוחד ומסע אישי' : 'Specialized Knowledge & Personal Journey',
      titleEn: 'Knowledge'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {locale === 'he' ? 'שאלון מיון למטפלים' : 'Therapist Screening Form'}
            </h1>
            <p className="text-lg text-gray-600">
              {locale === 'he' 
                ? 'שאלון מיון לצוות המטפלים של ריטריט ערבות השבט' 
                : 'Screening questionnaire for Arvut Tribe retreat therapy team'}
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      index <= currentStep
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-1 mx-2 ${
                        index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {steps.map((step, index) => (
                <div key={index} className="text-xs text-center w-24">
                  {locale === 'he' ? step.title : step.titleEn}
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
                      {locale === 'he' ? 'שם מלא *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={locale === 'he' ? 'הכנס את שמך המלא' : 'Enter your full name'}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {locale === 'he' ? 'גיל *' : 'Age *'}
                    </label>
                    <input
                      type="text"
                      value={formData.age}
                      onChange={(e) => updateField('age', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={locale === 'he' ? 'הכנס את גילך' : 'Enter your age'}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {locale === 'he' ? 'מקצוע עיקרי והסמכות מקצועיות *' : 'Main Profession and Professional Certifications *'}
                    </label>
                    <textarea
                      value={formData.mainProfession}
                      onChange={(e) => updateField('mainProfession', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={locale === 'he' 
                        ? 'פרט את המקצוע העיקרי וההסמכות המקצועיות שלך...'
                        : 'Detail your main profession and professional certifications...'}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {locale === 'he' ? 'סוגי טיפולים, הכשרות ושיטות טיפול בהן אתה מוסמך *' : 'Types of Treatments, Training, and Therapeutic Methods You Are Certified In *'}
                    </label>
                    <textarea
                      value={formData.treatments}
                      onChange={(e) => updateField('treatments', e.target.value)}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={locale === 'he' 
                        ? 'פרט את כל סוגי הטיפולים, ההכשרות ושיטות הטיפול...'
                        : 'Detail all types of treatments, training, and therapeutic methods...'}
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
                      {locale === 'he' 
                        ? 'ניסיון טיפולי בשטח מול אוכלוסיות פוסט טראומטיות *' 
                        : 'Therapeutic Field Experience with Post-Traumatic Populations *'}
                    </label>
                    <textarea
                      value={formData.traumaExperience}
                      onChange={(e) => updateField('traumaExperience', e.target.value)}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={locale === 'he' 
                        ? 'תאר את הניסיון הטיפולי שלך מול אוכלוסיות פוסט טראומטיות...'
                        : 'Describe your therapeutic experience with post-traumatic populations...'}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {locale === 'he' 
                        ? 'ניסיון בריטריטים/טקסים קבוצתיים, בארץ ובחו"ל *'
                        : 'Experience in Retreats/Group Ceremonies, in Israel and Abroad *'}
                    </label>
                    <textarea
                      value={formData.retreatExperience}
                      onChange={(e) => updateField('retreatExperience', e.target.value)}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={locale === 'he' 
                        ? 'פרט את הניסיון שלך בריטריטים וטקסים קבוצתיים...'
                        : 'Detail your experience in retreats and group ceremonies...'}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {locale === 'he' 
                        ? 'ניסיון עבודה עם צוות רב-מקצועי/רב-דורי *'
                        : 'Experience Working with Multidisciplinary/Multigenerational Teams *'}
                    </label>
                    <textarea
                      value={formData.teamExperience}
                      onChange={(e) => updateField('teamExperience', e.target.value)}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={locale === 'he' 
                        ? 'תאר את הניסיון שלך בעבודה עם צוותים רב-מקצועיים ורב-דוריים...'
                        : 'Describe your experience working with multidisciplinary and multigenerational teams...'}
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
                      {locale === 'he' 
                        ? 'מה מושך אותך להשתלב בפרויקט? *'
                        : 'What Attracts You to Join This Project? *'}
                    </label>
                    <textarea
                      value={formData.motivation}
                      onChange={(e) => updateField('motivation', e.target.value)}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={locale === 'he' 
                        ? 'תאר מה מושך אותך להשתלב בפרויקט הזה...'
                        : 'Describe what attracts you to join this project...'}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {locale === 'he' 
                        ? 'מה החוזקות שלך כאיש/אשת טיפול? *'
                        : 'What Are Your Strengths as a Therapist? *'}
                    </label>
                    <textarea
                      value={formData.strengths}
                      onChange={(e) => updateField('strengths', e.target.value)}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={locale === 'he' 
                        ? 'תאר את החוזקות שלך כמטפל/ת...'
                        : 'Describe your strengths as a therapist...'}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {locale === 'he' 
                        ? 'מהן חולשות/אתגרים שאתה פוגש בעבודת צוות או טיפול? *'
                        : 'What Are Weaknesses/Challenges You Encounter in Teamwork or Therapy? *'}
                    </label>
                    <textarea
                      value={formData.weaknesses}
                      onChange={(e) => updateField('weaknesses', e.target.value)}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={locale === 'he' 
                        ? 'שתף באופן כן וישיר על האתגרים והחולשות...'
                        : 'Share honestly and directly about challenges and weaknesses...'}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {locale === 'he' 
                        ? 'באילו כלים אתה משתמש בעבודה עם מצבי קיצון רגשיים או התפרקות נפשית? *'
                        : 'What Tools Do You Use When Working with Emotional Extremes or Mental Breakdown? *'}
                    </label>
                    <textarea
                      value={formData.extremeTools}
                      onChange={(e) => updateField('extremeTools', e.target.value)}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={locale === 'he' 
                        ? 'פרט את הכלים והשיטות שאתה משתמש בהם...'
                        : 'Detail the tools and methods you use...'}
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
                      {locale === 'he' 
                        ? 'האם יש לך הכשרה או ניסיון רלוונטי לטיפול בפטריות/מדיסין/תהליכים שמאניים? *'
                        : 'Do You Have Training or Relevant Experience in Mushroom/Medicine/Shamanic Processes? *'}
                    </label>
                    <textarea
                      value={formData.shamanicExperience}
                      onChange={(e) => updateField('shamanicExperience', e.target.value)}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={locale === 'he' 
                        ? 'פרט את ההכשרה והניסיון שלך בתחום...'
                        : 'Detail your training and experience in this field...'}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {locale === 'he' 
                        ? 'האם עברת תהליכים אישיים משמעותיים או טיפול/ריטריט אישי מרפא? *'
                        : 'Have You Undergone Significant Personal Processes or Healing Therapy/Retreat? *'}
                    </label>
                    <textarea
                      value={formData.personalJourney}
                      onChange={(e) => updateField('personalJourney', e.target.value)}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={locale === 'he' 
                        ? 'שתף על המסע האישי הטיפולי שלך...'
                        : 'Share about your personal therapeutic journey...'}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {locale === 'he' 
                        ? 'מהו סדר עדיפויות פנימי שלך כשותף בפרויקט (משמעות, כסף, מקצועיות, קהילה)? *'
                        : 'What Is Your Internal Priority Order as a Partner in the Project (Meaning, Money, Professionalism, Community)? *'}
                    </label>
                    <textarea
                      value={formData.priorities}
                      onChange={(e) => updateField('priorities', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={locale === 'he' 
                        ? 'תאר את סדר העדיפויות הפנימי שלך...'
                        : 'Describe your internal priority order...'}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {locale === 'he' 
                        ? 'האם יש לך זמינות להשתתף במפגשים קבוצתיים, הכשרות וסופרוויז\'ן? *'
                        : 'Do You Have Availability to Participate in Group Meetings, Training, and Supervision? *'}
                    </label>
                    <textarea
                      value={formData.availability}
                      onChange={(e) => updateField('availability', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={locale === 'he' 
                        ? 'פרט את הזמינות שלך למפגשים, הכשרות וסופרוויז\'ן...'
                        : 'Detail your availability for meetings, training, and supervision...'}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {locale === 'he' 
                        ? 'מה לדעתך חשוב במיוחד באופי הצוות ובאופי הטיפול בפרויקט מסוג זה? *'
                        : 'What Do You Think Is Especially Important in the Nature of the Team and Treatment in This Type of Project? *'}
                    </label>
                    <textarea
                      value={formData.teamNature}
                      onChange={(e) => updateField('teamNature', e.target.value)}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={locale === 'he' 
                        ? 'שתף את דעתך על אופי הצוות והטיפול...'
                        : 'Share your thoughts on team and treatment nature...'}
                      required
                    />
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {locale === 'he' ? 'פרטי יצירת קשר' : 'Contact Information'}
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {locale === 'he' ? 'כתובת אימייל *' : 'Email Address *'}
                        </label>
                        <input
                          type="email"
                          value={formData.contactEmail}
                          onChange={(e) => updateField('contactEmail', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={locale === 'he' ? 'example@email.com' : 'example@email.com'}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {locale === 'he' ? 'טלפון ליצירת קשר *' : 'Contact Phone *'}
                        </label>
                        <input
                          type="tel"
                          value={formData.contactPhone}
                          onChange={(e) => updateField('contactPhone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={locale === 'he' ? '050-123-4567' : '050-123-4567'}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {locale === 'he' ? 'הקודם' : 'Previous'}
                  </button>
                )}
                
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="mr-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {locale === 'he' ? 'הבא' : 'Next'}
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="mr-auto px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {locale === 'he' ? 'שלח טופס' : 'Submit Form'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}