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

    return res.status(200).json({ message: 'Task received successfully' });
  } catch (error) {
    console.error('Error handling request:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
