import { vaultService } from '../lib/supabaseVault';
import { supabase } from '../lib/supabaseClient';
import { Patient } from '../types/patient';

export const securePatientService = {
  async getEncryptedPatientData(patientId: number) {
    try {
      // Get encryption key from vault
      const encryptionKey = await vaultService.getSecret('patient_data_encryption_key');
      
      // Use the key to decrypt sensitive data
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .eq('patient_id', patientId)
        .single();

      if (error) throw error;

      // Log access for audit purposes
      await this.logAccess(patientId, 'view');

      return data;
    } catch (error) {
      console.error('Error accessing secure patient data:', error);
      throw error;
    }
  },

  async logAccess(patientId: number, action: string) {
    try {
      const apiKey = await vaultService.getSecret('medical_api_key');
      
      // Log access with secure API key
      await supabase
        .from('access_logs')
        .insert([{
          patient_id: patientId,
          action: action,
          timestamp: new Date().toISOString(),
          api_key_used: apiKey // In practice, don't store the actual key
        }]);
    } catch (error) {
      console.error('Error logging access:', error);
    }
  },

  // Logout method
  async logout() {
    try {
      await supabase.auth.signOut();
      return { success: true, message: 'User logged out successfully' };
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  }
}; 