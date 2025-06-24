import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { summary, description, year, month, day, hour, minute, duration } = req.body;

  if (!summary || !year || !month || !day || !hour || !minute || !duration) {
    return res.status(400).json({ error: 'Missing required scheduling fields' });
  }

  res.status(200).json({
    message: 'Event scheduled successfully!',
    event: { summary, description, year, month, day, hour, minute, duration }
  });
}
