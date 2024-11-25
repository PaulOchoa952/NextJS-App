import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { toast } from 'react-toastify';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null); // State for error messages

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Reset error state

        // Use Supabase to sign in
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            toast.error('Error logging in:'); // Display error message if login fails
        } else {
            toast.success('Logged in successfully!');
            setTimeout(() => {
                window.location.href = '/patients'; // Redirect to the home page after a delay
            }, 2000); // Delay of 3 seconds
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center text-white"></h2>
            <div className="mb-4">
                <label className="block text-white mb-2">Email:</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                    className="w-full p-2 border rounded bg-gray-700 text-white placeholder-gray-400 border-gray-600"
                />
            </div>
            <div className="mb-6">
                <label className="block text-white mb-2">Password:</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                    className="w-full p-2 border rounded bg-gray-700 text-white placeholder-gray-400 border-gray-600"
                />
            </div>
            <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Login
            </button>
        </form>
    );
};

export default LoginForm; 