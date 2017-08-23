import React from 'react'

import styles from './add-operation.css'

function AddOperation ({ onSubmitFormOperation, onCloseFormOperation }) {
  return (
    <form className={styles.form} method='post' onSubmit={onSubmitFormOperation}>
      <div>
        <span>Motivo: </span>
        <textarea name='motive' cols='30' rows='5' placeholder='Motivo de la operación...' className={styles.motive}>
        </textarea>
      </div>
      <div>
        <span>Tipo: </span>
        <select name='type'>
            <option value='expense'>Gasto</option>
            <option value='entry'>Ingreso</option>
        </select>
      </div>
      <div>
      <span>Cantidad: </span>
      <input type='text' name='quantity' className={styles.quantity} />
    </div>
      <div className={styles.buttons}>
        <button  type='button' className={styles.close} onClick={onCloseFormOperation}>
          <span className='fa fa-times' />
        </button>
        <button className={styles.send} type='submit'>
          <span className='fa fa-paper-plane' />
        </button>
      </div>
    </form>
  )
}

export default AddOperation
