import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { userIsAuthenticated, userIsNotAuthenticated } from './helpers/auth'
import { setLoading } from './store/modules/app'
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
  componentDidMount () {
    const { loading, initAuth, setLoading } = this.props
    if (loading) initAuth(() => setLoading(false))
  }

  render () {
    return this.props.loading ? <Loading /> : (
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
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  initAuth: PropTypes.func.isRequired
}

export default connect(
  state => ({
    loading: state.app.loading
  }),
  dispatch => ({
    initAuth: (cb) => dispatch(initAuth(cb)),
    setLoading: (loading) => dispatch(setLoading(loading))
  })
)(App)
