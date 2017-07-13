import React from 'react'

import styles from './logout.css'

function Logout({ onLogout }) {
  return (
    <div>
      <button onClick={onLogout} className={styles.button}>
        <span className='fa fa-sign-out' />
      </button>
    </div>
  )
}

export default Logout
