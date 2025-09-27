export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
  const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    console.error("Missing Spotify environment variables");
    return res.status(500).json({ error: "Spotify API not configured" });
  }

  try {
    // Get access token using refresh token
    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: REFRESH_TOKEN,
      }),
    });

    if (!tokenResponse.ok) {
      console.error("Token refresh failed:", tokenResponse.status);
      throw new Error("Failed to refresh access token");
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // First try to get currently playing track
    const currentlyPlayingResponse = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // If currently playing and music is active
    if (currentlyPlayingResponse.ok && currentlyPlayingResponse.status !== 204) {
      const currentlyPlayingData = await currentlyPlayingResponse.json();

      if (currentlyPlayingData && currentlyPlayingData.item && currentlyPlayingData.is_playing) {
        return res.status(200).json({
          track: currentlyPlayingData.item.name,
          artist: currentlyPlayingData.item.artists.map(artist => artist.name).join(", "),
          isCurrentlyPlaying: true,
        });
      }
    }

    // Fall back to recently played tracks
    const recentlyPlayedResponse = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=1",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!recentlyPlayedResponse.ok) {
      console.error("Recently played request failed:", recentlyPlayedResponse.status);
      throw new Error("Failed to fetch recently played tracks");
    }

    const recentlyPlayedData = await recentlyPlayedResponse.json();

    if (!recentlyPlayedData.items || recentlyPlayedData.items.length === 0) {
      return res.status(200).json({
        track: null,
        artist: null,
        message: "No recent tracks found",
      });
    }

    const lastTrack = recentlyPlayedData.items[0].track;

    res.status(200).json({
      track: lastTrack.name,
      artist: lastTrack.artists.map(artist => artist.name).join(", "),
      playedAt: recentlyPlayedData.items[0].played_at,
      isCurrentlyPlaying: false,
    });
  } catch (error) {
    console.error("Spotify API error:", error);
    res.status(500).json({ error: "Failed to fetch Spotify data" });
  }
}