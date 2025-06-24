export const config = {
  api: {
    bodyParser: false,
  },
};

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', () => {
      try {
        resolve(JSON.parse(data));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', err => reject(err));
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = await parseBody(req);
    const { summary, description, year, month, day, hour, minute, duration } = body;

    if (!summary || !description || !year || !month || !day || !hour || !minute || !duration) {
      return res.status(400).json({ error: "Missing required scheduling fields" });
    }

    return res.json({
      message: "Event scheduled (mock)",
      event: { summary, description, year, month, day, hour, minute, duration }
    });
  } catch (err) {
    console.error("Error parsing body:", err);
    return res.status(400).json({ error: "Invalid JSON body" });
  }
}
