import React from 'react';

class LyricList extends React.Component {
    render() {
        const { list, onLike } = this.props;

        return (
            <div className={'row'}>
                <h3>LyricList </h3>

                <ul className="collection">
                    {list.map(({ id, content, likes }) => (
                        <li
                            key={id}
                            className="collection-item"
                        >
                            {content}
                            <div className="vote-box">
                                <i
                                    className={'material-icons'}
                                    onClick={() => onLike(id, likes)}
                                >
                                    thumb_up
                                </i>
                                {likes}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default LyricList;