export default async function handler(req, res) {
  try {
    const { user_input } = req.body;

    if (!user_input) {
      return res.status(400).json({ error: 'Missing user_input' });
    }

    const assistant_id = process.env.ASSISTANT_ID;

    const response = await fetch('https://api.openai.com/v1/threads/runs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        assistant_id: assistant_id,
        instructions: user_input,
        model: "gpt-4o"
      })
    });

    if (!response.ok) {
      const error = await response.json();
      return res.status(500).json({ error });
    }

    const data = await response.json();
    return res.status(200).json({ data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
