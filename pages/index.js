
import React, { useState } from 'react';
import Head from 'next/head';

const ExerciseRecommender = () => {
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [height, setHeight] = useState('');
  const [goal, setGoal] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);

  const getRecommendation = async () => {
    setLoading(true);
    const response = await fetch('/api/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ age, sex, height, goal })
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
      <main style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>Exercise Recommender</h1>
        <div style={{ marginBottom: '1rem' }}>
          <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }} />
          <select value={sex} onChange={(e) => setSex(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}>
            <option value="">Select Sex</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input type="text" placeholder="Height (e.g., 5'10)" value={height} onChange={(e) => setHeight(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }} />
          <select value={goal} onChange={(e) => setGoal(e.target.value)} style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}>
            <option value="">Select Goal</option>
            <option value="muscle gain">Muscle Gain</option>
            <option value="weight loss">Weight Loss</option>
            <option value="endurance">Endurance</option>
          </select>
        </div>
        <button onClick={getRecommendation} disabled={loading} style={{ padding: '0.5rem 1rem', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px' }}>
          {loading ? 'Searching...' : 'Get Exercise Plan'}
        </button>
        {recommendation && (
          <div style={{ marginTop: '2rem', backgroundColor: '#f3f4f6', padding: '1rem', borderRadius: '8px' }}>
            <h2 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Recommendation:</h2>
            <p>{recommendation}</p>
          </div>
        )}
      </main>
    </>
  );
};

export default ExerciseRecommender;
