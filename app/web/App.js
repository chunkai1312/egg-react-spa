import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { userIsAuthenticated, userIsNotAuthenticated } from './helpers/auth'
import { initAuth } from './store/modules/auth'
import home from './pages/home'
import login from './pages/auth/login'
import signup from './pages/auth/signup'
import forgot from './pages/auth/password/forget'
import reset from './pages/auth/password/reset'
import settings from './pages/settings'
import about from './pages/about'
import Loading from './components/Loading'

class App extends React.Component {
  state = {
    loading: true
  }

  componentDidMount () {
    if (this.state.loading) {
      this.props.initAuth(() => this.setState({ loading: false }))
    }
  }

  render () {
    return this.state.loading ? <Loading /> : (
      <Router>
        <Switch>
          <Route path="/" exact component={userIsAuthenticated(home)} />
          <Route path="/about" exact component={userIsAuthenticated(about)} />
          <Route path="/settings" exact component={userIsAuthenticated(settings)} />
          <Route path="/login" exact component={userIsNotAuthenticated(login)} />
          <Route path="/signup" exact component={userIsNotAuthenticated(signup)} />
          <Route path="/password/forgot" exact component={userIsNotAuthenticated(forgot)} />
          <Route path="/password/reset/:token" component={userIsNotAuthenticated(reset)} />
          {/* NOTE: put other app routes here */}
        </Switch>
      </Router>
    )
  }
}

App.propTypes = {
  initAuth: PropTypes.func.isRequired
}

export default connect(
  state => ({ auth: state.auth }),
  dispatch => ({ initAuth: (cb) => dispatch(initAuth(cb)) })
)(App)
