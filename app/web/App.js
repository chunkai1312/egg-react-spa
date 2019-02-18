import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { userIsAuthenticated, userIsNotAuthenticated } from './helpers/auth'
import home from './pages/home'
import login from './pages/auth/login'
import signup from './pages/auth/signup'
import forgot from './pages/auth/password/forget'
import reset from './pages/auth/password/reset'
import settings from './pages/settings'
import about from './pages/about'
import Loading from './components/Loading'
import withAuth from './components/withAuth'

function App (props) {
  const { auth } = props
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    auth.initAuth(() => setLoading(false))
    return () => setLoading(true)
  }, loading)

  return loading ? <Loading /> : (
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

App.propTypes = {
  auth: PropTypes.object.isRequired
}

export default withAuth(App)
