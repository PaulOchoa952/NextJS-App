import React, { useEffect } from 'react';
import { securePatientService } from '../services/securePatientService';

const TestSecurePatientService = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const patientData = await securePatientService.getEncryptedPatientData(1); // Replace with a valid patient ID
                console.log('Fetched patient data:', patientData);
            } catch (error) {
                console.error('Error fetching patient data:', error);
            }
        };

        fetchData();
    }, []);

    return <div>Check the console for results.</div>;
};

export default TestSecurePatientService; 