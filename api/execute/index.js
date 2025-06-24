export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  const { summary, description, year, month, day, hour, minute, duration } = body;

  if (!summary || !description || !year || !month || !day || !hour || !minute || !duration) {
    return res.status(400).json({ error: "Missing required scheduling fields" });
  }

  return res.json({
    message: "Event scheduled (mock)",
    event: { summary, description, year, month, day, hour, minute, duration }
  });
}
