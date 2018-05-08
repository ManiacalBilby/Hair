import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import moment from 'moment'
import TimePicker from 'rc-time-picker'
import 'rc-time-picker/assets/index.css'
/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types'
/* eslint-enable import/no-extraneous-dependencies */

const showSecond = false

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

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
  height: 25px;
  padding-left: 5px;
  margin-top: 3px;
`

const TextArea = styled.textarea`
  height: 50px;
  width: 200px;
`

class NewAppointmentPage extends Component {
  state = {
    appointment: {
      start_time: moment(),
      start_date: moment(new Date()).format('DD MMM YYYY'),
      duration: 0,
      comments: '',
      client_id: 1,
    },
    redirect: false,
  }

  handleChange = (event) => {
    const appointment = { ...this.state.appointment }
    appointment[event.target.name] = event.target.value
    this.setState({ appointment })
  }

  handleTimeChange = (value) => {
    const appointmentTime = { ...this.state.appointment }
    appointmentTime.start_time = value

    this.setState({ appointment: appointmentTime })
  }

  handleNewAppointment = (event) => {
    event.preventDefault()
    this.createAppointment(this.state.appointment)
  }

  createAppointment = async (newAppointment) => {
    await axios.post(`/api/stylists/${this.props.match.params.stylist_id}/appointments`, {
      appointment: {
        start_time: moment(newAppointment.start_time, 'hh:mm a').utc().format('hh:mm a'),
        start_date: newAppointment.start_date,
        duration: newAppointment.duration,
        comments: newAppointment.comments,
        client_id: newAppointment.client_id,
      },
    })
    this.setState({ redirect: true })
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to={`/stylists/${this.props.match.params.stylist_id}/appointments`} />
      );
    }
    return (
      <Wrapper>
        <h2>Create appointment</h2>
        <div>
          <FormContainer onSubmit={this.handleNewAppointment}>
            <FormFieldDiv>
              <label htmlFor="start_time">Time</label>
              <TimePicker
                onChange={this.handleTimeChange}
                name="start_time"
                format="hh:mm a"
                value={this.state.appointment.start_time}
                showSecond={showSecond}
                use12Hours
              />
            </FormFieldDiv>
            <FormFieldDiv>
              <label htmlFor="start_date">Date</label>
              <Input onChange={this.handleChange} name="start_date" type="text" value={this.state.appointment.start_date} />
            </FormFieldDiv>
            <FormFieldDiv>
              <label htmlFor="duration">Duration</label>
              <Input onChange={this.handleChange} name="duration" type="text" value={this.state.appointment.duration} />
            </FormFieldDiv>
            <FormFieldDiv>
              <label htmlFor="comments">Comments</label>
              <TextArea onChange={this.handleChange} name="comments" type="text" value={this.state.appointment.comments} />
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
      </Wrapper>
    );
  }
}

NewAppointmentPage.propTypes = {
  match: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
}

export default NewAppointmentPage;
