import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

class ShowStylistPage extends Component {

  state = {
    stylist: {},
    appointments: []
  }

  componentWillMount = async () => {
    const stylist = await this.getStylist()

    if (!!stylist) {
      const appointments = await this.fetchAppointments()

      await this.setState({ appointments, stylist })
    }

  }

  getStylist = () => {

    const params_id = this.props.match.params.id

    console.log("Confirm receiving stylists", this.props.stylists)
    const stylist = this.props.stylists.find((sty) => {

      return sty.id === parseInt(params_id, 10)
    })
    console.log("Current stylist", stylist)

    return stylist;
  }

  fetchAppointments = async () => {
    try {
      const response = await axios.get(`/api/stylists/${this.props.match.params.id}/appointments`)
      console.log("Api call should return all appts", response.data)
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
    console.log("Stylist in state", this.state.stylist)
    return (
      <div>
        <h1>{this.state.stylist.first_name}</h1>
        {this.state.appointments.map(appointment => (
          <Link key = {appointment.id} to = {`/stylists/${appointment.stylist_id}/appointments/${appointment.id}`}>
          <div key={appointment.id}>
            <div>{appointment.duration}</div>
            <div>{(appointment.start_date)}</div>
            <div>{appointment.start_time}</div>
          </div>
          </Link>
        ))}
      </div>
    );
  }
}

export default ShowStylistPage;