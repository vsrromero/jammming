import React from 'react';
import Track from '../Track/Track'
import './TrackList.css';

class TrackList extends React.Component {
    render(){
        return(
        <div className="TrackList">
            {
                this.props.tracks.map(showTracks => {
                    return <Track track={showTracks} /*pass as an array, the tracks to Track component to render tracks*/
                                  key={showTracks.id} />
                })
            }
        </div>
        )
    }
}

export default TrackList;