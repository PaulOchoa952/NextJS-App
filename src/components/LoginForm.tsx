import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null); // State for error messages

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Reset error state

        // Use Supabase to sign in
        const { data: { user }, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error('Error logging in:', error.message);
        } else {
            window.location.href = '/'; // Redirect to the home page if login is successful
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                    style={{ backgroundColor: '#2D3748', color: 'white', border: '1px solid #4A5568' }}
                />
            </div>
            <div>
                <label>Password:</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                    style={{ backgroundColor: '#2D3748', color: 'white', border: '1px solid #4A5568' }}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm; 