import React from 'react';

const SpotifyButton = props => {
    return (
        <div>
            {
                props.headerMessage || null
            }
            <button onClick={props.connectToSpotify}>Connect to Spotify</button>
        </div>
    );
};
export default SpotifyButton;