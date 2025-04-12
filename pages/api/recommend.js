
export default function handler(req, res) {
  if (req.method === 'POST') {
    const { age, sex, height, goal } = req.body;

    let recommendation = '';
    if (goal === 'muscle gain') {
      recommendation = `At age ${age}, as a ${sex}, focus on compound lifts like bench press, deadlifts, and squats. Follow a 4-5 day push-pull-legs split, with progressive overload.`;
    } else if (goal === 'weight loss') {
      recommendation = `Combine strength training and cardio. Try HIIT 3x/week, moderate weights, and full-body workouts. Diet control is key.`;
    } else if (goal === 'endurance') {
      recommendation = `Engage in circuit training, bodyweight workouts, and long-duration cardio like running or cycling 4-5 days a week.`;
    } else {
      recommendation = `Please select a valid goal.`;
    }

    res.status(200).json({ recommendation });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
