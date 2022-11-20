import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            term: ''
        };

        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);

    }
    
    search(){
        //debugged - working
        this.props.onSearch(this.state.term);
    }
    
    handleTermChange(event){
        //debugged - working
        this.setState({ term: event.target.value }); //gets the value from the field search and set the state to the term typed
        
    }

    debugState(){
        alert(this.state.term);
    }

    render(){
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
                <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        )
    }

}

export default SearchBar;