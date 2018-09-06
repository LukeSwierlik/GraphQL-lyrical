import React from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import query from '../queries/fetchSongs';

class SongList extends React.Component {

    renderSongs() {
        const { songs } = this.props.data;
        const { deleteSong } = this.props;

        return songs.map(song => (
            <li key={song.id} className="collection-item">
                <Link to={`/song/${song.id}`}>
                    {song.title}
                </Link>

                <i className={'material-icons'} onClick={() => deleteSong(song.id)}>delete</i>
            </li>
        ));
    }

    render() {
        const { loading } = this.props.data;

        if(loading) {
            return (
                <div>
                    Loading...
                </div>
            )
        }

        return (
            <ul className="collection">
                {this.renderSongs()}
            </ul>
        );
    }
}

export default graphql(query)(SongList);