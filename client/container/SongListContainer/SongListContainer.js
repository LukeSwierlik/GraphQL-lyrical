import React from 'react';
import { graphql } from "react-apollo";
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import SongList from "../../components/SongList";
import query from "../../queries/fetchSongs";

class SongListContainer extends React.Component {

    deleteSong(id) {
        console.log('[SongListContainer] deleteSong', id);
        const { mutate, data } = this.props;

        mutate({
            variables: {
                id
            }
        })
            .then(() => data.refetch())
            .catch(err => {
                console.log('[SongListContainer] err', err);
            });
    }

    render() {
        return (
            <div className="col s12">
                <h1>Song List</h1>

                <SongList deleteSong={(id) => this.deleteSong(id)}/>

                <div className="fixed-action-btn">
                    <Link
                        className="btn-floating btn-large red"
                        to={'/song/create'}
                    >
                        <i className="large material-icons">mode_edit</i>
                    </Link>
                </div>
            </div>
        )
    }
}

const mutation = gql`
    mutation DeleteSong($id: ID) {
        deleteSong(id: $id) {
            id
        }
    }
`;

export default compose(
    graphql(mutation),
    graphql(query)
)(SongListContainer);