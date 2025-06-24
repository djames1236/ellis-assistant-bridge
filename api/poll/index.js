
export default async function handler(req, res) {
  try {
    const { run_id, thread_id } = req.body;

    if (!run_id || !thread_id) {
      return res.status(400).json({ error: 'Missing run_id or thread_id' });
    }

    const response = await fetch(`https://api.openai.com/v1/threads/${thread_id}/runs/${run_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'OpenAI-Beta': 'assistants=v2'
      }
    });

    if (!response.ok) {
      const error = await response.json();
      return res.status(500).json({ error });
    }

    const data = await response.json();

    if (data.status !== 'completed') {
      return res.status(200).json({ status: data.status });
    }

    const tool_outputs = data.required_action?.submit_tool_outputs?.tool_calls || data.tool_calls;

    return res.status(200).json({ tool_outputs });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
