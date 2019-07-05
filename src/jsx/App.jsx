import React, {Component} from 'react'
import style from './../styles/styles.less';

// https://alligator.io/react/axios-react/
import axios from 'axios';

// https://underscorejs.org/
import _ from 'underscore';

// http://recharts.org
import {
  Radar, RadarChart, Tooltip, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data:{}
    }
  }
  componentDidMount() {
    let self = this;
    axios.get('./data/data.json', {
    })
    .then(function (response) {
      self.setState((state, props) => ({
        data:response.data.data,
        meta:response.data.meta
      }));
    })
    .catch(function (error) {
    })
    .then(function () {
    });
  }
  componentWillUnMount() {

  }
  componentWillReceiveProps(props) {

  }
  render() {
    function scaleBetween(unscaledNum, min, max) {
      return 100 * (unscaledNum - min) / (max - min);
    }
    let items = _.map(this.state.data, (data, country) => {
      data = _.map(data, (item) => {
        return {
          name:item.name,
          value:scaleBetween(item[item.latest], this.state.meta[item.name].min, this.state.meta[item.name].max),
          value_real:item[item.latest]
        }
      });
      return {
        data:data,
        name:country
      }
    });
    return (
      <div className={style.app}>
        <h1 className={style.header}>What is your problem?</h1>
        {items.map(item => (
          <div key={item.name} className={style.radar_container}>
            <h3 className={style.radar_header}>{item.name}</h3>
            <RadarChart cx={60} cy={60} outerRadius={60} width={120} height={120} data={item.data} domain={0,100}>
              <PolarGrid />
              <Tooltip formatter={(value, name, props) => { return [props.payload.value_real] }} cursor={false} wrapperStyle={{backgroundColor:'transparent'}} contentStyle={{backgroundColor:'transparent', border:0}}/>
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
              <PolarAngleAxis dataKey="name" tick={false} />
              <Radar name={item.name} dataKey="value" stroke="#FF4136" fill="#FF4136" fillOpacity={0.6} />
            </RadarChart>
          </div>
        ))}
      </div>
    );
  }
}
export default App;