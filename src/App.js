import React from 'react';
import SpotifyButton from './SpotifyButton';
import SpotifyClient from './SpotifyClient';
import './App.scss';
import PlaylistChooser from './PlaylistChooser';
const spotifyClientId = '709812ebb0fe4fad9b716f514f6d3c25';


const AppHeader = () => <h1 className="app-header text-center">Rotache</h1>;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.spotifyClient = new SpotifyClient({
            clientId: spotifyClientId,
            scopes: [
                        'playlist-read-private',
                        'playlist-modify-public',
                        'playlist-modify-private'
                    ],
            callbackUrl: 'spotifyCallback/',
            bail: (message) => {this.setState({
                current: 'authenticateToSpotify',
                spotify: {
                    message: message
                }
            })}
        });          
        this.state = {
            current: this.spotifyClient.checkToken() ? 'choosePlaylist' : 'authenticateToSpotify', 
            spotify: {
                authenticated: localStorage.getItem('spotifyToken') ? true : false,
                message: "You must authenticate to Spotify to use Rotache."
            }
        };
    }

    render() {
        let mainView = '';
        switch(this.state.current) {
            case 'authenticateToSpotify' : 
                mainView =  (
                    <SpotifyButton 
                        connectToSpotify = {() => this.spotifyClient.connect()}
                        headerMessage = {this.state.spotify.message}
                    />
                );
                break;
            case 'choosePlaylist' : 
                mainView = (
                    <PlaylistChooser 
                        spotifyClient = {this.spotifyClient}
                    />
                );
                break;

            default: 
                mainView = (
                    <p>Uh oh.</p>
                );
                break;
        }
        
        return(
            <div className="app-container">
                <AppHeader />
                {mainView}
            </div>

        );
    }
}


export default App;