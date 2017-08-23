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
      leagues: [],
      leaguesIds: ''
    }

    this.handleAddLeague = this.handleAddLeague.bind(this)
    this.handleCloseFormLeague = this.handleCloseFormLeague.bind(this)
    this.handleSubmitFormLeague = this.handleSubmitFormLeague.bind(this)
  }

  componentWillMount () {
    const leaguesRef = firebase.database().ref().child('leagues')

    leaguesRef.on('child_added', snapshot => {
      if (snapshot.val().user === this.props.user.id) {
        this.setState({
          leagues: this.state.leagues.concat(snapshot.val()),
          openAddLeagueText: false,
          leaguesIds: (this.state.leaguesIds.length > 0) ? this.state.leaguesIds + snapshot.val().id : snapshot.val().id
        })
      }
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
    if (this.state.leagues.length > 0) {
      firebase.database().ref().child('users').child(`${this.props.user.id}/leagues`).set(this.state.leaguesIds + ',' + uid)
    }
    else {
      firebase.database().ref().child('users').child(`${this.props.user.id}/leagues`).set(uid)
    }
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

    if (this.state.leagues.length > 0) {
      leaguesRender = this.state.leagues.map((league, index) => {
        const existLeague = this.getLeagueOfDb(league.id)

        if (existLeague !== null) {
          return (<League key={index+1} id={existLeague.id} name={existLeague.name} players={existLeague.players}
          season={existLeague.season} user={existLeague.user} />)
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
