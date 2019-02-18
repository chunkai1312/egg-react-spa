import { useEffect } from 'react'
import PropTypes from 'prop-types'

function LoginWithOauth (props) {
  const { render, provider, url, onCallback } = props

  const onMessage = (e) => {
    if (e.origin !== window.origin || !e.data.token) return
    onCallback({ provider, ...e.data })
  }

  useEffect(() => {
    window.addEventListener('message', onMessage)
    return () => {
      window.removeEventListener('message', onMessage)
    }
  })

  return render({ provider, url, authenticate: () => window.open(props.url) })
}

LoginWithOauth.propTypes = {
  render: PropTypes.func.isRequired,
  provider: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onCallback: PropTypes.func.isRequired
}

export default LoginWithOauth
