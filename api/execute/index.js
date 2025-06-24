
export default async function handler(req, res) {
  try {
    const { summary, description, year, month, day, hour, minute, duration } = req.body;

    if (!summary || !description || !year || !month || !day || !hour || !minute || !duration) {
      return res.status(400).json({ error: 'Missing required scheduling fields' });
    }

    // Mock calendar injection — replace with your calendar API call here
    console.log("Scheduling event:");
    console.log({
      summary, description, year, month, day, hour, minute, duration
    });

    return res.status(200).json({
      message: "Event scheduled (mock)",
      event: { summary, description, year, month, day, hour, minute, duration }
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
