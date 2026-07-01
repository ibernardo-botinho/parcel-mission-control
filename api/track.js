export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  try {
    const apiKey = process.env.SHIP24_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "Missing SHIP24_API_KEY environment variable in Vercel."
      });
    }

    const { trackingNumber } = req.body || {};
    if (!trackingNumber) {
      return res.status(400).json({ error: "Missing trackingNumber" });
    }

    const response = await fetch("https://api.ship24.com/public/v1/trackers/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        trackingNumber,
        destinationCountryCode: "AU"
      })
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Ship24 API returned an error",
        status: response.status,
        details: data
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: "Serverless function error",
      details: error.message
    });
  }
}