import type { NextApiRequest, NextApiResponse } from "next";

export const config = { api: { bodyParser: false } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const buffers = [];
  for await (const chunk of req) {
    buffers.push(chunk);
  }
  const rawBody = Buffer.concat(buffers).toString("utf-8");

  let data;
  try { data = JSON.parse(rawBody); }
  catch { return res.status(400).json({ error: "Invalid JSON" }); }

  const { summary, description, year, month, day, hour, minute, duration } = data;
  if (!summary || !description || !year || !month || !day || !hour || !minute || !duration) {
    return res.status(400).json({ error: "Missing required scheduling fields" });
  }

  return res.status(200).json({
    message: "Event scheduled successfully!",
    event: { summary, description, year, month, day, hour, minute, duration }
  });
}
