// pages/index.tsx
"use client";

import { useEffect, useState } from 'react';
import { Patient, PatientFormData } from '../types/patient';
import { patientService } from '../services/patientService';
import { PatientForm } from '../components/PatientForm';

export default function Home() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [currentPatient, setCurrentPatient] = useState<PatientFormData>({
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
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await patientService.fetchPatients();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  // Create patient
  const handleSubmit = async (formData: PatientFormData) => {
    try {
      if (isEditing) {
        const updatedPatient = await patientService.updatePatient(isEditing, formData);
        setPatients(patients.map(p => p.patient_id === isEditing ? updatedPatient : p));
        setIsEditing(null);
      } else {
        const newPatient = await patientService.createPatient(formData);
        setPatients([...patients, newPatient]);
      }
      setCurrentPatient({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        email: '',
        gender: '',
        contact_number: '',
        address: '',
        created_at: '',
      });
    } catch (error) {
      console.error('Error saving patient:', error);
    }
  };

  // Delete patient
  const deletePatient = async (id: number) => {
    try {
      await patientService.deletePatient(id);
      setPatients(patients.filter(p => p.patient_id !== id));
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  // Handle edit mode
  const handleEdit = (patient: Patient) => {
    setIsEditing(patient.patient_id);
    setCurrentPatient({
      first_name: patient.first_name,
      last_name: patient.last_name,
      date_of_birth: patient.date_of_birth,
      email: patient.email,
      gender: patient.gender,
      contact_number: patient.contact_number,
      address: patient.address,
      created_at: patient.created_at,
    });
  };

  const filteredPatients = patients.filter((patient) => {
    const fullName = `${patient.first_name} ${patient.last_name}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Patient Management System</h1>
      
      {/* Search */}
      <input 
        type="text" 
        placeholder="Search patients..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      <PatientForm 
        onSubmit={handleSubmit}
        initialData={currentPatient}
        isEditing={!!isEditing}
        onCancel={() => {
          setIsEditing(null);
          setCurrentPatient({
            first_name: '',
            last_name: '',
            date_of_birth: '',
            email: '',
            gender: '',
            contact_number: '',
            address: '',
            created_at: '',
          });
        }}
      />

      {/* Patients List */}
      <div className="grid gap-4">
        {filteredPatients.map((patient) => (
          <div key={patient.patient_id} className="p-4 border rounded shadow">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">
                  {patient.first_name} {patient.last_name}
                </h3>
                <p>Date of birth: {patient.date_of_birth}</p>
                <p>Email: {patient.email}</p>
              </div>
              <div>
                <button
                  onClick={() => handleEdit(patient)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded mr-2 hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deletePatient(patient.patient_id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

