import { useState } from 'react';
import { Patient, PatientFormData } from '../types/patient';

interface PatientFormProps {
  onSubmit: (data: PatientFormData) => Promise<void>;
  initialData?: PatientFormData;
  isEditing?: boolean;
  onCancel?: () => void;
}

export function PatientForm({ onSubmit, initialData, isEditing, onCancel }: PatientFormProps) {
  const [formData, setFormData] = useState<PatientFormData>(initialData || {
    first_name: '',
    last_name: '',
    date_of_birth:'',
    gender:'',
    contact_number:'',
    email:'',
    address:'',
    created_at:''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    if (!isEditing) {
      setFormData({ 
        first_name: '', 
        last_name: '',
         date_of_birth:'', gender:'', 
         contact_number:'', email:'',
          address:'', created_at:'' 
        
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="First Name"
          value={formData.first_name}
          onChange={(e) => setFormData({...formData, first_name: e.target.value})}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={(e) => setFormData({...formData, last_name: e.target.value})}
          className="p-2 border rounded"
          required
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={formData.date_of_birth}
          onChange={(e) => setFormData({...formData,date_of_birth: e.target.value})}
          className="p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="p-2 border rounded"
          required
        />
      </div>
      <button 
        type="submit" 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {isEditing ? 'Update Patient' : 'Add Patient'}
      </button>
      {isEditing && (
        <button 
          type="button"
          onClick={onCancel}
          className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      )}
    </form>
  );
} 