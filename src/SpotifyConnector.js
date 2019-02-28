import React from 'react';

class SpotifyButton extends React.Component {
    constructor (props){
        super(props);

        this.connectToSpotify = () => {
            console.log('connect to spotify');
            props.app.setState(
                {spotifyAuth: 1}
            );
        }
    }

    render() {
        return (
            <button onClick={this.connectToSpotify}>Connect to Spotify</button>
        )
    }
}

export default SpotifyButton;