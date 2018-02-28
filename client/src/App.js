import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import logo from './logo.svg';
// import './App.css';
import SplashPage from './components/SplashPage'
import StylistPage from './components/StylistPage'



class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={SplashPage} />
            <Route exact path="/stylists" component={StylistsPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
