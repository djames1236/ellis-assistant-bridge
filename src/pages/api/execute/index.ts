import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const {
    summary,
    description,
    year,
    month,
    day,
    hour,
    minute,
    duration,
  } = req.body;

  if (
    !summary || !description || !year || !month ||
    !day || !hour || !minute || !duration
  ) {
    return res.status(400).json({ error: 'Missing required scheduling fields' });
  }

  res.status(200).json({
    message: 'Event scheduled successfully (mock)',
    event: {
      summary,
      description,
      year,
      month,
      day,
      hour,
      minute,
      duration,
    }
  });
}
