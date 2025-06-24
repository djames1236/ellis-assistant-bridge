import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { user_input } = req.body;

  if (!user_input) {
    return res.status(400).json({ error: "Missing user_input" });
  }

  try {
    const thread = await openai.beta.threads.create();
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: process.env.ASSISTANT_ID,
      instructions: user_input
    });

    return res.json({
      run_id: run.id,
      thread_id: thread.id,
      data: run
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
}
