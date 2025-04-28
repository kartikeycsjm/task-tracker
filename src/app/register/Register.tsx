'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn } from '../login/action';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    country: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // new loading state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // start loading

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      await LogIn(formData.email, formData.password);
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-2 border mb-4 rounded"
          required
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 border mb-4 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 border mb-4 rounded"
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          onChange={handleChange}
          className="w-full p-2 border mb-4 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={loading} // disable while loading
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
