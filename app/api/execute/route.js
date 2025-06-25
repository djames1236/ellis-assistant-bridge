export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch (err) {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { summary, description, year, month, day, hour, minute, duration } = data;

  if (!summary || !description || !year || !month || !day || !hour || !minute || !duration) {
    return Response.json({ error: 'Missing required scheduling fields' }, { status: 400 });
  }

  console.log('Received request:', data);

  return Response.json({
    message: 'Event scheduled successfully.',
    received: data
  });
}
