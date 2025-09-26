export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const API_KEY = process.env.OPENWEATHER_API_KEY;
  const CITY = "Richmond, VA"; // Change this to your city

  if (!API_KEY) {
    return res.status(500).json({ error: "Weather API key not configured" });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Weather API request failed");
    }

    const data = await response.json();

    // Map weather conditions to simple icons
    const weatherIconMap = {
      "clear sky": "☀️",
      "few clouds": "🌤️",
      "scattered clouds": "⛅",
      "broken clouds": "☁️",
      "overcast clouds": "☁️",
      "shower rain": "🌦️",
      rain: "🌧️",
      thunderstorm: "⛈️",
      snow: "🌨️",
      mist: "🌫️",
      fog: "🌫️",
      haze: "🌫️",
    };

    const description = data.weather[0].description.toLowerCase();
    const icon = weatherIconMap[description] || "🌤️"; // Default to partly cloudy

    res.status(200).json({
      icon,
      description: data.weather[0].description,
      temperature: Math.round(data.main.temp),
      city: data.name,
    });
  } catch (error) {
    console.error("Weather API error:", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
}
