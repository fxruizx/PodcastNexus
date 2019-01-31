# Podcast Nexus - Podcast Search Prototype
As a test-bed for learning React (after going through Levelup Tuts course on React 16), I created a podcast search tool that favors podcasts with current episodes.
Though it is still left to iTunes directory to deliver it's "top" podcast for a given search term/category, Podcast Nexus places shows that are the most current at the top, something iTunes search doesn't seem to account for.

## Web Technologies/Languages Utilized
**Learned for the First Time**
* React
* JSX
* React Chart
* Styled Components

**Gained More Experience**
* iTunes Search API Integration

**Further Honed My Skill**
* HTML
* Javascript
* CLI

## Key Take Aways
The majority of what I learned centered around working with core elements of React like components, state, and JSX, in addtion to using packages like routing and styled components.
A big "gotcha" though that I found I could work around was when I tried pulling information from a given podcast's RSS. Since these themselves are not api calls I ran into CORS blocking issues, 
but utilizing the [Cors Anywhere Heroku App](https://cors-anywhere.herokuapp.com/) I was able to get the feed info. In summary:
* React became an intuitive way for me to create a website/app (as opposed to Angular which I had only marginal success grasping)
* There is still much in terms of inter-component communication I need to learn about React
* Though Cors Anywhere is a decent stopgap solution for this prototype, a more robust solution will likely be needed for larger apps
* Still need to learn better ways for handling multiple types of data coming from the RSS description tag


_This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app)._

