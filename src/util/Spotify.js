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

         }

    }


}


export default Spotify;