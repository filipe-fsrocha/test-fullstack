import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import './App.css';
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'

import Menu from './components/menu/Menu';
import Search from './components/search/Search';
import History from './components/history/History'
import Settings from './components/settings/Settings';
import PrimeReact from 'primereact/api'

import { APIService } from './service/APIService'

PrimeReact.ripple = true

class App extends Component {

  constructor(props) {
    super(props)
    this.apiService = new APIService()
  }

  render() {
    localStorage.clear()

    this.apiService.getToken()
      .then(data => data.json())
      .then(res => {
        localStorage.setItem('token', JSON.stringify(res))
      }).catch(error => console.error(Error))

    return (
      <Router>
        <div className="menu">
          <div className="logo">
            <i class="fas fa-temperature-low"></i>
          </div>
          <Menu />
        </div>
        <div className="content">
          <Switch>
            <Route
              exact path='/'
              component={Search}
              render={() => {
                return (<Redirect to='/search' />)
              }} />
            <Route exact path='/search' component={Search} />
            <Route path='/history' component={History} />
            <Route path='/config' component={Settings} />
          </Switch>
        </div>
      </Router>
    )
  }
}
export default App;
