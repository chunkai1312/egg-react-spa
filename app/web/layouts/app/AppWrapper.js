import React from 'react'
import PropTypes from 'prop-types'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { SnackbarProvider } from 'notistack'
import theme from '../../styles/theme'
import AppFrame from './AppFrame'

function AppWrapper (props) {
  const { children } = props
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <AppFrame>{children}</AppFrame>
      </SnackbarProvider>
    </MuiThemeProvider>
  )
}

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired
}

export default AppWrapper
