import React from 'react';
import SpotifyButton from './SpotifyConnector';

const AppHeader = () => <h1 className="app-header">Rotache</h1>;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        let initialView = this.state.spotifyAuth ? (
            <p>Authenticated to spotify</p>
        ) : (
            <SpotifyButton 
                app = {this}
            />
        )        

        return(
            <div>
                <AppHeader />
                {initialView}
            </div>

        );
    }
}


export default App;