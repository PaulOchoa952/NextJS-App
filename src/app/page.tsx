// pages/index.tsx
"use client";

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Image from 'next/image';

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(''); // Existing state for search term
  const [patientAge, setPatientAge] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('patients')
        .select('*');

      if (error) console.error('Error fetching data:', error);
      else setData(data);
    };

    fetchData();
  }, []);
  
  const filteredData = data.filter((patient) => {
    const fullName = `${patient.first_name} ${patient.last_name}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h1>Next.js + Supabase</h1>
      <p>
        This is a starter template for Next.js with Supabase. You can use this template to get started with your Next.js project.
      </p>
      <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      
      {/* {{ edit_3 }} Add input field for searching patients */}
      <input 
        type="text" 
        placeholder="Search patients..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />

      <div>
        {filteredData.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    </div>
  );
}

