import React from 'react'

import League from '../League'

import styles from './leagues-list.css'

function LeaguesList ({ leagues }) {
  const leaguesRender = leagues.map(league => {
    <League
      key={league.id}
      name={league.name}
      players={league.players}
    />
  })

  return (
    <div className={styles.root}>
      {leaguesRender}
    </div>
  )
}

export default LeaguesList
