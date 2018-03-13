import 'rc-time-picker/assets/index.css'
import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from "react-router-dom"
import styled from 'styled-components'
import moment from 'moment'
import TimePicker from 'rc-time-picker'

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

class EditAppointmentPage extends Component {

  state = {
    appointment: {
      start_time: moment(),
      start_date: '',
      duration: 0,
      comments: ''
    },
    redirect: false
  }

  componentWillMount = async () => {
    const appointment = await this.getAppointment()
    appointment.start_time = moment(appointment.start_time).add(1, 'h')
    await this.setState({ appointment })
  }

  getAppointment = async () => {
    try {
      const response = await axios.get(`/api/stylists/${this.props.match.params.stylist_id}/appointments/${this.props.match.params.id}`)
      console.log("Response from API:", response.data)
      return response.data
    }
    catch (error) {
      console.log(error)
    }
  }

  handleChange = (event) => {
    const appointment = { ...this.state.appointment }
    appointment[event.target.name] = event.target.value
    this.setState({ appointment })
  }

  handleTimeChange = (value) => {

    const appointment_time = { ...this.state.appointment }
    appointment_time.start_time = value

    this.setState({ appointment: appointment_time })

  }

  handleEdit = (event) => {
    event.preventDefault()
    this.updateAppointment()
  }

  updateAppointment = async (userid) => {
    try {

      const payload = { ...this.state.appointment }
      payload.start_time = payload.start_time.subtract(1, 'h').utc()
      await axios.patch(`/api/stylists/${this.props.match.params.stylist_id}/appointments/${this.props.match.params.id}`, payload)
      this.setState({ redirect: true })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to={`/stylists/${this.props.match.params.stylist_id}/appointments`} />
      );
    }
    console.log("Appointment in state", this.state.appointment)

    return (
      <Wrapper>
        <h2>Edit Appointment</h2>
        <div>
          <FormContainer onSubmit={this.handleEdit}>
            <FormFieldDiv>
              <label htmlFor="start_time">Time</label>
              <TimePicker
                onChange={this.handleTimeChange}
                name="start_time"
                format='hh:mm a'
                value={this.state.appointment.start_time}
                showSecond={showSecond}
                use12Hours
              />
            </FormFieldDiv>
            <FormFieldDiv>
              <label htmlFor="start_date">Date</label>
              <Input onChange={this.handleChange} name="start_date" type="text" value={moment(this.state.appointment.start_date).format('DD MMM YYYY')} />
            </FormFieldDiv>
            <FormFieldDiv>
              <label htmlFor="duration">Duration</label>
              <Input onChange={this.handleChange} name="duration" type="text" value={this.state.appointment.duration} />
            </FormFieldDiv>
            <FormFieldDiv>
              <label htmlFor="comments">Comments</label>
              <TextArea onChange={this.handleChange} name="comments" type="text" value={this.state.appointment.comments} />
            </FormFieldDiv>
            <div>
          <button>Update Appointment</button>
        </div>
          </FormContainer>
        </div>
      </Wrapper>
    )
  }
}

export default EditAppointmentPage