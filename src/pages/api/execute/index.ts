import type { NextApiRequest, NextApiResponse } from "next";

async function parseBody(req: NextApiRequest): Promise<any> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks).toString();
  return JSON.parse(buffer);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const body = await parseBody(req);
  const { summary, description, year, month, day, hour, minute, duration } = body;

  if (!summary || !description || !year || !month || !day || !hour || !minute || !duration) {
    return res.status(400).json({ error: "Missing required scheduling fields" });
  }

  return res.status(200).json({
    message: "Event scheduled successfully!",
    event: { summary, description, year, month, day, hour, minute, duration }
  });
}
