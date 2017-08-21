import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import styles from './league.css'

class League extends Component {
  constructor (props) {
    super (props)
  }

  render () {
    let playersListLink = `/playersList/${this.props.id}`

    return (      
      <div className={styles.root}>
        <div className={styles.datos}>
          <h2 className={styles.parrafo}>{this.props.name}</h2>
          <p className={styles.parrafo}>
            <span className={styles.subtitle}>Nº de jugadores: </span>
            <span className={styles.number}>{this.getNumberPlayers(this.props.players)}</span>
          </p>
          <p className={styles.parrafo}>
            <span className={styles.subtitle}>Temporada: </span>
            <span className={styles.number}>{this.props.season}</span>
          </p>
        </div>
        <div className={styles.arrow}>
          <div className={styles.content_arrow}>
          <Link to={playersListLink} className={styles.link}>
            <span className='fa fa-chevron-right'></span>
          </Link>
          </div>
        </div>
      </div>
    )
  }

  getNumberPlayers(players) {
    let number_players = players.split(',')

    return number_players.length
  }
}

export default League
