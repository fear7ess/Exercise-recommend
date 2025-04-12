
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { age, gender, height, weight, goal } = req.body;
  const serpApiKey = 'e8edcd447e65bb0edfba5e96b29352d4488461d4514b96b0bdea669804a6c8ce';
  let totalResults = 0;

  try {
    const searchQuery = `best workout plan for ${goal} for ${age} year old ${gender}`;
    const serpResponse = await fetch(`https://serpapi.com/search.json?q=${encodeURIComponent(searchQuery)}&api_key=${serpApiKey}`);
    const data = await serpResponse.json();
    totalResults = (data.organic_results || []).length;
  } catch (err) {
    console.error('Search API error:', err);
  }

  const plan = [];

  // Personalized intro
  plan.push(`You're a ${age}-year-old ${gender} with height ${height} cm and weight ${weight} kg targeting ${goal}.`);

  // Core logic (example logic per goal, can be expanded)
  if (goal === 'muscle gain') {
    plan.push('Follow a 5-day split: Chest, Back, Legs, Shoulders, Arms.');
    plan.push('Focus on compound lifts: squats, deadlifts, bench press, overhead press.');
    plan.push('Train with progressive overload and ensure a calorie surplus with high protein intake.');
  } else if (goal === 'fat loss') {
    plan.push('Combine 3x/week strength training with 3x/week HIIT or steady-state cardio.');
    plan.push('Maintain a caloric deficit of ~15-20% below maintenance.');
    plan.push('Prioritize protein-rich meals and sufficient hydration.');
  } else if (goal === 'endurance') {
    plan.push('Train 4x/week with long-distance running, cycling or swimming.');
    plan.push('Add 2x/week bodyweight strength or resistance band circuits.');
    plan.push('Nutrition should support recovery: carbs + electrolytes + hydration.');
  } else if (goal === 'flexibility & mobility') {
    plan.push('Perform yoga or dynamic mobility work 5x/week.');
    plan.push('Incorporate foam rolling and active stretching into your daily routine.');
    plan.push('Strengthen stabilizers with resistance bands or light weights.');
  } else {
    plan.push('Mix full-body strength training with cardio and mobility work.');
    plan.push('Keep workouts enjoyable and consistent.');
    plan.push('Adjust training volume and rest based on how your body feels.');
  }

  return res.status(200).json({ recommendation: plan, searchCount: totalResults });
}
