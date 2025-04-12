
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
        <title>ProFit - AI Exercise Coach</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
      </Head>
      <main style={{ fontFamily: 'Poppins, sans-serif' }} className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 flex items-center justify-center px-4 py-16">
        <div className="backdrop-blur-md bg-white/80 shadow-xl p-8 rounded-2xl w-full max-w-3xl border border-blue-100">
          <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">ProFit - AI Workout Recommender</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 mb-6">
            {[
              ['Age:', 'age', 'number'],
              ['Height (cm):', 'height', 'text'],
              ['Gender:', 'gender', 'select'],
              ['Weight (kg):', 'weight', 'text'],
              ['Goal:', 'goal', 'selectGoal']
            ].map(([label, name, type]) => (
              <label key={name} className="flex flex-col font-semibold">
                {label}
                {type === 'select' ? (
                  <select name={name} value={form[name]} onChange={handleChange} className="mt-1 p-2 border rounded">
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                ) : type === 'selectGoal' ? (
                  <select name={name} value={form[name]} onChange={handleChange} className="mt-1 p-2 border rounded">
                    <option value="">Select</option>
                    {goals.map((g, i) => <option key={i} value={g.toLowerCase()}>{g}</option>)}
                  </select>
                ) : (
                  <input type={type} name={name} value={form[name]} onChange={handleChange} className="mt-1 p-2 border rounded" />
                )}
              </label>
            ))}
          </div>

          <button onClick={handleSubmit} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">
            {loading ? 'Generating plan...' : 'Generate My Workout Plan'}
          </button>

          {recommendation.length > 0 && (
            <div className="mt-8 bg-white/90 p-6 rounded-xl shadow-lg border">
              <h2 className="text-2xl font-bold mb-4 text-blue-800">Your Personalized Plan</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                {recommendation.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <div className="mt-4 text-sm text-gray-600">
                <strong>Online Sources Analyzed:</strong> {searchCount}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default ExerciseRecommender;
