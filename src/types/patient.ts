export interface Patient {
  patient_id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  contact_number: string;
  email: string;
  address: string;
  created_at?: string;
}

export type PatientFormData = Omit<Patient, 'patient_id'>; 