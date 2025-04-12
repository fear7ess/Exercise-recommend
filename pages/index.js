
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
  const [recommendation, setRecommendation] = useState([]);
  const [searchCount, setSearchCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const getRecommendation = async () => {
    setLoading(true);
    const response = await fetch('/api/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ age, gender, height, weight, goal })
    });
    const data = await response.json();
    setRecommendation(data.recommendation || []);
    setSearchCount(data.searchCount || 0);
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Exercise Recommender</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />
      </Head>
      <main style={{ fontFamily: 'Inter, sans-serif' }} className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white shadow-lg border rounded-xl p-8 w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Exercise Recommender</h1>
          <div className="grid grid-cols-2 gap-4 items-center text-sm text-gray-700 mb-6">
            <label>Age:</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="p-2 border rounded" />

            <label>Height (cm):</label>
            <input type="text" value={height} onChange={(e) => setHeight(e.target.value)} className="p-2 border rounded" />

            <label>Gender:</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} className="p-2 border rounded">
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <label>Weight (kg):</label>
            <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} className="p-2 border rounded" />

            <label>Fitness Goal:</label>
            <select value={goal} onChange={(e) => setGoal(e.target.value)} className="p-2 border rounded">
              <option value="">Select</option>
              {goals.map((g, i) => <option key={i} value={g.toLowerCase()}>{g}</option>)}
            </select>
          </div>

          <button onClick={getRecommendation} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">
            {loading ? 'Searching...' : 'Get Exercise Plan'}
          </button>

          {recommendation.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-2">Recommendations:</h2>
              <ol className="list-decimal pl-5 space-y-1 text-gray-800">
                {recommendation.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>
              <div className="mt-4 p-3 border rounded bg-gray-50 text-gray-700 text-sm">
                <strong>Searches analyzed:</strong> {searchCount}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default ExerciseRecommender;
