import React, { Component } from 'react';
import './App.css';
import {forecastUrl} from './api';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      city: '',
      state: '',
    }
  }

  handleClick(event) {
    console.log(!this.state.city.length)
    console.log(!this.state.city.length)
    if(!this.state.city.length || !this.state.state.length) {
      alert("You must choose a city and state")
      return
    }

    const url = forecastUrl(this.state.city, this.state.state)
    axios.get(url)
      .then(
        (response) => {
          // I'm the successful request handler
          this.setState({lastQueriedCity: this.state.city, forecast: response.data.forecast.simpleforecast.forecastday[0]})
          this.setState({temperature: response.data.forecast.simpleforecast.forecastday[0].high.fahrenheit})
          this.temperatureResponse()
        },
        (error) => {
          // I'm the failed request handler
          // but apparently this API sucks and always gives 200s
          console.log(error.response)
        }
      )
  }

  temperatureResponse() {
    if(this.state.temperature > 80) {
      this.setState({heatTemp: 'THERE WILL BE HEAT.'})
    } else if(this.state.temperature > 50) {
      this.setState({heatTemp: 'THERE WILL BE A LITTLE HEAT'})
    } else {
      this.setState({heatTemp: 'THERE WILL BE NO HEAT'})
    }
  }

  handleChange(field, event) {
    this.setState({[field]: event.target.value})
  }

  render() {
    const forecast = this.state.forecast
    return (
      <div className="App">
        <div className="App-header">
          <h2>Heat Detector</h2>
          <h3>Do you like Heat?</h3>
        </div>
        <div className="App-intro">
          <h2>Enter your City and State to know if there will be Heat</h2>
          <input type="text" placeholder="Miami" onChange={this.handleChange.bind(this, 'city')}/>
          <input type="text" placeholder="FL" onChange={this.handleChange.bind(this, 'state')}/>
          <button onClick={this.handleClick.bind(this)}>HEAT?!</button>         
        </div>
        <div>
          {forecast && <div>
            {this.state.heatTemp}
            </div>
          }
          {forecast && <div>
            Also, {forecast && forecast.conditions}
            </div>
          }
        </div>
      </div>
    );
  }
}

export default App;
