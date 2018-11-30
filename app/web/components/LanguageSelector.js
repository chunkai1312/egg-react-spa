import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { withI18n } from 'react-i18next'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const styles = theme => {}

const options = [
  { label: 'English', value: 'en' },
  { label: '中文 (台灣)', value: 'zh-TW' },
  { label: '中文 (简体)', value: 'zh-CN' }
]

class LanguageSelector extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      anchorEl: null,
      selected: props.i18n.language
    }
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleSelect = (event, value) => {
    this.props.i18n.changeLanguage(value)
    this.setState({ anchorEl: null, selected: value })
  }

  handleClose = event => {
    this.setState({ anchorEl: null })
  }

  render () {
    const { className } = this.props
    const { anchorEl, selected } = this.state
    const language = options.find(option => option.value === selected).label
    return (
      <div>
        <Button
          className={className}
          fullWidth
          aria-owns={anchorEl ? 'language-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          {language}
        </Button>
        <Menu
          id="language-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {options.map(option => (
            <MenuItem key={option.value} onClick={(event) => this.handleSelect(event, option.value)}>{option.label}</MenuItem>
          ))}
        </Menu>
      </div>
    )
  }
}

LanguageSelector.propTypes = {
  i18n: PropTypes.object.isRequired,
  className: PropTypes.string
}

export default compose(
  withI18n(),
  withStyles(styles)
)(LanguageSelector)
