import React from 'react'

import Logout from '../Logout'

import styles from './header.css'

function Header ({ onLogout, user }) {
  return (
    <header className={styles.root}>
      <h1 className={styles.logo}>Expentry comunio</h1>
      { user ? <Logout onLogout={onLogout} /> : null }
    </header>
  )
}

export default Header
