
import { google } from 'googleapis';

export default async function handler(req, res) {
  try {
    const { summary, description, year, month, day, hour, minute, duration } = req.body;

    if (!summary || !description ||
        year === undefined || month === undefined || day === undefined ||
        hour === undefined || minute === undefined || duration === undefined) {
      return res.status(400).json({ error: 'Missing required scheduling fields' });
    }

    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/calendar']
    });
    const calendar = google.calendar({ version: 'v3', auth });
    const startDateTime = new Date(Date.UTC(year, month - 1, day, hour, minute));
    const endDateTime = new Date(startDateTime.getTime() + duration * 60000);
    const event = {
      summary: summary,
      description: description,
      start: { dateTime: startDateTime.toISOString(), timeZone: 'America/Los_Angeles' },
      end: { dateTime: endDateTime.toISOString(), timeZone: 'America/Los_Angeles' },
    };
    const response = await calendar.events.insert({ calendarId: 'primary', requestBody: event });
    return res.status(200).json({ message: 'Event scheduled', eventId: response.data.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
