import React from 'react';
import render from 'react-dom';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {

  constructor(props){

    super(props);

    this.state = {    /*tracks hard coded will come from Spotify API*/
      searchResults: [{id:1, trackName:'song 1', artist:'Artist 1', album:'Album 1'},
                      {id:2, trackName:'song 2', artist:'Artist 2', album:'Album 2'},
                      {id:3, trackName:'song 3', artist:'Artist 3', album:'Album 3'},
                      {id:4, trackName:'song 4', artist:'Artist 4', album:'Album 4'}],
      playlistName: 'My new playlist',
      playlistTracks: [{id:5, trackName: 'Playlist track 1', artist: 'Playlist artist 1', album: 'Playlist album 1',  uri: 'abc'},
                       {id:6, trackName: 'Playlist track 2', artist: 'Playlist artist 2', album: 'Playlist album 2',uri: 'def'},
                       {id:7, trackName: 'Playlist track 3', artist: 'Playlist artist 3', album: 'Playlist album 3',uri: 'ghi'},
                       {id:8, trackName: 'Playlist track 4', artist: 'Playlist artist 4', album: 'Playlist album 4',uri: 'jkl'}]
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

  }

  addTrack(track){ //get the track to check if exists on playlist to be added on

    //get the array of object tracks
    let tracks = this.state.playlistTracks; 

    // check if track already exists on playlist tracks
    //if exists does nothing, else, add the track to playlist tracks
    //saved track = track on playlist

    if (tracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    } else {
      tracks.push(track);
      this.setState({playlistTracks: tracks});
    }

    console.log(track);
  }

  removeTrack(track){ //get the track to be removed from playlist
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({playlistTracks: tracks})
    
  }

  updatePlaylistName(newPlaylistName){
    this.setState({playlistName: newPlaylistName})
  }

  savePlaylist(){
    //create an array called trackURIs that receive the playlistTracks objects and get through map method the uri property of each track
        
    let trackURIs = this.state.playlistTracks.map(track => track.uri); 
    console.log(trackURIs);

  }

  search(term) {
    console.log(term);
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} 
                           onAdd={this.addTrack} /> {/*passing the tracks got from API to SearchResults component*/}
            <Playlist playlistName={this.state.playlistName} 
                      playlistTracks={this.state.playlistTracks} 
                      onRemove={this.removeTrack}
                      onNameChange={this.updatePlaylistName} 
                      onSave={this.savePlaylist} /> 
          </div>
        </div>
      </div>
      );
  }
}

export default App;
