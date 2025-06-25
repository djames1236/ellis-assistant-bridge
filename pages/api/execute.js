export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  let data;
  try {
    data = req.body;
  } catch (err) {
    res.status(400).json({ error: 'Invalid JSON' });
    return;
  }

  const { summary, description, year, month, day, hour, minute, duration } = data;

  if (!summary || !description || !year || !month || !day || !hour || !minute || !duration) {
    res.status(400).json({ error: 'Missing required scheduling fields' });
    return;
  }

  console.log('Received request:', data);

  res.status(200).json({
    message: 'Event scheduled successfully.',
    received: data
  });
}
