
import React, { useState } from 'react';
import Head from 'next/head';

const goals = [
  'Muscle Gain',
  'Weight Loss',
  'Endurance',
  'Strength Training',
  'General Fitness',
  'Weight Maintenance',
  'Recomposition',
  'Sports Performance',
  'Flexibility & Mobility'
];

const ExerciseRecommender = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [goal, setGoal] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);

  const getRecommendation = async () => {
    setLoading(true);
    const response = await fetch('/api/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ age, gender, height, weight, goal })
    });
    const data = await response.json();
    setRecommendation(data.recommendation);
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Exercise Recommender</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />
      </Head>
      <main style={{ fontFamily: 'Inter, sans-serif' }} className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Exercise Recommender</h1>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 items-center">
              <label className="font-semibold">Age:</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="p-2 border rounded w-full" />

              <label className="font-semibold">Gender:</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)} className="p-2 border rounded w-full">
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <label className="font-semibold">Height (cm):</label>
              <input type="text" value={height} onChange={(e) => setHeight(e.target.value)} className="p-2 border rounded w-full" />

              <label className="font-semibold">Weight (kg):</label>
              <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} className="p-2 border rounded w-full" />

              <label className="font-semibold">Goal:</label>
              <select value={goal} onChange={(e) => setGoal(e.target.value)} className="p-2 border rounded w-full">
                <option value="">Select</option>
                {goals.map((g, i) => <option key={i} value={g.toLowerCase()}>{g}</option>)}
              </select>
            </div>

            <button onClick={getRecommendation} disabled={loading} className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
              {loading ? 'Searching...' : 'Get Exercise Plan'}
            </button>

            {recommendation && (
              <div className="mt-6 bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-3 text-blue-800">Personalized Plan:</h2>
                <ul className="list-disc pl-5 space-y-1 text-gray-800 whitespace-pre-wrap">
                  {recommendation.split('\n').map((line, idx) => <li key={idx}>{line}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default ExerciseRecommender;
