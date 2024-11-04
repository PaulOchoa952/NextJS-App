import { supabase } from '../lib/supabaseClient';
import { Patient, PatientFormData } from '../types/patient';

export const patientService = {
  async fetchPatients() {
    const { data, error } = await supabase
      .from('patients')
      .select('*');
    
    if (error) throw error;
    return data;
  },

  async createPatient(patient: PatientFormData) {
    const { created_at, ...patientData } = patient;
    
    const { data, error } = await supabase
      .from('patients')
      .insert([patientData])
      .select();
    
    if (error) throw error;
    return data[0];
  },

  async updatePatient(id: number, patient: PatientFormData) {
    const { created_at, ...patientData } = patient;
    
    const { data, error } = await supabase
      .from('patients')
      .update(patientData)
      .eq('patient_id', id)
      .select();
    
    if (error) throw error;
    return data[0];
  },

  async deletePatient(id: number) {
    const { error } = await supabase
      .from('patients')
      .delete()
      .eq('patient_id', id);
    
    if (error) throw error;
  }
}; 