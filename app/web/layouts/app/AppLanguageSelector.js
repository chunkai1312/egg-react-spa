import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
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

function AppLanguageSelector (props) {
  const { classes } = props
  const { i18n } = useTranslation()
  const [ open, setOpen ] = useState(false)
  const [ selected, setSelected ] = useState(i18n.language)
  const [ anchorEl, setAnchorEl ] = useState(null)

  const handleToggle = () => setOpen(!open)
  const handleClose = event => {
    if (anchorEl.contains(event.target)) return
    setOpen(false)
  }
  const handleChange = (event, value) => {
    props.i18n.changeLanguage(value)
    setSelected(value)
    handleToggle()
  }

  return (
    <React.Fragment>
      <Tooltip title="Change language" enterDelay={300}>
        <IconButton
          className={classes.button}
          color="inherit"
          buttonRef={node => setAnchorEl(node)}
          aria-owns={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <LanguageIcon />
        </IconButton>
      </Tooltip>

      <Popper open={open} anchorEl={anchorEl} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            id="menu-list-grow"
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  {options.map(option => (
                    <MenuItem
                      key={option.value}
                      selected={option.value === selected}
                      onClick={(event) => handleChange(event, option.value)}
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

AppLanguageSelector.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AppLanguageSelector)
