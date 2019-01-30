import React, { Component } from 'react';
import styled from 'styled-components';

class PodDetails extends Component {
    state = {
        podDetails: {},
        rssDetails: {
            podDesc: <img src='https://www.wpfaster.org/wp-content/uploads/2013/06/circle-loading-gif.gif' alt='loading'/>
        }
    }
    
    collectPodDetails = () => {
        //GET iTUNES DATA
        let fetchPodUrl = `https://itunes.apple.com/lookup?id=${ this.props.match.params.id }&media=podcast&entity=podcast&country=US`,
            //PROXY IS TO GET AROUND CORS AND CORBS DURING RSS FETCH
            proxy = "https://cors-anywhere.herokuapp.com/";
            //xmlParser = new DOMParser(),
            //xmlData = {};
            
        fetch(fetchPodUrl)
            
            // Take iTunes api data and return json version of it
            .then( (res1) => res1.json() )
            
            // Take json iTunes data, set podDetails state, and return fetch for podcast RSS url
            .then( (jsonData) => { 
                this.setState({ podDetails: jsonData.results[0] });
                console.log("jsonData.results[0]: ",jsonData.results[0]);
                if(jsonData.results[0].feedUrl.includes("feedburner.com")){
                    return fetch(proxy+jsonData.results[0].feedUrl+"?format=xml");
                }else{
                    return fetch(jsonData.results[0].feedUrl+"?format=xml");
                }
            })
            
            // Take RSS feed, and return text version of it
            .then( (res2) => res2.text() )
            
            // Take text RSS data and ...
            .then( (rssData) => { 
                let tempRssDetails = { 
                        podDesc: "",
                        latestEpTitle: "",
                        latestEpMp3: "",
                        latestEpDate: "",
                    },
                    descriptionPosStart = rssData.search("<itunes:summary>") + 16,
                    descriptionPosEnd = rssData.search("</itunes:summary>");
                    
                console.log("ITUNES:SUMMARY POS: ", rssData.search("<itunes:summary>"));
                    
                tempRssDetails.podDesc = rssData.slice(descriptionPosStart, descriptionPosEnd);
                if(tempRssDetails.podDesc.includes("<![CDATA[")){
                    tempRssDetails.podDesc = tempRssDetails.podDesc.slice(9,tempRssDetails.podDesc.length-3);
                }
                
                //let tempXml = rssData.parseFromString(txt, "text/xml");
                   
                
                console.log(rssData);
                this.setState({ 
                    rssDetails: tempRssDetails
                });
            }) 
            
            
            .catch( (error) => { 
                console.log("error:"+error);
                let tempRssDetails = { podDesc: "Description Unavailable" }
                this.setState({
                    rssDetails: tempRssDetails
                })
            });
    }
    
    componentDidMount(){
        //Get initial itunes data based on default search term
        this.collectPodDetails();
    }
  
    render(){
        
    
        return (
            <PodcastDetails>

                <Art src={ this.state.podDetails.artworkUrl600 } alt={ this.state.podDetails.collectionName } />

                <Details>
                    <h1>{ this.state.podDetails.collectionName }</h1>
                    <p>{ this.state.rssDetails.podDesc }</p>
                </Details>
            </PodcastDetails>
        );
    }
}
export default PodDetails;

const PodcastDetails = styled.section`
    display: flex;
    margin: 0 auto;
    padding: 2em 0;
    width: 80vw
`;

const Art = styled.img`
    flex: 1;
    height: 300px;
    padding-right: 1em;
    width: 300px;
`;

const Details = styled.div`
    flex: 2;
    padding-left: 1em;
    text-align: left;
`;
