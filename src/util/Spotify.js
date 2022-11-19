const clientId = '18523cfcd8f648a6a94af1b19bdd5182';
const redirectUri = 'http://localhost:3000/';
const clientSecret = '57dfce01b5be487793d7ae3b6858175e';
let accessToken;

const Spotify = {

    getAccessToken() {

        if(accessToken){
            return accessToken;
        } else {
            console.log("User access token is not set");
        }

    //check for access token matches

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenMatch && expiresInMatch){
            
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            
            // Clear parameters and allow to grab a new access token when it expires.

            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Acess Token', null, '/');
            return accessToken;

        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
        
    },

    search(term){
        const accessToken = Spotify.getAccessToken();
        const endpoint = 'https://api.spotify.com/v1/search?type=track&q=';
        return fetch(endpoint+term, 
                    { headers: { 
                        Authorization: `Bearer ${accessToken}`
                    } 
                }).then(response => {
                    return response.json(); //converts response to jason
                }).then(jsonResponse => { //checks if response is empty, if yes, returns an empty array, if not returns the required object.
                    if(!jsonResponse.traks) {
                        return [];
                    } else {

                        return jsonResponse.traks.items.map(track => ({
                            id: track.id,
                            name: track.name,
                            artist: track.artist[0].name,
                            album: track.album.name,
                            uri: track.uri
                        }));
                        
                    }
                })

    }

}

export default Spotify;