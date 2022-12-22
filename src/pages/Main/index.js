import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Menu from '../../components/Menu'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Home from '../Home'
import './Main.css'

class Main extends Component {
  render() {
    return (
      <div>
        <Menu match={this.props.match} history={this.props.history} />
        <Switch>
          <Route
            path={`${this.props.match.path}/home/`}
            exact
            component={Home}
          />
        </Switch>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
