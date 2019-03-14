import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

class PlaylistChooser extends React.Component {
    constructor(props) {
        super(props);  
        this.state = {
        
        };

        this.props.spotifyClient.getMyPlaylists()
            .then(response => {
                this.setState({
                    playlists: response
                });
            });
    }

    render() {
        if (!this.state.playlists){
            return (
                <p>Loading...</p>
            );
        }

        let playlistsList = this.state.playlists.items.map(playlist => (
            <ListGroup.Item key={playlist.id}>
                <div className="playlistMeta">
                    <p>{playlist.name}</p>
                    <p className="small">by {playlist.owner.display_name} ({playlist.tracks.total} tracks)</p>
                </div>
                {playlist.images.length > 0 &&
                    <img className="playlist-thumbnail" src={playlist.images[0].url} alt=""/>
                }
            </ListGroup.Item>
        ));

        return (
            <ListGroup>
                {playlistsList}
            </ListGroup>
        );
    }
}


export default PlaylistChooser;