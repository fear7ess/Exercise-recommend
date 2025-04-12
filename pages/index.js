
import React, { useState } from 'react';
import Head from 'next/head';

const ExerciseRecommender = () => {
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
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
      body: JSON.stringify({ age, sex, height, weight, goal })
    });
    const data = await response.json();
    setRecommendation(data.recommendation);
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Exercise Recommender</title>
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center justify-center px-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Exercise Recommender</h1>
          <div className="space-y-4 mb-6">
            <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} className="w-full p-3 border rounded-lg" />
            <select value={sex} onChange={(e) => setSex(e.target.value)} className="w-full p-3 border rounded-lg">
              <option value="">Select Sex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <input type="text" placeholder="Height (e.g., 5'10)" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full p-3 border rounded-lg" />
            <input type="text" placeholder="Current Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full p-3 border rounded-lg" />
            <select value={goal} onChange={(e) => setGoal(e.target.value)} className="w-full p-3 border rounded-lg">
              <option value="">Select Goal</option>
              <option value="muscle gain">Muscle Gain</option>
              <option value="weight loss">Weight Loss</option>
              <option value="endurance">Endurance</option>
            </select>
          </div>
          <button onClick={getRecommendation} disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
            {loading ? 'Searching...' : 'Get Exercise Plan'}
          </button>
          {recommendation && (
            <div className="mt-6 bg-gray-50 p-4 rounded-lg border">
              <h2 className="font-bold text-xl mb-2 text-gray-800">Recommendation:</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{recommendation}</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default ExerciseRecommender;
