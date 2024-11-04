import { useState, useEffect } from 'react';
import { Appointment, AppointmentFormData } from '../types/appointment';
import { Patient } from '../types/patient';
import { patientService } from '../services/patientService';

interface AppointmentFormProps {
  onSubmit: (data: AppointmentFormData) => Promise<void>;
  initialData?: AppointmentFormData;
  isEditing?: boolean;
  onCancel?: () => void;
  patientId?: number;
}

export function AppointmentForm({ 
  onSubmit, 
  initialData, 
  isEditing, 
  onCancel,
  patientId 
}: AppointmentFormProps) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [formData, setFormData] = useState<AppointmentFormData>(initialData || {
    patient_id: patientId || 0,
    doctor_name: '',
    appointment_date: '',
    appointment_time: '',
    reason: '',
    status: 'Scheduled'
  });

  useEffect(() => {
    // Fetch patients when component mounts
    const fetchPatients = async () => {
      try {
        const data = await patientService.fetchPatients();
        setPatients(data);
        // Set first patient as default if no patientId provided
        if (!patientId && data.length > 0) {
          setFormData(prev => ({ ...prev, patient_id: data[0].patient_id }));
        }
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, [patientId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    if (!isEditing) {
      setFormData({
        patient_id: patientId || (patients[0]?.patient_id || 0),
        doctor_name: '',
        appointment_date: '',
        appointment_time: '',
        reason: '',
        status: 'Scheduled'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-white">
        {isEditing ? 'Edit Appointment' : 'Schedule New Appointment'}
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Patient Selection */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Patient
          </label>
          <select
            value={formData.patient_id}
            onChange={(e) => setFormData({...formData, patient_id: Number(e.target.value)})}
            className="w-full p-2 border rounded bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select a patient</option>
            {patients.map(patient => (
              <option key={patient.patient_id} value={patient.patient_id}>
                {patient.first_name} {patient.last_name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Doctor Name
          </label>
          <input
            type="text"
            value={formData.doctor_name}
            onChange={(e) => setFormData({...formData, doctor_name: e.target.value})}
            className="w-full p-2 border rounded bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Date
          </label>
          <input
            type="date"
            value={formData.appointment_date}
            onChange={(e) => setFormData({...formData, appointment_date: e.target.value})}
            className="w-full p-2 border rounded bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Time
          </label>
          <input
            type="time"
            value={formData.appointment_time}
            onChange={(e) => setFormData({...formData, appointment_time: e.target.value})}
            className="w-full p-2 border rounded bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Reason
          </label>
          <textarea
            value={formData.reason}
            onChange={(e) => setFormData({...formData, reason: e.target.value})}
            className="w-full p-2 border rounded bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            required
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({
              ...formData, 
              status: e.target.value as 'Scheduled' | 'Completed' | 'Cancelled'
            })}
            className="w-full p-2 border rounded bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isEditing ? 'Update Appointment' : 'Schedule Appointment'}
        </button>
      </div>
    </form>
  );
} 