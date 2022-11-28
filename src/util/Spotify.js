const clientId = '262c0c96879c4e4da23a26da7cc392be';
//const redirectUri = 'http://localhost:3000/';
const redirectUri = 'https://loquacious-zuccutto-c58a58.netlify.app/';
let accessToken;

const Spotify = {

    getAcessToken(){
         if (accessToken) {
            return accessToken;
         }

         //check for 'access_token' and 'expires_in' on url and get its values
         //check the url at the window(browser) on address bar and get from url what is between 'access_token='/'expires_in' and '&' symbol
         const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/); 
         const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/); 

         if(accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            // clears the parameters to get a new access token when it is expired
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Acess Token', null, '/');
            return accessToken;
         } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
         }
    },

    search(term){
      const accessToken = Spotify.getAcessToken();
      return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, { 
         headers: {
            Authorization: `Bearer ${accessToken}`
         }
      }).then(response => {
         return response.json();
      }).then(jsonResponse => {
         if(!jsonResponse.tracks) {
            return [];
         }
         return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
         }));
      });
    },

    savePlaylist(name, trackUris) {
      if (!name || !trackUris) {
         return;
      }

      const accessToken = Spotify.getAcessToken();
      const headers = { Authorization: `Bearer ${accessToken}`};
      let userId;

      return fetch('https://api.spotify.com/v1/me', {headers: headers}
      ).then(response => response.json()
      ).then(jsonResponse => {
         userId = jsonResponse.id;
         return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
         {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({ name: name })
         }).then(response => response.json()
         ).then(jsonResponse => {
            const playlistId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
            {
               headers: headers,
               method: 'POST',
               body: JSON.stringify({ uris: trackUris })
            })
         })
      })

    }
}


export default Spotify;