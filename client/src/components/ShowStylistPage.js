import React, { Component } from 'react';

class ShowStylistPage extends Component {

  state = {
    stylist: {}
  }

  componentWillMount = () => {
    this.getStylist()
  }

  getStylist = () => {

    const params_id = this.props.match.params.id

    console.log(this.props.stylists)
    const stylist = this.props.stylists.find((sty) => {

      return sty.id === parseInt(params_id)
    })
    console.log(stylist)

    if (!!stylist) {
      this.setState({ stylist })
    }
  }

  render() {
    console.log(this.state.stylist)
    return (
      <div>
        <h1>{this.state.stylist.first_name}</h1>
        {/* {this.state.stylist.appointments.map(appointment =>(
          <div>{appointment.duration}</div>
        ))} */}
      </div>
    );
  }
}

export default ShowStylistPage;