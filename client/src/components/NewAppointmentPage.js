import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from "react-router-dom"

class NewAppointmentPage extends Component {

  state = {
    appointment: {
      start_time: '',
      start_date: '',
      duration: 0,
      comments: '',
      client_id: 0
    },
    redirect: false
  }

  handleChange = (event) => {
    const appointment = { ...this.state.appointment }
    appointment[event.target.name] = event.target.value
    this.setState({ appointment })
  }

  handleNewAppointment = (event) => {
    event.preventDefault()
    console.log(this.state.appointment)
    this.createAppointment(this.state.appointment)
  }

  createAppointment = (newAppointment) => {
    console.log('Params', this.props)
    axios.post(`/api/stylists/${this.props.match.params.stylist_id}/appointments`, {
      appointment: newAppointment
    })
    this.setState({ redirect: true })
  }

  render() {
    if (this.state.redirect) {
      return (
          <Redirect to={`/stylists/${this.props.match.params.stylist_id}`} />
      );
  }
    return (
      <div>
        <h1>New appointment page!</h1>
        <div>
          <form onSubmit={this.handleNewAppointment}>
            <div>
              <label htmlFor="start_time">Time</label>
              <input onChange={this.handleChange} name="start_time" type="text"  value={this.state.appointment.start_time} />
            </div>
            <div>
              <label htmlFor="start_date">Date</label>
              <input onChange={this.handleChange} name="start_date" type="text"  value={this.state.appointment.start_date} />
            </div>
            <div>
              <label htmlFor="duration">Duration</label>
              <input onChange={this.handleChange} name="duration" type="text"  value={this.state.appointment.duration} />
            </div>
            <div>
              <label htmlFor="comments">Comments</label>
              <input onChange={this.handleChange} name="comments" type="text" value={this.state.appointment.comments} />
            </div>
            <div>
              <label htmlFor="client_id">Client Id</label>
              <input onChange={this.handleChange} name="client_id" type="text" value={this.state.appointment.client_id} />
            </div>
            <button>Add New Appointment</button>
          </form>
        </div>
      </div>
    );
  }
}

export default NewAppointmentPage;