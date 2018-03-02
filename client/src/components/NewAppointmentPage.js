import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from "react-router-dom"
import styled from 'styled-components'

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`

const FormFieldDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 0;
`
const Input = styled.input`
  max-width: 25%;
  height: 25px;
  padding-left: 5px;
  margin-top: 3px;
`

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

  createAppointment = async (newAppointment) => {
    console.log('Params', this.props)
   await axios.post(`/api/stylists/${this.props.match.params.stylist_id}/appointments`, {
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
          <FormContainer onSubmit={this.handleNewAppointment}>
            <FormFieldDiv>
              <label htmlFor="start_time">Time</label>
              <Input onChange={this.handleChange} name="start_time" type="text"  value={this.state.appointment.start_time} />
            </FormFieldDiv>
            <FormFieldDiv>
              <label htmlFor="start_date">Date</label>
              <Input onChange={this.handleChange} name="start_date" type="text"  value={this.state.appointment.start_date} />
            </FormFieldDiv>
            <FormFieldDiv>
              <label htmlFor="duration">Duration</label>
              <Input onChange={this.handleChange} name="duration" type="text"  value={this.state.appointment.duration} />
            </FormFieldDiv>
            <FormFieldDiv>
              <label htmlFor="comments">Comments</label>
              <Input onChange={this.handleChange} name="comments" type="text" value={this.state.appointment.comments} />
            </FormFieldDiv>
            <FormFieldDiv>
              <label htmlFor="client_id">Client Id</label>
              <Input onChange={this.handleChange} name="client_id" type="text" value={this.state.appointment.client_id} />
            </FormFieldDiv>
            <div>
            <button>Add New Appointment</button>
            </div>
          </FormContainer>
        </div>
      </div>
    );
  }
}

export default NewAppointmentPage;