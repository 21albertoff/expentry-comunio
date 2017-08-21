import React, { Component } from 'react'
import firebase from 'firebase'
import uuid from 'uuid'

import League from '../League'
import AddLeague from '../AddLeague'

import styles from './leagues-list.css'

class LeaguesList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      openAddLeagueText: false,
      leagues: []
    }

    this.handleAddLeague = this.handleAddLeague.bind(this)
    this.handleCloseFormLeague = this.handleCloseFormLeague.bind(this)
    this.handleSubmitFormLeague = this.handleSubmitFormLeague.bind(this)
  }

  componentWillMount () {
    const leaguesRef = firebase.database().ref().child('leagues')

    leaguesRef.on('child_added', snapshot => {
      this.setState({
        leagues: this.state.leagues.concat(snapshot.val()),
        openAddLeagueText: false
      })
    })
  }

  // Función que abre el formulario para añadir una liga al usuario.
  handleAddLeague () {
    this.setState({
      openAddLeagueText: true
    })
  }

  handleCloseFormLeague (event) {
    event.preventDefault()

    this.setState({
      openAddLeagueText: false
    })
  }

  handleSubmitFormLeague (event) {
    event.preventDefault()

    const uid = uuid()
    const year = new Date().getFullYear().toString()
    const month = new Date().getMonth() + 1
    let season = ''

    if (month > 6) {
      season = year.substring(2) + '/' + (parseInt(year) + 1).toString().substring(2)
    } else {
      season = (parseInt(year) - 1).toString().substring(2) + '/' + year.substring(2)
    }

    firebase.database().ref('/leagues/' + uid).set({
      id: uid,
      name: event.target.name.value,
      season: season,
      user: this.props.user.id,
      players: ''
    })

    // TODO: Añadimos el id de la liga al registro del usuario.
    firebase.database().ref().child('users').child(`${this.props.user.id}/leagues`).set(this.props.user.leagues + ',' + uid)
  }

  getLeagueOfDb (keyLeague) {
    let league = null

    firebase.database().ref('/leagues/' + keyLeague).once('value', snapshot => {
      if (snapshot.val()) {
        league = snapshot.val()
      }
    })

    return league
  }

  renderOpenFormAddLeague () {
    if (this.state.openAddLeagueText) {
      return (
        <AddLeague
          onSubmitFormLeague={this.handleSubmitFormLeague}
          onCloseFormLeague={this.handleCloseFormLeague}
        />
      )
    }
  }

  render () {
    let leaguesRender
    if (this.props.user.leagues.split(',').length > 0) {
      leaguesRender = this.props.user.leagues.split(',').map(league => {
        const existLeague = this.getLeagueOfDb(league)

        if (existLeague !== null) {
          return (<League id={existLeague.id} name={existLeague.name} players={existLeague.players} 
          season={existLeague.season} user={existLeague.user} key={existLeague.id} />)
        }
      })
    } else {
      leaguesRender = "No hay ligas :'("
    }

    return (
      <div>
        {this.renderOpenFormAddLeague()}
        <header className={(!this.state.openAddLeagueText) ? styles.header : styles.hideHeader}>
          <div>&nbsp;</div>
          <h3>Ligas</h3>
          <div className={styles.button} onClick={this.handleAddLeague}>
            <span className='fa fa-plus' />
          </div>
        </header>
        <div className={(!this.state.openAddLeagueText) ? styles.showLeagueList : styles.hideLeagueList}>
          {leaguesRender}
        </div>
      </div>
    )
  }
}

export default LeaguesList
