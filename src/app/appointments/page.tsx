"use client";

import { useEffect, useState } from 'react';
import { Appointment, AppointmentFormData } from '../../types/appointment';
import { appointmentService } from '../../services/appointmentService';
import { AppointmentForm } from '../../components/AppointmentForm';
import Link from 'next/link';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [currentAppointment, setCurrentAppointment] = useState<AppointmentFormData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await appointmentService.fetchAppointments();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleSubmit = async (formData: AppointmentFormData) => {
    try {
      if (isEditing) {
        const updatedAppointment = await appointmentService.updateAppointment(isEditing, formData);
        setAppointments(appointments.map(a => 
          a.appointment_id === isEditing ? updatedAppointment : a
        ));
        setIsEditing(null);
      } else {
        const newAppointment = await appointmentService.createAppointment(formData);
        setAppointments([...appointments, newAppointment]);
      }
      setCurrentAppointment(null);
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.doctor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Appointments</h1>
        <Link 
          href="/" 
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Back to Patients
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Search appointments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-2 border rounded bg-gray-800 text-white placeholder-gray-400 border-gray-700"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border rounded bg-gray-800 text-white border-gray-700"
        >
          <option value="all">All Status</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <AppointmentForm
        onSubmit={handleSubmit}
        initialData={currentAppointment || undefined}
        isEditing={!!isEditing}
        onCancel={() => {
          setIsEditing(null);
          setCurrentAppointment(null);
        }}
      />

      {/* Appointments List */}
      <div className="grid gap-4 mt-8">
        {filteredAppointments.length === 0 ? (
          <p className="text-center text-gray-400">No appointments found</p>
        ) : (
          filteredAppointments.map((appointment) => (
            <div key={appointment.appointment_id} className="bg-gray-800 p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {appointment.doctor_name}
                  </h3>
                  <p className="text-gray-300">
                    {new Date(appointment.appointment_date).toLocaleDateString()} at{' '}
                    {appointment.appointment_time}
                  </p>
                  <p className="mt-2 text-gray-300">{appointment.reason}</p>
                  <span className={`
                    inline-block px-2 py-1 rounded-full text-sm mt-2
                    ${appointment.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 
                      appointment.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      'bg-red-100 text-red-800'}
                  `}>
                    {appointment.status}
                  </span>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => {
                      setIsEditing(appointment.appointment_id);
                      setCurrentAppointment({
                        patient_id: appointment.patient_id,
                        doctor_name: appointment.doctor_name,
                        appointment_date: appointment.appointment_date,
                        appointment_time: appointment.appointment_time,
                        reason: appointment.reason,
                        status: appointment.status
                      });
                    }}
                    className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this appointment?')) {
                        appointmentService.deleteAppointment(appointment.appointment_id)
                          .then(() => {
                            setAppointments(appointments.filter(a => a.appointment_id !== appointment.appointment_id));
                          })
                          .catch(error => {
                            console.error('Error deleting appointment:', error);
                          });
                      }
                    }}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 