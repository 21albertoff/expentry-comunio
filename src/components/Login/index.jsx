import React from 'react'

import styles from './login.css'

function Login ({ onAuth }) {
  return (
    <div className={styles.root}>
      <p className={styles.text}>
        Necesitamos que inicies sesión con tu cuenta de Google.
      </p>
      <button  onClick={onAuth} className={styles.button}>
        <span className='fa fa-google' /> Login Google
      </button>
    </div>
  )
}

export default Login
