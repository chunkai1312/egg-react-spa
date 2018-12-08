import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActions from '../store/modules/auth'

function withAuth (WrappedComponent) {
  const ComponentWithAuth = (props) => (
    <WrappedComponent {...props} />
  )

  return connect(
    (state, ownProps) => state.auth,
    (dispatch) => bindActionCreators(authActions, dispatch),
    (stateProps, dispatchProps, ownProps) => ({ ...ownProps, auth: { ...stateProps, ...dispatchProps } })
  )(ComponentWithAuth)
}

export default withAuth
