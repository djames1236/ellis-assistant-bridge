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
      duration,
      category,
      dueDate,
      timeSchemeId
    } = req.body;

    console.log('Received data:', {
      summary,
      description,
      year,
      month,
      day,
      hour,
      minute,
      duration,
      category,
      dueDate,
      timeSchemeId
    });

    // Compose start datetime
    const startISO = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00Z`;

    // Call Reclaim API
    const response = await fetch('https://api.app.reclaim.ai/api/tasks', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RECLAIM_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: summary,
        notes: description,
        durationMinutes: duration,
        eventCategory: category,
        alwaysPrivate: true,
        due: dueDate || null,
        eventColor: null,
        maxChunkSize: 8,
        minChunkSize: 2,
        onDeck: false,
        priority: "P2",
        snoozeUntil: null,
        status: "NEW",
        timeChunksRequired: 4,
        timeSchemeId: timeSchemeId || null,
        timeConstraints: [
          {
            start: startISO
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
