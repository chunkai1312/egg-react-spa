import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Loading from './components/Loading'
import { userIsAuthenticated, userIsNotAuthenticated } from './helpers/auth'
import { setLoading } from './store/modules/app'
import { initAuthFromExistingToken } from './store/modules/auth'
import home from './pages/home'
import login from './pages/auth/login'
import about from './pages/about'
import settings from './pages/settings'
import forgot from './pages/auth/password/forget'
import reset from './pages/auth/password/reset'

class App extends React.Component {
  componentDidMount () {
    const { initAuthFromExistingToken, setLoading } = this.props
    initAuthFromExistingToken(() => setLoading(false))
  }

  render () {
    return this.props.loading ? <Loading /> : (
      <Router>
        <Switch>
          <Route path="/" exact component={userIsAuthenticated(home)} />
          <Route path="/about" exact component={userIsAuthenticated(about)} />
          <Route path="/settings" exact component={userIsAuthenticated(settings)} />
          <Route path="/login" exact component={userIsNotAuthenticated(login)} />
          <Route path="/password/forgot" exact component={userIsNotAuthenticated(forgot)} />
          <Route path="/password/reset/:token" component={userIsNotAuthenticated(reset)} />
          {/* NOTE: put other app routes here */}
        </Switch>
      </Router>
    )
  }
}

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  initAuthFromExistingToken: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired
}

export default connect(
  state => ({ loading: state.app.loading }),
  dispatch => ({
    initAuthFromExistingToken: (cb) => dispatch(initAuthFromExistingToken(cb)),
    setLoading: (loading) => dispatch(setLoading(loading))
  })
)(App)
