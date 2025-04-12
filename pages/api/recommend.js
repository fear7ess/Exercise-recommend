
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { age, gender, height, weight, goal } = req.body;
    const serpApiKey = 'e8edcd447e65bb0edfba5e96b29352d4488461d4514b96b0bdea669804a6c8ce';
    let recommendation = [];
    let totalResults = 0;

    try {
      const searchQuery = `gym workout plan for ${goal} for ${age} year old ${gender}`;
      const serpResponse = await fetch(`https://serpapi.com/search.json?q=${encodeURIComponent(searchQuery)}&api_key=${serpApiKey}`);
      const data = await serpResponse.json();
      const links = data.organic_results || [];
      totalResults = links.length;
    } catch (error) {
      console.error('Search error:', error);
    }

    recommendation = [
      `You are ${age} years old, ${gender}, ${height} cm, ${weight} kg.`,
      `Your goal is ${goal}. Follow a workout split tailored for that purpose.`,
      `Include strength training, mobility, and recovery exercises. Stick to a routine and eat accordingly.`
    ];

    res.status(200).json({ recommendation, searchCount: totalResults });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
