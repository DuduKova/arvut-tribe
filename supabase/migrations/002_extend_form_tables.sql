-- Extend form tables to store all form fields using JSONB for flexibility

-- Add form_data JSONB column to healer_applications
ALTER TABLE healer_applications 
ADD COLUMN IF NOT EXISTS form_data JSONB;

-- Add form_data JSONB column to patient_registrations
ALTER TABLE patient_registrations 
ADD COLUMN IF NOT EXISTS form_data JSONB;

-- Create indexes on JSONB columns for querying
CREATE INDEX IF NOT EXISTS idx_healer_applications_form_data ON healer_applications USING GIN (form_data);
CREATE INDEX IF NOT EXISTS idx_patient_registrations_form_data ON patient_registrations USING GIN (form_data);

-- Update existing records to have empty form_data if null
UPDATE healer_applications SET form_data = '{}' WHERE form_data IS NULL;
UPDATE patient_registrations SET form_data = '{}' WHERE form_data IS NULL;

