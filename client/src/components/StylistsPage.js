import React, { Component } from 'react';
import { Link } from "react-router-dom"

class StylistsPage extends Component {
  
  render() {
    return (
      <div>
        {this.props.stylists.map(stylist => (
          <Link key={stylist.id} to={`/stylists/${stylist.id}/appointments`}>
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