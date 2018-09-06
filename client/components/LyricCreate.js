import React from 'react';
import { compose } from 'redux';
import gql from "graphql-tag";
import {graphql} from "react-apollo";

class LyricCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ''
        };
    }

    handlerChange({ target }) {
        const content = target.value;

        this.setState({
            content
        });
    }

    handlerSubmit(event) {
        event.preventDefault();

        const { mutate, songId } = this.props;
        const { content } = this.state;

        mutate({
            variables: {
                content,
                songId
            }
        }).then(() => {
            this.setState({
                content: ''
            });
        }).catch(err => {
            console.log('[SongCreate] err', err);
        })
    }

    render() {
        const { content } = this.state;

        return (
            <div className={"row"}>
                <form onSubmit={(event) => this.handlerSubmit(event)}>
                    <label>Add a Lyric</label>
                    <input
                        placeholder="Add Lyric"
                        value={content}
                        onChange={(event) => this.handlerChange(event)}
                    />

                    <button
                        className="waves-effect waves-light btn"
                        type={'submit'}
                    >
                        Send
                    </button>
                </form>
            </div>
        )
    }
}

const mutation = gql`
    mutation AddLyricToSong($content: String, $songId: ID) {
        addLyricToSong(content: $content, songId: $songId) {
            id
            lyrics {
                id
                content
                likes
            }
        }
    }
`;

export default compose(
    graphql(mutation)
)(LyricCreate);