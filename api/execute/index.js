export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  try {
    const body = await request.json();
    const { summary, description, year, month, day, hour, minute, duration } = body;

    if (!summary || !description || !year || !month || !day || !hour || !minute || !duration) {
      return new Response(JSON.stringify({ error: "Missing required scheduling fields" }), { status: 400 });
    }

    return new Response(JSON.stringify({
      message: "Event scheduled (mock)",
      event: { summary, description, year, month, day, hour, minute, duration }
    }), { status: 200 });

  } catch (err) {
    console.error("Error parsing body:", err);
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400 });
  }
}
