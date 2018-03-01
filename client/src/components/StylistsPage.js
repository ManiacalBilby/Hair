import React, { Component } from 'react';
import axios from 'axios'
import { Link } from "react-router-dom"

class StylistsPage extends Component {

  state = {
    stylists: [],
  }

  componentWillMount() {
    this.fetchStylists()
  }

  fetchStylists = async () => {
    try {
      const response = await axios.get('/api/stylists')
      console.log("Api call should return all stylists", response.data)
      await this.setState({ stylists: response.data })
      return response.data
    }
    catch (error) {
      console.log(error)
      await this.setState({ error: error.message })
      return error.message
    }
  }
  render() {
    if (this.state.error) {
      return <div>{this.state.error}</div>
    }
    return (
      <div>
        {this.state.stylists.map(stylist => (
          <Link key={stylist.id} to={`/stylists/${stylist.id}`}>
            <div>
              <h2>{stylist.first_name} {stylist.last_name}</h2>
              <img width="200" src={stylist.photo_url} alt={stylist.first_name} />
            </div>
          </Link>
        ))}

      </div>
    );
  }
}

export default StylistsPage;