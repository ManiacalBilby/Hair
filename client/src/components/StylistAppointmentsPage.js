import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import moment from 'moment'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: 100vh;
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
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  align-content: center;
  /* flex-wrap: wrap; */
  width: 75%;
`
const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  text-decoration: none;
  width: 100%;
`

const AppointmentContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
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
              <div>{moment(appointment.start_time).format('hh:mm a')}</div>
            </AppointmentContainer>
          </StyledLink>
          <button onClick={() => this.deleteAppointment(appointment.id)}>Delete</button>
        </AllAppointmentsContainer>
      ))}
      <Link to={`/stylists/${this.state.stylist.id}/appointments/new`}>New Appointment</Link>
    </Wrapper>
  );
}
}

export default StylistAppointmentsPage;