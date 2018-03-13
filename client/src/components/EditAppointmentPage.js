
import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from "react-router-dom"
import styled from 'styled-components'
import moment from 'moment'

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

class EditAppointmentPage extends Component {

  state = {
    appointment: {
      start_time: '',
      start_date: '',
      duration: 0,
      comments: ''
    },
    redirect: false
  }

  componentWillMount = async () => {
    const appointment = await this.getAppointment()
    await this.setState({ appointment })
  }

  getAppointment = async () => {
    try {
      // console.log("State appointment:", this.state.appointment)
      // console.log("param ID:", this.props.match.params.id)
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

  handleEdit = (event) => {
    event.preventDefault()
    this.updateAppointment()
  }

  updateAppointment = async (userid) => {
    try {
      console.log(this.state.appointment.id)
      await axios.patch(`/api/stylists/${this.props.match.params.stylist_id}/appointments/${this.props.match.params.id}`, this.state.appointment)
      this.setState({ redirect: true })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to={`/stylists/${this.props.match.params.stylist_id}`} />
      );
    }
    console.log(this.state.appointment)
    // console.log(this.state.appointment.id)
    return (
      <div>
        <h1>Edit Appointment</h1>
        <div>
          <FormContainer onSubmit={this.handleEdit}>
            <FormFieldDiv>
              <label htmlFor="start_time">Time</label>
              <Input onChange={this.handleChange} name="start_time" type="text" value={moment(this.state.appointment.start_time).add(1, 'h').format('hh:mm a')} />
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
              <Input onChange={this.handleChange} name="comments" type="text" value={this.state.appointment.comments} />
            </FormFieldDiv>
            <div>
            <button>Update Appointment</button>
            </div>
          </FormContainer>
        </div>
      </div>
    )
  }
}

export default EditAppointmentPage