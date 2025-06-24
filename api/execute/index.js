
export default async function handler(req, res) {
  try {
    const { summary, year, month, day, hour, minute, duration } = req.body;

    if (!summary || !year || !month || !day || !hour || !minute || !duration) {
      return res.status(400).json({ error: 'Missing required scheduling fields' });
    }

    // For now, simply log the payload — this is where your calendar integration would happen
    console.log("Scheduling event:");
    console.log({
      summary, year, month, day, hour, minute, duration
    });

    return res.status(200).json({
      message: "Event scheduled (mock)",
      event: { summary, year, month, day, hour, minute, duration }
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
