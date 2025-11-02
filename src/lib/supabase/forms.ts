import { createClient } from '@/lib/supabase/server'

export interface HealerApplication {
  name: string
  email: string
  phone: string
  experience: string
  qualifications: string
  availability: string
  preferences: string
}

export interface PatientRegistration {
  name: string
  email: string
  phone: string
  healthBackground: string
  preferences: string
  availability: string
}

export async function submitHealerApplication(data: HealerApplication) {
  const supabase = await createClient()
  
  const { data: result, error } = await supabase
    .from('healer_applications')
    .insert([
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        experience: data.experience,
        qualifications: data.qualifications,
        availability: data.availability,
        preferences: data.preferences,
        status: 'pending'
      }
    ])
    .select()

  if (error) {
    throw new Error(`Failed to submit application: ${error.message}`)
  }

  return result
}

export async function submitPatientRegistration(data: PatientRegistration) {
  const supabase = await createClient()
  
  const { data: result, error } = await supabase
    .from('patient_registrations')
    .insert([
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        health_background: data.healthBackground,
        preferences: data.preferences,
        availability: data.availability,
        status: 'pending'
      }
    ])
    .select()

  if (error) {
    throw new Error(`Failed to submit registration: ${error.message}`)
  }

  return result
}

export async function sendEmailNotification(type: 'healer' | 'patient', data: any) {
  // TODO: Implement email notification via Supabase Edge Function
  console.log(`Email notification for ${type}:`, data)
}

export async function sendWhatsAppNotification(type: 'healer' | 'patient', data: any) {
  // TODO: Implement WhatsApp notification
  console.log(`WhatsApp notification for ${type}:`, data)
}
