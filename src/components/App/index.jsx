import React, { Component } from 'react'
import { withRouter, Route } from 'react-router-dom'
import firebase from 'firebase'

import Header from '../Header'
import Main from '../Main'
import Login from '../Login'
import PlayersList from '../PlayersList'
import OperationsList from '../OperationsList'

import 'normalize-css'
import styles from './app.css'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: null,
      userSession: null
    }

    this.handleOnAuth = this.handleOnAuth.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  // Función que se ejecutará una vez el componente se haya renderizado.
  componentWillMount () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.getUserDbWithUserSession(user)
        console.log(user)
      } else {
        this.setState({ user: null, userSession: null })
      }
    })
  }

  getUserDbWithUserSession (userSession) {
    const db = firebase.database()

    db.ref().child('users').child(`${userSession.uid}`).once('value', snapshot => {
      if (snapshot.val()) {
        this.setState({
          user: userSession,
          userSession: snapshot.val()
        })
      }
    })
  }

  handleOnAuth () {
    const provider = new firebase.auth.GoogleAuthProvider()

    firebase.auth().signInWithPopup(provider)
    .then(result => {
      const db = firebase.database()

      db.ref().child('users').child(`${firebase.auth().currentUser.uid}`).once('value', snapshot => {
        if (snapshot.val()) {
          this.setState({
            user: snapshot.val()
          })
        } else {
          // Añadimos el usuario de la sesión a la bd.
          db.ref('/users/' + firebase.auth().currentUser.uid).set({
            id: firebase.auth().currentUser.uid,
            displayName: firebase.auth().currentUser.displayName,
            email: firebase.auth().currentUser.email,
            leagues: ''
          })
        }

        // Una vez creado el usuario, pasamos el usuario creado para que cargue la pantalla de ligas de este.
        this.setState({
          userSession: {
            id: firebase.auth().currentUser.uid,
            displayName: firebase.auth().currentUser.displayName,
            email: firebase.auth().currentUser.email,
            leagues: ''
          },
          user: firebase.auth().currentUser
        })
      })
    })
    .catch(error => console.log(`Error: ${error.code}: ${error.message}`))
  }

  handleLogout () {
    firebase.auth().signOut()
    .then(() => {
      console.log('Te has desconectado correctamente.')
      this.setState({
        userSession: null,
        user: null
      })
      this.props.history.push('/')
    })
    .catch(() => console.log('Un error ocurrió.'))    
  }

  render () {
    return (
      <div>
        <Header onLogout={this.handleLogout} user={this.state.user} />

        <Route exact path='/' render={() => {
          if (this.state.userSession) {
            return (<Main user={this.state.userSession} />)
          } else {
            return (<Login onAuth={this.handleOnAuth} />)
          }
        }}
        />

        <Route exact path='/playersList/:id' render={({match}) => {
          return (<PlayersList league={match.params.id} />)
        }} />

        <Route exact path='/operationsList/:id' render={({match}) => {
          return (<OperationsList player={match.params.id} />)
        }} />
      </div>
    )
  }
}

export default withRouter(App)
