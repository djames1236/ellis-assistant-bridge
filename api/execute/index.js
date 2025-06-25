export async function POST(request) {
  try {
    const data = await request.json();
    const { summary, description, year, month, day, hour, minute, duration } = data;

    return new Response(JSON.stringify({
      message: "Event scheduled successfully.",
      event: {
        summary,
        description,
        year,
        month,
        day,
        hour,
        minute,
        duration
      }
    }), {
      headers: { "Content-Type": "application/json" },
     

export async function POST(request) {
  try {
    const data = await request.json();
    const { summary, description, year, month, day, hour, minute, duration } = data;

    return new Response(JSON.stringify({
      message: "Event scheduled successfully.",
      event: {
        summary,
        description,
        year,
        month,
        day,
        hour,
        minute,
        duration
      }
    }), {
      headers: { "Content-Type": "application/json" },
      status: 200
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid request." }), {
      headers: { "Content-Type": "application/json" },
      status: 400
    });
  }
}

