import React from 'react';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import LyricCreate from './LyricCreate';
import LyricList from "./LyricList";
import query from "../queries/fetchSong";

class SongDetails extends React.Component {
    onLike(id, likes) {
        console.log('[SongDetails] id', id);
        console.log('[SongDetails] likes', likes);

        const { mutate } = this.props;

        mutate({
            variables: {
                id
            },
            optimisticResponse: {
                __typename: 'Mutation',
                likeLyric: {
                    id,
                    __typename: 'LyricType',
                    likes: likes + 1
                }
            }
        })
    }

    render() {
        const { data } = this.props;
        const { song } = data;

        if(!song) {
            return (
                <div>
                    <p>Loading...</p>
                </div>
            )
        }

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col s12">
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                <span className="card-title">
                                    Song Details
                                </span>
                                <p>ID: {song.id}</p>
                                <p>Title: {song.title}</p>
                            </div>

                            <div className="card-action">
                                <a href="#">This is a link</a>
                                <a href="#">This is a link</a>
                            </div>
                        </div>
                    </div>
                </div>

                <LyricList list={song.lyrics} onLike={(id, likes) => this.onLike(id, likes)}/>

                <LyricCreate songId={song.id}/>
            </React.Fragment>
        )
    }
}

const mutation = gql`
    mutation LikeLyric($id: ID) {
        likeLyric(id: $id) {
            id
            likes
        }
    }
`;

export default compose(
    withRouter,
    graphql(mutation),
    graphql(query, {
        options: (props) => {
            return {
                variables: {
                    id: props.match.params.id
                }
            }
        }
    })
)(SongDetails);