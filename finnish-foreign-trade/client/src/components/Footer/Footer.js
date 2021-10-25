import React from 'react'
import { Menu } from 'semantic-ui-react'
import './Footer.scss'

const Footer = ({ darkModeActive }) => {
  return (
    <Menu secondary className={darkModeActive ? 'footer inverted dark-mode' : 'footer'} >
      <Menu.Item link as='a' href='https://github.com/joonaspartanen/finnish-foreign-trade'>
        About
      </Menu.Item>
    </Menu>
  )
}

export default Footer
