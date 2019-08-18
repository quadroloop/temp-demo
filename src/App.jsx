import React, { Component, } from 'react'
import { BrowserRouter as Router, Route, } from 'react-router-dom'

import Time from './views/Time/'
import Login from './views/Login/'
import Dashboard from './views/Dashboard';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Time} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
      </Router>
    )
  }
}

export default App