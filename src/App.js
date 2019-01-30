import React, { Component } from 'react';

import './App.css';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import PodList from './PodList';
import PodDetails from './PodDetails';
import { getAgeInHours } from './_helpers';
import ChartDonut from './ChartDonut';

class App extends Component {
  
  state = {
      searchTerm: 'podcast',
      searchFilter: '',
      updatedPodcasts: [],
      podTimeFrames: {
        today: 0,
        thisWeek: 0,
        thisMonth: 0,
        overMonth: 0
      }
  }
  
  // Updates the Search input based on what is typed  
  updateSearch = (event) => {
    this.setState({ searchTerm: event.target.value }, function () {
      this.getItunesData();
    });
  }

  
  //Updates the Search Category filter based on selection input
  updateFilter = (event) => {
    this.setState({ searchFilter: event.target.value }, function () {
      this.getItunesData();
    });
  }
  
  //Performs iTunes API search based on search term (and category filter)
  getItunesData = () => {
      let fetchUrl = `https://itunes.apple.com/search?term=${ this.state.searchTerm }&media=podcast&entity=podcast&country=US&limit=120`;
      
      if(this.state.searchFilter !== ''){
          fetchUrl = `https://itunes.apple.com/search?term=${ this.state.searchTerm }&media=podcast&entity=podcast&genreId=${ this.state.searchFilter }&country=US&limit=120`;
      }
    
      fetch(fetchUrl)
      .then( (res) => res.json() )
      .then( (jsondata) => {
        
          
          //hoursOld = getAgeInHours(takesDate)
          
          let tempPodTimeFrames = {
            today: 0,
            thisWeek: 0,
            thisMonth: 0,
            overMonth: 0
          },//this.state.podTimeFrames,
              hoursOld = 0;
          jsondata.results.forEach((result)=>{
            
            // Get the age of each 
            hoursOld = getAgeInHours(result.releaseDate);
            hoursOld < 24 ? tempPodTimeFrames.today++ :
              hoursOld < 168 ? tempPodTimeFrames.thisWeek++ :
                hoursOld < 720 ? tempPodTimeFrames.thisMonth++ : tempPodTimeFrames.overMonth++;
          });
          
          this.setState({
            podTimeFrames: tempPodTimeFrames,
            updatedPodcasts: jsondata.results.sort(function(a, b) {
              var dateA = new Date(a.releaseDate), dateB = new Date(b.releaseDate);
              return dateB - dateA;
            })
          });
      });
  }
  
  componentDidMount(){
    //Get initial itunes data based on default search term
    this.getItunesData();
  }
  
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            
              <h1 className="App-title"><Link to="/">Podcast Nexus</Link></h1>
            
            <input type='text' onChange={ this.updateSearch } value={ this.state.searchTerm }/>
            <select onChange={ this.updateFilter }>
              <option value=''>Select Category</option>
              <option value="1301">Arts</option>  <option value="1303">Comedy</option>  <option value="1304">Education</option> <option value="1305">Kids &amp; Family</option> <option value="1307">Health</option>  <option value="1309">TV &amp; Film</option> <option value="1310">Music</option> <option value="1311">News & Politics</option> <option value="1314">Religion &amp; Spirituality</option> <option value="1315">Science &amp; Nature</option>  <option value="1316">Sports &amp; Recreation</option> <option value="1318">Technology</option>  <option value="1321">Business</option>
            </select>
          </header>
          
            <Switch>
              <Route exact path="/" render = {() => (
                <Overview>
                <PodList searchterm={ this.state.searchTerm } searchfilter={ this.state.searchFilter } newlist={ this.state.updatedPodcasts }>Loading</PodList>
                <ChartDonut podtimecount={ this.state.podTimeFrames }/>
                </Overview>
              )} />

              <Route path="/:id" component={ PodDetails } />
            </Switch>
          
        </div>
      </Router>
    );
  }
}

export default App;

const Overview = styled.article`
  display: flex;
  margin: 0 auto;
  width: 90%;
`;