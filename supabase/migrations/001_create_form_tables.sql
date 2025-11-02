-- Create healer_applications table
CREATE TABLE IF NOT EXISTS healer_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  experience TEXT NOT NULL,
  qualifications TEXT NOT NULL,
  availability TEXT NOT NULL,
  preferences TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  notes TEXT
);

-- Create patient_registrations table
CREATE TABLE IF NOT EXISTS patient_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  health_background TEXT NOT NULL,
  preferences TEXT NOT NULL,
  availability TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  notes TEXT
);

-- Enable Row Level Security
ALTER TABLE healer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_registrations ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (forms can be submitted by anyone)
CREATE POLICY "Allow public insert on healer_applications" ON healer_applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert on patient_registrations" ON patient_registrations
  FOR INSERT WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_healer_applications_email ON healer_applications(email);
CREATE INDEX IF NOT EXISTS idx_healer_applications_status ON healer_applications(status);
CREATE INDEX IF NOT EXISTS idx_healer_applications_created_at ON healer_applications(created_at);

CREATE INDEX IF NOT EXISTS idx_patient_registrations_email ON patient_registrations(email);
CREATE INDEX IF NOT EXISTS idx_patient_registrations_status ON patient_registrations(status);
CREATE INDEX IF NOT EXISTS idx_patient_registrations_created_at ON patient_registrations(created_at);
