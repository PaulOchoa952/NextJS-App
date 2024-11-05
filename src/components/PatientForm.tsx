"use client";

import { useState, useEffect } from 'react';
import { PatientFormData } from '../types/patient';

interface PatientFormProps {
  onSubmit: (data: PatientFormData) => Promise<void>;
  initialData?: PatientFormData;
  isEditing?: boolean;
  onCancel?: () => void;
}

export function PatientForm({ onSubmit, initialData, isEditing, onCancel }: PatientFormProps) {
  const [formData, setFormData] = useState<PatientFormData>({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    contact_number: '',
    email: '',
    address: '',
    created_at: '',
  });

  useEffect(() => {
    if (initialData) {
      console.log('Setting initial data:', initialData);
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    if (!isEditing) {
      setFormData({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        gender: '',
        contact_number: '',
        email: '',
        address: '',
        created_at: '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-white">
        {isEditing ? 'Edit Patient' : 'Add New Patient'}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="First Name"
          value={formData.first_name}
          onChange={(e) => setFormData({...formData, first_name: e.target.value})}
          className="p-2 border rounded bg-gray-700 text-white placeholder-gray-400 border-gray-600"
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={(e) => setFormData({...formData, last_name: e.target.value})}
          className="p-2 border rounded bg-gray-700 text-white placeholder-gray-400 border-gray-600"
          required
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={formData.date_of_birth}
          onChange={(e) => setFormData({...formData, date_of_birth: e.target.value})}
          className="p-2 border rounded bg-gray-700 text-white border-gray-600"
          required
        />
        <input
          type="text"
          placeholder="Gender"
          value={formData.gender}
          onChange={(e) => setFormData({...formData, gender: e.target.value})}
          className="p-2 border rounded bg-gray-700 text-white placeholder-gray-400 border-gray-600"
          required
        />
        <input
          type="tel"
          placeholder="Contact Number"
          value={formData.contact_number}
          onChange={(e) => setFormData({...formData, contact_number: e.target.value})}
          className="p-2 border rounded bg-gray-700 text-white placeholder-gray-400 border-gray-600"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="p-2 border rounded bg-gray-700 text-white placeholder-gray-400 border-gray-600"
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
          className="col-span-2 p-2 border rounded bg-gray-700 text-white placeholder-gray-400 border-gray-600"
          required
        />
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isEditing ? 'Update Patient' : 'Add Patient'}
        </button>
      </div>
    </form>
  );
} 