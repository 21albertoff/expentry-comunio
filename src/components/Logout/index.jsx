import React from 'react'

import styles from './logout.css'

function Logout ({ onLogout }) {
  return (
    <div className={styles.button} onClick={onLogout}>
      <span className='fa fa-sign-out' />
    </div>
  )
}

export default Logout
