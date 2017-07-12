import React, { Component } from 'react'
import uuid from 'uuid'

import styles from './main.css'

import Season from '../Season'
import LeagueList from '../LeagueList'

class Main extends Component {
  constructor () {
    super()

    this.state = {
      seasons: [
        {
          id: uuid(),
          year: '2017',
          leagues: []
        },
        {
          id: uuid(),
          year: '2018',
          leagues: []
        }
      ],
      seasonNow: new Date().getFullYear().toString(),
      leaguesNow: []
    }

    // Bindeo de funciones
    this.handleGetSeasonSelected = this.handleGetSeasonSelected.bind(this)
  }

  handleGetSeasonSelected (event) {
    event.preventDefault()

    let leagues = this.state.seasons.map(season => {
      if (season.year === event.target.value) {
        return season.leagues
      }
    })

    this.setState({
      seasonNow: event.target.value,
      leaguesNow: this.state.leaguesNow.concat([leagues])
    })
  }

  render () {
    return (
      <div className={styles.root}>
        <Season seasons={this.state.seasons} getSeasonSelected={this.handleGetSeasonSelected} />
        <LeagueList leagues={this.state.leaguesNow} season={this.state.seasonNow} />
      </div>
    )
  }
}

export default Main
