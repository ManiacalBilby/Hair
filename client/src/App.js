import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from 'axios'
// import logo from './logo.svg';
// import './App.css';
import SplashPage from './components/SplashPage'
import StylistsPage from './components/StylistsPage'
import ShowStylistPage from './components/ShowStylistPage'
import StylistAppointmentsPage from './components/StylistAppointmentsPage'
import EditAppointmentPage from './components/EditAppointmentPage'
import NewAppointmentPage from './components/NewAppointmentPage'



class App extends Component {

  state = {
    stylists: [],
  }

  componentDidMount() {
    this.fetchStylists()
  }

  fetchStylists = async () => {
    try {
      const response = await axios.get('/api/stylists')
      // console.log("Api call should return all stylists", response.data)
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
    const ShowStylistPageComponent = (props) => (<ShowStylistPage {...props}/>)
    const StylistAppointmentsPageComponent = (props) => (<StylistAppointmentsPage {...props} stylists = {this.state.stylists} />)
    const EditAppointmentpageComponent = (props) => (<EditAppointmentPage {...props}/>)
    const NewAppointmentPageComponent = (props) => (<NewAppointmentPage {...props}/>)

    
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={SplashPage} />
            <Route exact path="/stylists" component={StylistsPageComponent} />
            <Route exact path="/stylists/:id/" component={ShowStylistPageComponent}/>
            <Route exact path="/stylists/:id/appointments" component={StylistAppointmentsPageComponent} />
            <Route exact path="/stylists/:stylist_id/appointments/new" component={NewAppointmentPageComponent} />
            <Route exact path="/stylists/:stylist_id/appointments/:id" component={EditAppointmentpageComponent} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
