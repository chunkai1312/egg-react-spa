import React from 'react'
import PropTypes from 'prop-types'

class LoginWithOauth extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      provider: props.provider,
      url: props.url,
      authenticate: () => window.open(props.url)
    }
  }

  componentDidMount () {
    window.addEventListener('message', this.onMessage)
  }

  componentWillUnmount () {
    window.removeEventListener('message', this.onMessage)
  }

  onMessage = (e) => {
    const { provider, onCallback } = this.props
    if (e.origin !== window.origin || !e.data.token) {
      return
    }
    onCallback({ provider, ...e.data })
  }

  render () {
    return (
      this.props.render(this.state)
    )
  }
}

LoginWithOauth.propTypes = {
  provider: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  onCallback: PropTypes.func.isRequired
}

export default LoginWithOauth
