// pages/index.tsx
"use client";

import React from 'react';
import LoginForm from '../components/LoginForm';

const HomePage = () => {
  return (
      <div className="flex items-center justify-center h-screen bg-gray-800">
          <div className="bg-gray-900 p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-center text-white ">Login</h2>
              <LoginForm />
          </div>
      </div>
  );
};

export default HomePage; 