
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  const { age, gender, height, weight, goal } = req.body;
  const serpApiKey = 'e8edcd447e65bb0edfba5e96b29352d4488461d4514b96b0bdea669804a6c8ce';
  let totalResults = 0;

  try {
    const searchQuery = `custom workout for ${goal} for ${age} year old ${gender}`;
    const serpResponse = await fetch(`https://serpapi.com/search.json?q=${encodeURIComponent(searchQuery)}&api_key=${serpApiKey}`);
    const data = await serpResponse.json();
    totalResults = (data.organic_results || []).length;
  } catch (err) {
    console.error('Search API error:', err);
  }

  const plan = [];

  const isSenior = parseInt(age) > 50;
  const isYounger = parseInt(age) < 36;
  const isMid = !isSenior && !isYounger;
  const weightNum = parseInt(weight);
  const isOverweight = weightNum > 85;
  const isUnderweight = weightNum < 50;

  if (goal === 'muscle gain') {
    if (isSenior) {
      plan.push('Focus on 3x/week full-body workouts using machines or cables.');
      plan.push('Emphasize joint-friendly movements and controlled tempo.');
    } else if (isMid) {
      plan.push('Adopt a 4-day upper/lower body split with progressive overload.');
      plan.push('Use compound lifts: squats, bench press, deadlifts, overhead press.');
    } else {
      plan.push('Follow a 5-day push-pull-legs split to maximize hypertrophy.');
      plan.push('Train to failure on last sets and use drop sets occasionally.');
    }
    plan.push('Consume a 10–20% calorie surplus with 1.6–2.2g protein per kg bodyweight.');
  } else if (goal === 'fat loss') {
    if (isOverweight) {
      plan.push('Start with 3x/week walking and low-impact cardio to protect joints.');
    } else {
      plan.push('Include HIIT 2x/week and steady-state cardio 3x/week.');
    }
    plan.push('Strength train full-body 3x/week to preserve muscle mass.');
    plan.push('Eat a high-protein diet with a 15–20% calorie deficit.');
  } else if (goal === 'strength training') {
    plan.push('Use a 3–4 day split: squat, deadlift, bench press, overhead press.');
    plan.push('Stick to 4–6 rep range and 3–5 minute rest periods.');
    if (isSenior) plan.push('Incorporate mobility drills to protect joints and spine.');
  } else if (goal === 'endurance') {
    plan.push('Run or cycle 4–5 days/week with increasing volume weekly.');
    plan.push('Strength train 2x/week with bodyweight or kettlebell workouts.');
  } else {
    plan.push('Follow a balanced split including cardio, resistance, and flexibility work.');
    plan.push('Track progress monthly and adjust frequency/volume accordingly.');
  }

  res.status(200).json({ recommendation: plan, searchCount: totalResults });
}
