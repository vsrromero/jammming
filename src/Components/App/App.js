import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {

  constructor(props){

    super(props);

    this.state = {    
      searchResults: [],
      playlistName: 'Playlist name here',
      playlistTracks: []
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
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'Playlist name here',
        playlistTracks: []
      })
    });
  }

  search(term) {
    console.log('search button working: '+term);
    Spotify.search(term).then(apiSearchResults => {
      this.setState({searchResults: apiSearchResults})
    })
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
