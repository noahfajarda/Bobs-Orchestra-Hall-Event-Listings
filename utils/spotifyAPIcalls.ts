// set spotify API credentials
const client_id = process.env.NEXT_PUBLIC_CLIENT_ID; // Spotify Client_ID
const client_secret = process.env.NEXT_PUBLIC_CLIENT_SECRET; // Spotify Client_Secret

// "retrieve ACCESS TOKEN" function
export async function getAccessToken() {
  const testing = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      // taken from spotify api docs
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ` + btoa(client_id + ":" + client_secret),
    },
    body: "grant_type=client_credentials",
  });
  const filteredResults = await testing.json();

  // RETRIEVING THE ACCESS TOKEN
  const accessToken = filteredResults.access_token;
  return accessToken;
}

export function accessTokenExpired() {
  // colored error message
  console.log("\x1b[31m" + "\nThe access token expired.");
  console.log("\x1b[31m" + "Copy the access token again printed from console.");
}

export async function searchTrack(trackName, accessToken) {
  const trackRes = await fetch(
    `https://api.spotify.com/v1/search?q=${trackName}&type=track&limit=10`,
    // add `limit=1` at the end to limit results
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  let tracks = await trackRes.json();
  tracks = tracks.tracks.items;
  return tracks;
}
