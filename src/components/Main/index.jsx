import React, { Component } from 'react'
import uuid from 'uuid'

import styles from './main.css'

class Main extends Component {
  constructor() {
    super()

    this.state = {
      seasons: [
        {
          id: uuid(),
          year: "2017",
          leagues: []
        },
        {
          id: uuid(),
          year: "2018",
          leagues: []
        }
      ]
    }
  }

  render () {
    let year = new Date().getFullYear()

    return (
      <div className={styles.root}>
        <p className={styles.literalSeason}>Temporada</p>
                <select className={styles.seasonCombo} defaultValue={year}>
                {
                    this.state.seasons.map( season => {
                        if( year == season.year || year - 1 == season.year ) {
                            return ( <option value={season.year} key={season.id}>{season.year}</option> )
                        }
                        else {
                            return ( <option value={season.year} key={season.id}>{season.year}</option> )
                        }
                    })
                }
                </select>  
      </div>
    )
  }
}

export default Main
