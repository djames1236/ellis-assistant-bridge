
export default async function handler(req, res) {
  try {
    const { user_input } = req.body;
    if (!user_input) return res.status(400).json({ error: 'Missing user input' });
    const openai = require('openai');
    const client = new openai.OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const thread = await client.beta.threads.create();
    const run = await client.beta.threads.runs.create(thread.id, {
      assistant_id: process.env.ASSISTANT_ID,
      instructions: user_input
    });
    return res.status(200).json({ data: run, thread_id: thread.id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
