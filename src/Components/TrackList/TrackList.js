import React from 'react';
import Track from '../Track/Track'
import './TrackList.css';

class TrackList extends React.Component {
    render(){
        return(
            <div className="TrackList">
                {
                    this.props.tracks.map(track => {
                        return <Track track={track} /*pass as an array [tracks] to Track component to render tracks with this track*/
                                    key={track.id} 
                                    onAdd={this.props.onAdd}
                                    onRemove={this.props.onRemove}
                                    isRemoval={this.props.isRemoval} />
                    })
                }
            </div>
        )
    }
}

export default TrackList;