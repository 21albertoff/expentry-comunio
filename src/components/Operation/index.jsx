import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import styles from './operation.css'

class Operation extends Component {
  constructor (props) {
    super (props)
  }

  render () {    
    return (
      <div className={styles.root}>
        <div className={styles.datos}>
          <h2 className={styles.parrafo}>{this.props.motive}</h2>
          <p className={styles.parrafo}>
            <span className={styles.subtitle}>Tipo: </span>
            <span className={styles.number}>{this.props.type}</span>
          </p>
          <p className={styles.parrafo}>
            <span className={styles.subtitle}>Cantidad: </span>
            <span className={styles.number}>{this.props.quantity}€</span>
          </p>
        </div>        
      </div>
    )
  }
}

export default Operation
