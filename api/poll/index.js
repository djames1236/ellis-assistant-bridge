
import OpenAI from 'openai';

export default async function handler(req, res) {
  try {
    const { run_id, thread_id } = req.body;
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const runStatus = await client.beta.threads.runs.retrieve(thread_id, run_id);
    if (runStatus.status === 'requires_action') {
      return res.status(200).json({ status: runStatus.status, tool_calls: runStatus.required_action.submit_tool_outputs.tool_calls });
    }
    return res.status(200).json({ status: runStatus.status });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
