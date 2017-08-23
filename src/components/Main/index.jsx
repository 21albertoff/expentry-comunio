import React from 'react'
import uuid from 'uuid'

import styles from './main.css'

import LeaguesList from '../LeaguesList'

function Main ({ user }) {
  return (
    <div className={styles.root}>
      <LeaguesList user={user} />
    </div>
  )
}

export default Main
