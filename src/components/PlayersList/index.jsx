import React, { Component } from 'react'
import firebase from 'firebase'
import uuid from 'uuid'

import styles from './players-list.css'

import AddPlayer from '../AddPlayer'
import Player from '../Player'

class PlayersList extends Component {
    constructor (props) {
        super (props)

        this.state = {
            openAddPlayerText: false,
            players: [],
            playersIds: ''
        }

        this.handleAddPlayer = this.handleAddPlayer.bind(this)
        this.handleCloseFormPlayer = this.handleCloseFormPlayer.bind(this)
        this.handleSubmitFormPlayer = this.handleSubmitFormPlayer.bind(this)
    }

    componentWillMount () {
        const playersRef = firebase.database().ref().child('players')

        playersRef.on('child_added', snapshot => {
            if (snapshot.val().league === this.props.league) {
                let players = this.state.players

                this.setState({
                    players: players.concat(snapshot.val()),
                    openAddPlayerText: false
                })    
            }
        })
    }

    componentWillReceiveProps () {        
        firebase.database().ref(`/leagues/${this.props.league}`).once('value', snapshot => {
            if (snapshot.val()) {
                if (snapshot.val().players.length > 0) {
                    let players = this.state.players

                    this.setState({
                        players: players.concat(snapshot.val().players.split(',')),
                        playersIds: snapshot.val().players
                    })
                }
            }
        })        
      }

     // Función que abre el formulario para añadir un player a la liga seleccionada.
    handleAddPlayer () {
        this.setState({
            openAddPlayerText: true
        })
    }

    handleCloseFormPlayer (event) {
        event.preventDefault()

        this.setState({
            openAddPlayerText: false
        })
    }

    handleSubmitFormPlayer (event) {
        event.preventDefault()
    
        const uid = uuid()

        firebase.database().ref('/players/' + uid).set({
            id: uid,
            name: event.target.name.value,
            balance: 0,
            league: this.props.league,
            operations: ''
        })
    
        // TODO: Añadimos el id del jugador al registro de la liga.
        if (this.state.players.length > 0) {
            firebase.database().ref().child('leagues').child(`${this.props.league}/players`).set(this.state.playersIds + ',' + uid)
            this.setState({
                playersIds: this.state.playersIds + ',' + uid
            })
        }
        else {
            firebase.database().ref().child('leagues').child(`${this.props.league}/players`).set(uid)
            this.setState({
                playersIds: uid
            })
        }
      }
    
      renderOpenFormAddPlayer () {
        if (this.state.openAddPlayerText) {
          return (
            <AddPlayer
              onSubmitFormPlayer={this.handleSubmitFormPlayer}
              onCloseFormPlayer={this.handleCloseFormPlayer}
            />
          )
        }
      }
      
    getPlayerOfDb (playerId) {
        let exist = false

        firebase.database().ref('/players/' + playerId).once('value', snapshot => {
          if (snapshot.val()) {
            exist = true
          }
        })
    
        return exist
      }

      render () {
        let playersRender

        if (this.state.players.length > 0) {
            playersRender = this.state.players.map(player => {
            const existPlayer = this.getPlayerOfDb(player.id)
    
            if (existPlayer) {
              return (
                  <Player key={player.id} id={player.id} balance={player.balance} operations={player.operations} name={player.name} />
              )
            }
          })
        } else {
            playersRender = "No hay jugadores :'("
        }
    
        return (
          <div className={styles.root}>
            {this.renderOpenFormAddPlayer()}
            <header className={(!this.state.openAddPlayerText) ? styles.header : styles.hideHeader}>
              <div>&nbsp;</div>
              <h3>Jugadores</h3>
              <div className={styles.button} onClick={this.handleAddPlayer}>
                <span className='fa fa-plus' />
              </div>
            </header>
            <div className={(!this.state.openAddPlayerText) ? styles.showPlayerList : styles.hidePlayerList}>
              {playersRender}
            </div>
          </div>
        )
      }
}

export default PlayersList