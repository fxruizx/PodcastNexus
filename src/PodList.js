import React from 'react';
import styled from 'styled-components';
import Podcast from './Podcast';

const PodList = ({newlist, searchterm, searchfilter}) => (
    <section>
        <h3>{ newlist.length } results found searching for: { searchterm } in <em>{ searchfilter }</em></h3>
        
        <PodcastList>
        
        
            {/*         Map the newlist array (generated from the itunes data in App.js) 
                        onto a new array composed of Podcast components
                vvv---- passing in each podcast object as a podcast prop */}
            { newlist.map( podcast => <Podcast key={ podcast.collectionId } podcast={ podcast } /> ) }
        </PodcastList>
    </section>
);

export default PodList;

const PodcastList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 1em;
  flex: 2;
`;

