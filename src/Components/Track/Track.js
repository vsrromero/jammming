import React from 'react';
import './Track.css';

class Track extends React.Component {

    constructor(props){
        super(props);
        this.addTrack = this.addTrack.bind(this);
    }

    
    /*When user peform a search, all the results will set the isRemoval attribute to false, so the songs will have a + sign button to add the song to the playlist that will be saved, and in case the song is clicked to be added, it renders a - sign to remove*/
    renderButtonAddRemoveSong(){ 
        if (this.props.isRemoval) {
            return <button className="Track-action">-</button>
        } else {
            return <button className="Track-action" onClick={this.addTrack}>+</button>
        }
    }
    
    addTrack(){ //pass the track to addTrack() on app.js through onAdd property
        this.props.onAdd(this.props.track);
    }

    render(){ 
        return(
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.trackName}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {this.renderButtonAddRemoveSong()}
            </div>
        )
    }
}

export default Track;