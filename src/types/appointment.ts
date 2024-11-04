export interface Appointment {
  appointment_id: number;
  patient_id: number;
  doctor_name: string;
  appointment_date: string;
  appointment_time: string;
  reason: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  created_at?: string;
}

export type AppointmentFormData = Omit<Appointment, 'appointment_id' | 'created_at'>; 