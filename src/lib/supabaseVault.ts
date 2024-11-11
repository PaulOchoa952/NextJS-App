import { supabase } from './supabaseClient';

export const vaultService = {
  async getSecret(name: string) {
    const { data, error } = await supabase
      .from('vault')
      .select('secret')
      .eq('name', name)
      .single();
    
    if (error) throw error;
    return data?.secret;
  },

  async setSecret(name: string, secret: string) {
    const { error } = await supabase
      .from('vault')
      .insert([{ name, secret }]);
    
    if (error) throw error;
  }
}; 