import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import query from '../queries/fetchSongs';

class SongCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            songName: ''
        };
    }

    handleChange({ target }){
        const songName = target.value;

        this.setState({
            songName
        });
    };

    handleSubmit(event) {
        event.preventDefault();

        const { songName } = this.state;
        const { mutate, history } = this.props;

        mutate({
            variables: {
                title: songName
            },
            refetchQueries: [{
                query
            }]
        }).then(() => {
            history.push('/');
        }).catch(err => {
            console.log('[SongCreate] err', err);
        })
    }

    render() {
        const { songName } = this.state;

        return (
            <div className="row">
                <form className="col s12" onSubmit={(event) => this.handleSubmit(event)}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                placeholder="song Name"
                                id="song_name" type="text"
                                className="validate"
                                onChange={event => this.handleChange(event)}
                            />
                            <label htmlFor="song_name">Add new song</label>
                        </div>

                        <p>Song title: {songName}</p>
                    </div>

                    <button
                        className="waves-effect waves-light btn-small"
                        type={'submit'}
                    >
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

const mutation = gql`
    mutation AddSong($title: String) {
        addSong(title: $title) {
            title
        }
    }
`;

export default compose(
    withRouter,
    graphql(mutation)
)(SongCreate);