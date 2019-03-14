import React from 'react';
import Button from 'react-bootstrap/Button';

const SpotifyButton = props => {
    return (
        <div className="spotify-button-container text-center">
            {
                props.headerMessage || null
            }
            <Button onClick={props.connectToSpotify}>Connect to Spotify</Button>
        </div>
    );
};
export default SpotifyButton;