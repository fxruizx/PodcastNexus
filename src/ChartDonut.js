import React, { Component } from 'react';
import {Doughnut} from 'react-chartjs-2';

class ChartDonut extends Component{

    render() {
        const data = {
        	labels: [
        		'Last 24 Hours',
        		'Last 7 Days',
        		'Last 30 Days',
        		'> 30 Days Ago'
        	],
        	datasets: [{
        		data: [ this.props.podtimecount.today, 
        		        this.props.podtimecount.thisWeek,
        		        this.props.podtimecount.thisMonth,
        		        this.props.podtimecount.overMonth
        		],
        		backgroundColor: [
        		'#00A643',
        		'#0986BC',
        		'#FF8700',
        		'#FF3100'
        		],
        		hoverBackgroundColor: [
        		'#53D989',
        		'#2F96C2',
        		'#FF9F34',
        		'#FF5B34'
        		]
        	}]
        };
        
        return (
          <div>
            <h3>Podcasts Updated:</h3>
            <Doughnut data={data} />
          </div>
        );
  }
}

export default ChartDonut;
