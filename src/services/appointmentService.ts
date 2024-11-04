import { supabase } from '../lib/supabaseClient';
import { Appointment, AppointmentFormData } from '../types/appointment';

export const appointmentService = {
  async fetchAppointments() {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        patients (
          first_name,
          last_name
        )
      `);
    
    if (error) throw error;
    return data;
  },

  async createAppointment(appointment: AppointmentFormData) {
    const { data, error } = await supabase
      .from('appointments')
      .insert([appointment])
      .select();
    
    if (error) throw error;
    return data[0];
  },

  async updateAppointment(id: number, appointment: AppointmentFormData) {
    const { data, error } = await supabase
      .from('appointments')
      .update(appointment)
      .eq('appointment_id', id)
      .select();
    
    if (error) throw error;
    return data[0];
  },

  async deleteAppointment(id: number) {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('appointment_id', id);
    
    if (error) throw error;
  },

  async getPatientAppointments(patientId: number) {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('patient_id', patientId)
      .order('appointment_date', { ascending: true });
    
    if (error) throw error;
    return data;
  }
}; 