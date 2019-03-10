import uuidv4 from 'uuid/v4';

const redirectUrlBase = 'https://accounts.spotify.com/authorize';

class SpotifyClient {
    constructor(props) {
        this.callbackUrl = props.callbackUrl || 'callback/';
        this.scopes = props.scopes;
        this.clientId = props.clientId;
    }

    connect = () => {
        const spotifyState = uuidv4();
        const scopes = this.scopes.join('%20');

        var redirectUrl = redirectUrlBase;
        redirectUrl +=  `?client_id=${this.clientId}`
                    +   '&response_type=token'
                    +   `&redirect_uri=${window.location.origin}/${this.callbackUrl}`
                    +   `&state=${spotifyState}`
                    +   `&scope=${scopes}`
                    +   '&show_dialog=true';

        sessionStorage.setItem('spotifyState', spotifyState);

        window.location = redirectUrl;
    }

    checkToken = () => {
        if (!localStorage.getItem('spotifyToken')){
            return false;
        }

        const soon = (Date.now()/1000) + 10;
        return JSON.parse(localStorage.getItem('spotifyToken')).expires > soon ? true : false;
    }
}

export default SpotifyClient;