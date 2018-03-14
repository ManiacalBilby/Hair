import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import moment from 'moment'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: 90vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  align-content: center;
  flex-wrap: wrap;
  background-color: whitesmoke;
`

const AllAppointmentsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  width: 75%;
  @media (min-width: 675px) {
    width: 50%;
  };
  @media (min-width: 1000px) {
    width: 40%;
  };
`
const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  text-decoration: none;
  width: 100%;
`
const StyledNewAppointmentLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 1.25rem;
`

const AppointmentContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  color: teal;
`

class StylistAppointmentsPage extends Component {

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

  deleteAppointment = async (appointmentid) => {
    try {
      console.log(appointmentid)
      await axios.delete(`/api/stylists/${this.props.match.params.id}/appointments/` + appointmentid)
      this.componentWillMount()
      // // .then((res) => {
      // console.log("Deleted!")
      // const newappointments = [...this.state.appointments]
      // const appointmentToDelete = this.state.appointments.indexOf(appointmentid)
      // newappointments.splice(appointmentToDelete)
      // this.setState({ appointments: newappointments })

    }
  catch(error) {
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
  console.log("Appointments in state", this.state.appointments)
  return (
    <Wrapper>
      <h1>{`${this.state.stylist.first_name}'s Appointments`}</h1>

      {this.state.appointments.map(appointment => (
        <AllAppointmentsContainer key={appointment.id}>
          <StyledLink to={`/stylists/${appointment.stylist_id}/appointments/${appointment.id}`}>
            <AppointmentContainer key={appointment.id}>
              <div>{`${appointment.duration} min.`}</div>
              <div>{moment(appointment.start_date).format('MMM DD YYYY')}</div>
              <div>{moment(appointment.start_time).add(1, 'h').format("LT")}</div>
            </AppointmentContainer>
          </StyledLink>
          <button onClick={() => this.deleteAppointment(appointment.id)}>Delete</button>
        </AllAppointmentsContainer>
      ))}
      <StyledNewAppointmentLink to={`/stylists/${this.state.stylist.id}/appointments/new`}>Add New Appointment</StyledNewAppointmentLink>
    </Wrapper>
  );
}
}

export default StylistAppointmentsPage;