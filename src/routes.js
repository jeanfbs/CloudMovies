import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import { connect } from 'react-redux'
import { Main, NotFound } from './pages'

const Routes = ({ auth }) => (
  <Router>
    <Switch>
      <Route path="/main" component={Main} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
)

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(Routes)
