-- Unified read model for admin submission queue
DROP VIEW IF EXISTS admin_submissions;

CREATE VIEW admin_submissions AS
SELECT
  'healer'::text AS submission_type,
  id,
  created_at,
  name,
  email,
  phone,
  status,
  notes,
  form_data
FROM healer_applications
UNION ALL
SELECT
  'patient'::text AS submission_type,
  id,
  created_at,
  name,
  email,
  phone,
  status,
  notes,
  form_data
FROM patient_registrations;
