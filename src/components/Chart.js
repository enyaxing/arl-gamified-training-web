import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

class Chart extends Component{
  constructor(props){
    super(props);
    this.state = {
      accuracy:props.accuracyData

    }
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
  }

  render(){
    return (
      <div className="chart">

        <Line
          data={this.state.accuracy}
          options={{
            title:{
              display:this.props.displayTitle,
              text: 'Accuracy Per Training Session',
              fontSize:25
            },

            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />

        <Line
          data={this.state.accuracy}
          options={{
            title:{
              display:this.props.displayTitle,
              text: 'Speed Per Training Session',
              fontSize:25
            },

            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />


      </div>
    )
  }
}

export default Chart;
