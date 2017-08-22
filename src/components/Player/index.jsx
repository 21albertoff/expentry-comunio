import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import styles from './player.css'

class Player extends Component {
    constructor(props) {
        super (props)
    }

    render () {
        let operationsListLink = `/operationsList/${this.props.id}`

        return (
            <div className={styles.root}>
            <div className={styles.datos}>
              <h2 className={styles.parrafo}>{this.props.name}</h2>
              <p className={styles.parrafo}>
                <span className={styles.subtitle}>Saldo: </span>
                <span className={(this.props.balance < 0) ? styles.number_negative : styles.number}>{this.props.balance}€</span>
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
}

export default Player