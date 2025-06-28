export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      summary,
      description,
      year,
      month,
      day,
      hour,
      minute,
      duration
    } = req.body;

    console.log('Received data:', {
      summary,
      description,
      year,
      month,
      day,
      hour,
      minute,
      duration
    });

    // Call Reclaim API
    const response = await fetch('https://api.app.reclaim.ai/api/v1/tasks', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RECLAIM_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: summary,
        notes: description,
        durationMinutes: duration,
        timeConstraints: [
          {
            start: `${year}-${month}-${day}T${hour}:${minute}:00Z`
          }
        ]
      })
    });

    const data = await response.json();
    console.log('Reclaim response:', data);

    return res.status(200).json({ message: 'Task created in Reclaim', data });
  } catch (error) {
    console.error('Error handling request:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
