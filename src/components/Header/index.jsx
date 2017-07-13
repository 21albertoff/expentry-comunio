import React from 'react'

import styles from './header.css'

function Header ({ onLogout }) {
  return (
    <header className={styles.root}>
      <h1 className={styles.logo}>Expentry comunio</h1>
        <button onClick={onLogout} className={styles.button}>
          <span className='fa fa-sign-out' />
        </button>
    </header>
  )
}

export default Header
