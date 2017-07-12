import React from 'react'

import styles from './season.css'

function Season ({ getSeasonSelected, seasons }) {
  let year = new Date().getFullYear()

  const seasonsRender = seasons.map(season => {
    if (year === season.year || year - 1 === season.year) {
      return (<option value={season.year} key={season.id}>{season.year}</option>)
    } else {
      return (<option value={season.year} key={season.id}>{season.year}</option>)
    }
  })

  return (
    <div className={styles.root}>
      <p className={styles.literalSeason}>Temporada</p>
      <select className={styles.seasonCombo} defaultValue={year} onChange={getSeasonSelected}>
        { seasonsRender }
      </select>
    </div>
  )
}

export default Season
