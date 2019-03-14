import uuidv4 from 'uuid/v4';

const redirectUrlBase = 'https://accounts.spotify.com/authorize';
const spotifyUrlBase = 'https://api.spotify.com/v1/';

class SpotifyClient {
    constructor(props) {
        this.callbackUrl = props.callbackUrl || 'callback/';
        this.scopes = props.scopes;
        this.clientId = props.clientId;
        this.bail = props.bail;
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
        return JSON.parse(localStorage.getItem('spotifyToken')).expires > soon ? JSON.parse(localStorage.getItem('spotifyToken')).token : false;
    }

    getMyPlaylists = () => {
        return new Promise((resolve, reject) => {
            this.spotifyRequest({
                uri: 'me/playlists/?limit=50'
            })
            .then(response => {
                resolve (response);
            });
        });
    }

    spotifyRequest = (props) => {
        return new Promise((resolve, reject) => {
            fetch(`${spotifyUrlBase}${props.uri}`,
                {
                    method: props.method || 'GET',
                    body: props.body ? props.body : null,
                    headers: {
                        'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('spotifyToken')).token}`
                    }
                }
            ).then(res => res.json())
            .then(response => {
                if (response.error){
                    this.bail("Something went wrong. Try re-connecting to Spotify.");
                }
                resolve(response);
            })
            .catch(error => {
                this.bail("Something went wrong. Try re-connecting to Spotify.");
            });
        });
    }
}

export default SpotifyClient;