import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            term: ''
        }

        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);

    }

    
    search(){
        this.props.onSearch(this.props.term);
    }
    
    handleTermChange(event){

        this.setState({ term: event.target.value }); //gets the value from the field search

    }

    render(){
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
                <button className="SearchButton">SEARCH</button>
            </div>
        )
    }
}

export default SearchBar;