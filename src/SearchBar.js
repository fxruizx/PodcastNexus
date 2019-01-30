import React, { Component } from 'react';

class SearchBar extends Component{
    
    state = {
        searchTerm: this.props.mysearch
    }
    
     updateSearch = (event) => {
        this.setState({
            searchTerm: event.target.value
        });
    }
    
    render(){
        
        return(
            <input type='text' onChange={ this.updateSearch } value={ this.state.searchTerm }/>
        );
        
    }
}

export default SearchBar;