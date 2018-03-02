
import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from "react-router-dom"
// import { Link } from 'react-router-dom'

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
            console.log("State appointment:", this.state.appointment)
            // console.log("param ID:", this.props.match.params.id)
            const response = await axios.get(`/api/stylists/${this.props.match.params.stylist_id}/appointments/${this.props.match.params.id}`)
            console.log("Response from API:", response.data)
            return response.data
        }
        catch (error) {
            console.log(error)
        }
        // .then(res => {
        //     // this.setState({ appointment: res.data })
        //     return res.data
        //     console.log("appointment in state:", this.state.appointment)
        // })
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
        console.log(this.state.appointment.id)
        return (
            <div>
                <h1>Edit Appointment</h1>
                <div>
                    <form onSubmit={this.handleEdit}>
                        <div>
                            <label htmlFor="start_time">Time</label>
                            <input onChange={this.handleChange} name="start_time" type="text" value={this.state.appointment.start_time} />
                        </div>
                        <div>
                            <label htmlFor="start_date">Date</label>
                            <input onChange={this.handleChange} name="start_date" type="text" value={this.state.appointment.start_date} />
                        </div>
                        <div>
                            <label htmlFor="duration">Duration</label>
                            <input onChange={this.handleChange} name="duration" type="text" value={this.state.appointment.duration} />
                        </div>
                        <div>
                            <label htmlFor="comments">Comments</label>
                            <input onChange={this.handleChange} name="comments" type="text" value={this.state.appointment.comments} />
                        </div>
                        <button>Update Appointment</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default EditAppointmentPage