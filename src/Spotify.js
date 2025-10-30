const clientId = 'cfb8b8d074a141debac26e9b4ac44e4f';
const redirectUri = 'http://127.0.0.1:5173/';
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) return accessToken;

    // Проверяем, есть ли токен в URL
    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (tokenMatch && expiresMatch) {
      accessToken = tokenMatch[1];
      const expiresIn = Number(expiresMatch[1]);
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const scope = 'playlist-modify-public';
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${scope}&redirect_uri=${redirectUri}`;
      window.location = authUrl;
    }
  },

  async search(term) {
    const token = this.getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const jsonResponse = await response.json();
    if (!jsonResponse.tracks) return [];
    return jsonResponse.tracks.items.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri,
    }));
  },
};

export default Spotify;
