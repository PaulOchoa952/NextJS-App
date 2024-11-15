import { supabase } from './supabaseClient';

export const vaultService = {
  async getSecret(secretName: string) {
    const { data, error } = await supabase
      .from('vault')
      .select('secret_value')
      .eq('secret_name', secretName)
      .single();
    
    if (error) {
      console.error('Error fetching secret:', error);
      throw error;
    }

    return data.secret_value;
  }
}; 