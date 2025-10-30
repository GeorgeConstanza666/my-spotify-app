// Spotify.js
const clientId = 'cfb8b8d074a141debac26e9b4ac44e4f';
const redirectUri = 'http://127.0.0.1:5173/'; // Тот же, что в Spotify Dashboard
let accessToken = null;

// Генератор случайной строки для PKCE
function generateRandomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
  return result;
}

// Генерация code challenge для PKCE
async function generateCodeChallenge(codeVerifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

const Spotify = {
  async login() {
    const codeVerifier = generateRandomString(128);
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    localStorage.setItem('code_verifier', codeVerifier);

    const scope = 'playlist-modify-public';
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scope)}&code_challenge_method=S256&code_challenge=${codeChallenge}`;
    
    window.location.href = authUrl;
  },

  async fetchAccessToken(code) {
    const codeVerifier = localStorage.getItem('code_verifier');

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
      client_id: clientId,
      code_verifier: codeVerifier,
    });

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });

    const data = await response.json();
    if (data.access_token) {
      accessToken = data.access_token;
      localStorage.removeItem('code_verifier');
      console.log('Access token obtained:', accessToken);
    }
  },

  async handleRedirect() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (code && !accessToken) {
      await this.fetchAccessToken(code);
      window.history.replaceState({}, document.title, '/'); // убираем ?code= из URL
    }
  },

  async search(term) {
    if (!accessToken) {
      alert('Please login to Spotify first!');
      return [];
    }

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (!response.ok) return [];
      const jsonResponse = await response.json();
      if (!jsonResponse.tracks) return [];

      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
      }));
    } catch (error) {
      console.error('Spotify fetch error:', error);
      return [];
    }
  },
};

export default Spotify;
