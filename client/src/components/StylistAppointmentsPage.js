import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import moment from 'moment'
import styled from 'styled-components'
/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types'
/* eslint-enable import/no-extraneous-dependencies */

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
  &:hover {
    text-shadow: rgb(150, 150, 150) 1px 1px 2px;
    color: teal;
  };
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
    appointments: [],
  }

  componentWillMount = async () => {
    const stylist = await this.getStylist()

    if (stylist) {
      const appointments = await this.fetchAppointments()

      await this.setState({ appointments, stylist })
    }
  }

  getStylist = () => {
    const paramsId = this.props.match.params.id
    const stylist = this.props.stylists.find(sty => sty.id === parseInt(paramsId, 10))

    return stylist;
  }

  fetchAppointments = async () => {
    try {
      const response = await axios.get(`/api/stylists/${this.props.match.params.id}/appointments`)

      return response.data
    } catch (error) {
      /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
      console.error(error)
      await this.setState({ error: error.message })
      return error.message
    }
  }

  deleteAppointment = async (appointmentid) => {
    try {
      // console.log(appointmentid)
      await axios.delete(`/api/stylists/${this.props.match.params.id}/appointments/${appointmentid}`)
      return this.componentWillMount()
    } catch (error) {
      // console.log(error)
      await this.setState({ error: error.message })
      return error.message
    }
  }

  render() {
    if (this.state.error) {
      return <div>{this.state.error}</div>
    }

    return (
      <Wrapper>
        <h1>{`${this.state.stylist.first_name}'s Appointments`}</h1>

        {this.state.appointments.map(appointment => (
          <AllAppointmentsContainer key={appointment.id}>
            <StyledLink to={`/stylists/${appointment.stylist_id}/appointments/${appointment.id}`}>
              <AppointmentContainer key={appointment.id}>
                <div>{`${appointment.duration} min.`}</div>
                <div>{moment(appointment.start_date).format('MMM DD YYYY')}</div>
                <div>{moment(appointment.start_time).add(1, 'h').format('LT')}</div>
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

StylistAppointmentsPage.propTypes = {
  match: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,

  stylists: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
}

export default StylistAppointmentsPage;
