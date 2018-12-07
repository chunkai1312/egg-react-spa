import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { withI18n } from 'react-i18next'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Tooltip from '@material-ui/core/Tooltip'
import LanguageIcon from '@material-ui/icons/Language'

const styles = theme => {}

const options = [
  { label: 'English', value: 'en' },
  { label: '中文 (台灣)', value: 'zh-TW' },
  { label: '中文 (简体)', value: 'zh-CN' }
]

class AppLanguageSelector extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      selected: props.i18n.language
    }
  }

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }))
  }

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return
    }
    this.setState({ open: false })
  }

  handleChange = (event, value) => {
    this.props.i18n.changeLanguage(value)
    this.setState({ selected: value })
    this.handleToggle()
  }

  render () {
    const { classes } = this.props
    const { open, selected } = this.state
    return (
      <React.Fragment>
        <Tooltip title="Change language" enterDelay={300}>
          <IconButton
            className={classes.button}
            color="inherit"
            buttonRef={node => {
              this.anchorEl = node
            }}
            aria-owns={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={this.handleToggle}
          >
            <LanguageIcon />
          </IconButton>
        </Tooltip>

        <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>
                    {options.map(option => (
                      <MenuItem
                        key={option.value}
                        selected={option.value === selected}
                        onClick={(event) => this.handleChange(event, option.value)}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </React.Fragment>
    )
  }
}

AppLanguageSelector.propTypes = {
  i18n: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default compose(
  withI18n(),
  withStyles(styles)
)(AppLanguageSelector)
