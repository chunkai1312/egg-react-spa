import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  // TODO
})

function AboutPage () {
  return (
    <div>About Page</div>
  )
}

AboutPage.propTypes = {
  classes: PropTypes.object.isRequired // eslint-disable-line
}

export default withStyles(styles)(AboutPage)
