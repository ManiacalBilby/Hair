import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from 'axios'
// import logo from './logo.svg';
// import './App.css';
import SplashPage from './components/SplashPage'
import StylistsPage from './components/StylistsPage'
import ShowStylistPage from './components/ShowStylistPage'



class App extends Component {

  state = {
    stylists: [],
    appointments: []
  }

  componentWillMount() {
    this.fetchStylists()
    this.fetchAppointments()
  }

  fetchStylists = async () => {
    try {
      const response = await axios.get('/api/stylists')
      console.log("Api call should return all stylists", response.data)
      await this.setState({ stylists: response.data })
      return response.data
    }
    catch (error) {
      console.log(error)
      await this.setState({ error: error.message })
      return error.message
    }
  }

  fetchAppointments = async () => {
    try {
      const response = await axios.get('/api/stylists')
      console.log("Api call should return all stylists", response.data)
      await this.setState({ stylists: response.data })
      return response.data
    }
    catch (error) {
      console.log(error)
      await this.setState({ error: error.message })
      return error.message
    }
  }

  render() {
    if (this.state.error) {
      return <div>{this.state.error}</div>
    }
    const StylistsPageComponent = () => (<StylistsPage stylists = {this.state.stylists} />)
    const ShowStylistPageComponent = (props) => (<ShowStylistPage {...props} stylists = {this.state.stylists} />)
    
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={SplashPage} />
            <Route exact path="/stylists" component={StylistsPageComponent} />
            <Route exact path="/stylists/:id" component={ShowStylistPageComponent} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
