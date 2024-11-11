export interface Patient {
    first_name: string;
    last_name: string;
  }
  
  export interface AccessLog {
    id: number;
    patient_id: number;
    action: string;
    timestamp: string;
    api_key_used: string;
    patients?: Patient; // Make patients optional
  }