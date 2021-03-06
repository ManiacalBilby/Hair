/* eslint "max-len": 0 */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import SplashPage from './components/SplashPage'
import NavBar from './components/NavBar'
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
      await this.setState({ stylists: response.data })
      return response.data
    } catch (error) {
      console.error(error)
      await this.setState({ error: error.message })
      return error.message
    }
  }

  render() {
    if (this.state.error) {
      return <div>{this.state.error}</div>
    }
    const StylistsPageComponent = () => (<StylistsPage stylists={this.state.stylists} />)
    const ShowStylistPageComponent = props => (<ShowStylistPage {...props} />)
    const StylistAppointmentsPageComponent = props => (<StylistAppointmentsPage {...props} stylists={this.state.stylists} />)
    const EditAppointmentpageComponent = props => (<EditAppointmentPage {...props} />)
    const NewAppointmentPageComponent = props => (<NewAppointmentPage {...props} />)
    const NavBarComponent = props => (<NavBar {...props} />)


    return (
      <Router>
        <div>
          <Route path="/stylists" component={NavBarComponent} />
          <Switch>
            <Route exact path="/" component={SplashPage} />
            <Route exact path="/stylists" component={StylistsPageComponent} />
            <Route exact path="/stylists/:id/" component={ShowStylistPageComponent} />
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
