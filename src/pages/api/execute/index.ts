import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  let body;

  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch (e) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  const { summary, description, year, month, day, hour, minute, duration } = body;

  if (!summary || !description || !year || !month || !day || !hour || !minute || !duration) {
    return res.status(400).json({ error: "Missing required scheduling fields" });
  }

  return res.status(200).json({
    message: "Event scheduled successfully!",
    event: { summary, description, year, month, day, hour, minute, duration }
  });
}
