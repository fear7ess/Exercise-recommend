
import React, { useState } from 'react';
import Head from 'next/head';

const goals = [
  'Muscle Gain',
  'Fat Loss',
  'Strength Training',
  'Endurance',
  'Recomposition',
  'Weight Maintenance',
  'Sports Performance',
  'Flexibility & Mobility'
];

const ExerciseRecommender = () => {
  const [form, setForm] = useState({ age: '', gender: '', height: '', weight: '', goal: '' });
  const [recommendation, setRecommendation] = useState([]);
  const [searchCount, setSearchCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const response = await fetch('/api/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await response.json();
    setRecommendation(data.recommendation || []);
    setSearchCount(data.searchCount || 0);
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Smart Exercise Recommender</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
      </Head>
      <main style={{ fontFamily: 'Poppins, sans-serif' }} className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 flex items-center justify-center px-4 py-12">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-3xl border border-blue-100">
          <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Smart Exercise Recommender</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 mb-6">
            <label className="flex flex-col font-semibold">Age:
              <input type="number" name="age" value={form.age} onChange={handleChange} className="mt-1 p-2 border rounded" />
            </label>
            <label className="flex flex-col font-semibold">Gender:
              <select name="gender" value={form.gender} onChange={handleChange} className="mt-1 p-2 border rounded">
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
            <label className="flex flex-col font-semibold">Height (cm):
              <input type="text" name="height" value={form.height} onChange={handleChange} className="mt-1 p-2 border rounded" />
            </label>
            <label className="flex flex-col font-semibold">Weight (kg):
              <input type="text" name="weight" value={form.weight} onChange={handleChange} className="mt-1 p-2 border rounded" />
            </label>
            <label className="md:col-span-2 flex flex-col font-semibold">Fitness Goal:
              <select name="goal" value={form.goal} onChange={handleChange} className="mt-1 p-2 border rounded">
                <option value="">Select</option>
                {goals.map((g, i) => <option key={i} value={g.toLowerCase()}>{g}</option>)}
              </select>
            </label>
          </div>

          <button onClick={handleSubmit} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">
            {loading ? 'Analyzing...' : 'Get My Plan'}
          </button>

          {recommendation.length > 0 && (
            <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200 shadow-inner">
              <h2 className="text-xl font-semibold mb-3 text-blue-800">Your Personalized Plan</h2>
              <ul className="list-decimal pl-6 text-gray-800 space-y-1">
                {recommendation.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <div className="mt-4 text-sm text-gray-600"><strong>Sources Analyzed:</strong> {searchCount}</div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default ExerciseRecommender;
