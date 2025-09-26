export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const API_KEY = process.env.OPENWEATHER_API_KEY;
  const CITY = "Richmond"; // Change this to your city

  if (!API_KEY) {
    console.error("Missing OPENWEATHER_API_KEY environment variable");
    return res.status(500).json({ error: "Weather API key not configured" });
  }

  console.log("API Key present:", !!API_KEY);
  console.log("Making request to OpenWeather for:", CITY);

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenWeather API error:", response.status, errorText);
      throw new Error(`Weather API request failed: ${response.status}`);
    }

    const data = await response.json();

    // Check if it's nighttime in Richmond, VA (UTC-5/-4)
    const richmondTime = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    const currentHour = new Date(richmondTime).getHours();
    const isNight = currentHour >= 20 || currentHour <= 6; // 8 PM to 6 AM

    let icon;

    if (isNight) {
      // Show moon phase at night
      icon = getMoonPhase();
    } else {
      // Map weather conditions to simple icons for daytime
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
        mist: "☁️",
        fog: "☁️",
        haze: "☁️",
      };

      const description = data.weather[0].description.toLowerCase();
      icon = weatherIconMap[description] || "🌤️"; // Default to partly cloudy
    }

    function getMoonPhase() {
      // Calculate moon phase based on current date
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();

      // Simple moon phase calculation (approximate)
      const c = Math.floor((year - 1900) / 100);
      const e = 2 * (c - 19) - Math.floor((year - 1900 - 100 * c) / 4);
      const f = month + Math.floor((9 + month) / 12);
      const g = year + Math.floor((month + 9) / 12);
      const d = day + Math.floor((153 * f - 457) / 5) + 365 * g + Math.floor(g / 4) - Math.floor(g / 100) + Math.floor(g / 400) - 306;
      const phase = ((d + e) % 30);

      // Convert phase to emoji
      if (phase < 2 || phase > 28) return "🌑"; // New moon
      if (phase < 7) return "🌒"; // Waxing crescent
      if (phase < 9) return "🌓"; // First quarter
      if (phase < 14) return "🌔"; // Waxing gibbous
      if (phase < 16) return "🌕"; // Full moon
      if (phase < 21) return "🌖"; // Waning gibbous
      if (phase < 23) return "🌗"; // Last quarter
      return "🌘"; // Waning crescent
    }

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
