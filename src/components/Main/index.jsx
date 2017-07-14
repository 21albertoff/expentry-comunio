import React, { Component } from 'react'
import uuid from 'uuid'

import styles from './main.css'

import LeaguesList from '../LeaguesList'

class Main extends Component {
  constructor () {
    super()
  }

  render () {
    return (
      <div className={styles.root}>
        <LeaguesList user={this.props.user} />
      </div>
    )
  }
}

export default Main
