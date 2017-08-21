import React from 'react'

import styles from './add-player.css'

function AddPlayer ({ onSubmitFormPlayer, onCloseFormPlayer }) {
  return (
    <form className={styles.form} method='post' onSubmit={onSubmitFormPlayer}>
      <div>
        <span>Nombre: </span>
        <input type='text' name='name' className={styles.name} />
      </div>
      <div className={styles.buttons}>
        <button className={styles.close} onClick={onCloseFormPlayer}>
          <span className='fa fa-times' />
        </button>
        <button className={styles.send} type='submit'>
          <span className='fa fa-paper-plane' />
        </button>
      </div>
    </form>
  )
}

export default AddPlayer