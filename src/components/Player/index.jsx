import React from 'react'
import {Link} from 'react-router-dom'

import styles from './player.css'

function Player ({ id, name, balance }) {
  const operationsListLink = `/operationsList/${id}`

  return (
    <div className={styles.root}>
      <div className={styles.datos}>
        <h2 className={styles.parrafo}>{name}</h2>
        <p className={styles.parrafo}>
          <span className={styles.subtitle}>Saldo: </span>
          <span className={(balance < 0) ? styles.number_negative : styles.number}>{balance}€</span>
        </p>              
      </div>
      <div className={styles.arrow}>
        <div className={styles.content_arrow}>
        <Link to={operationsListLink} className={styles.link}>
          <span className='fa fa-chevron-right'></span>
        </Link>
        </div>
      </div>
    </div>
  )
}

export default Player