
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { age, sex, height, weight, goal } = req.body;
    const serpApiKey = 'e8edcd447e65bb0edfba5e96b29352d4488461d4514b96b0bdea669804a6c8ce';
    let recommendation = '';
    let totalResults = 0;
    let topLink = '';

    try {
      const searchQuery = `best gym exercise plan for ${goal} for ${age} year old ${sex}`;
      const serpResponse = await fetch(`https://serpapi.com/search.json?q=${encodeURIComponent(searchQuery)}&api_key=${serpApiKey}`);
      const data = await serpResponse.json();

      const links = data.organic_results || [];
      totalResults = links.length;
      topLink = links[0]?.link || '';
    } catch (error) {
      console.error('Search error:', error);
    }

    if (goal === 'muscle gain') {
      recommendation = `You're ${age} years old, ${sex}, ${height}, weighing ${weight} kg.\nTo gain muscle, follow a 5-day split:\n- Chest & Triceps\n- Back & Biceps\n- Legs\n- Shoulders & Core\n- Full Body Strength\n\nUse compound lifts like squats, bench press, and deadlifts.`;
    } else if (goal === 'weight loss') {
      recommendation = `You're ${age}, ${sex}, height ${height}, weight ${weight} kg.\nTo lose weight:\n- 3x/week HIIT\n- 2x/week full-body strength\n- Stay in a calorie deficit.`;
    } else if (goal === 'endurance') {
      recommendation = `You're ${age}, ${sex}, height ${height}, weight ${weight} kg.\nTo boost endurance:\n- 4x/week cardio\n- 2x/week light resistance training\n- Focus on steady state cardio and high reps.`;
    } else {
      recommendation = 'Please select a valid goal.';
    }

    if (totalResults > 0) {
      recommendation += `\n\nBased on ${totalResults} online sources.\nTop Source: ${topLink}`;
    }

    res.status(200).json({ recommendation });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
