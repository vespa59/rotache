import React from 'react';
import SpotifyButton from './SpotifyButton';
import SpotifyClient from './SpotifyClient';
const spotifyClientId = '709812ebb0fe4fad9b716f514f6d3c25';

const AppHeader = () => <h1 className="app-header">Rotache</h1>;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spotify: {
                authenticated: localStorage.getItem('spotifyToken') ? true : false,
                message: "You must authenticate to Spotify to use Rotache."
            }
        };
        this.spotifyClient = new SpotifyClient({
            clientId: spotifyClientId,
            scopes: [
                        'playlist-read-private',
                        'playlist-modify-public',
                        'playlist-modify-private'
                    ],
            callbackUrl: 'spotifyCallback/'
            });   
    }

    render() {
        let mainView = this.spotifyClient.checkToken() ? (
            <p>Authenticated to spotify</p>
        ) : (
            <SpotifyButton 
                connectToSpotify = {() => this.spotifyClient.connect()}
                headerMessage = {this.state.spotify.message}
            />
        )        

        return(
            <div>
                <AppHeader />
                {mainView}
            </div>

        );
    }
}


export default App;