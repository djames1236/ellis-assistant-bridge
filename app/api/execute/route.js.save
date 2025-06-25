export async function POST(req) {
  const data = await req.json();
  const { summary, description, year, month, day, hour, minute, duration } = data;

  return Response.json({
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
  });
}

