import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {getAgeInHours} from './_helpers';


/*                  Since this is functional stateless component, props would be passed in like
                    const Podcast = props => ( ... ); //Note "props" here could also be "(props)".
                    BUT, since the object podcast is all we wanted from within props, having "({ podcast })"
                    makes it so that in the component itself we can use "podcast.property" instead of "props.podcast.property"
                    vvv */
const Podcast = ({ podcast }) => (
    <Pod>
        <Link to={ `/${ podcast.collectionId }` }>
            <PodTitle age={ getAgeInHours(podcast.releaseDate) }>
                <PodArt age={ getAgeInHours(podcast.releaseDate) } src= { podcast.artworkUrl100 } alt={ podcast.collectionName } title={ `${podcast.collectionName} updated last on ${podcast.releaseDate}` }/><br/>
                { podcast.collectionName }
            </PodTitle>
        </Link>
    </Pod>
);
    
export default Podcast;

const Pod = styled.div`
    flex: 1 1 20%;
    margin: 0 .25em .5em .25em;
`;

const PodTitle = styled.h4`
    color: ${ props => props.age   < 24 ? '#00A643' :
                props => props.age  < 168 ? '#0986BC' :
                    props => props.age < 720 ? '#FF8700' : '#FF3100' };
                
`;

const PodArt = styled.img`
    border-style: solid;
    border-width: 1px 1px 5px 1px;
    border-radius: 3px
    border-color: ${ props => props.age   < 24 ? 'rgba(0,166,67,1)' :
            props => props.age  < 168 ? 'rgba(9,134,188,1)' :
                props => props.age < 720 ? 'rgba(255,135,0,1)' : 'rgba(255,49,0,1)' };
`;

/*
<Pod>
        <PodTitle age={ getAgeInHours(props.podcast.releaseDate) }>
            <PodArt age={ getAgeInHours(props.podcast.releaseDate) } src= { props.podcast.artworkUrl100 } alt={ this.props.podcast.collectionName } title={ `${this.props.podcast.collectionName} updated last on ${this.props.podcast.releaseDate}` }/><br/>
            { props.podcast.collectionName }
        </PodTitle>
    </Pod>
    */