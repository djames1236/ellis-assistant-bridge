import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { run_id, thread_id } = req.body;

  if (!run_id || !thread_id) {
    return res.status(400).json({ error: "Missing run_id or thread_id" });
  }

  try {
    const runStatus = await openai.beta.threads.runs.retrieve(thread_id, run_id);
    return res.json(runStatus);
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
}
