import React from 'react'
import {Link} from 'react-router-dom'

import styles from './operation.css'

function Operation ({ id, type, quantity, motive }) {
  return (
    <div className={styles.root}>
      <div className={styles.datos}>
        <h2 className={styles.parrafo}>{motive}</h2>
        <p className={styles.parrafo}>
          <span className={styles.subtitle}>Tipo: </span>
          <span className={styles.number}>{type}</span>
        </p>
        <p className={styles.parrafo}>
          <span className={styles.subtitle}>Cantidad: </span>
          <span className={styles.number}>{quantity}€</span>
        </p>
      </div>        
    </div>
  )  
}

export default Operation
