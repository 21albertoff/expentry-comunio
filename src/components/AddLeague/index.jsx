import React from 'react'

import styles from './add-league.css'

function AddLeague ({ onSubmitFormLeague, onCloseFormLeague }) {
  return (
    <form className={styles.form} method='post' onSubmit={onSubmitFormLeague}>
      <div>
        <span>Nombre: </span>
        <input type='text' name='name' className={styles.text} />
      </div>
      <div className={styles.buttons}>
        <button type='button' className={styles.close} onClick={onCloseFormLeague}>
          <span className='fa fa-times' />
        </button>
        <button className={styles.send} type='submit'>
          <span className='fa fa-paper-plane' />
        </button>
      </div>
    </form>
  )
}

export default AddLeague
