import React, { Component } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import firebase from 'firebase'

import Header from '../Header'
import Main from '../Main'
import Login from '../Login'

import 'normalize-css'
import styles from './app.css'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null
    }

    this.handleOnAuth = this.handleOnAuth.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  // Función que se ejecutará una vez el componente se haya renderizado.
  componentWillMount () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user })
        console.log(user)
      } else {
        this.setState({ user: null })
      }
    })
  }

  handleOnAuth () {
    var provider = new firebase.auth.GoogleAuthProvider()

    firebase.auth().signInWithPopup(provider)
    .then(result => console.log(`${result.user.email} ha iniciado sesión.`))
    .catch(error => console.log(`Error: ${error.code}: ${error.message}`))
  }

  handleLogout () {
    firebase.auth().signOut()
    .then(() => console.log('Te has desconectado correctamente.'))
    .catch(() => console.log('Un error ocurrió'))
  }

  render () {
    return (
      <HashRouter>
        <div>
          <Header onLogout={this.handleLogout} user={this.state.user} />

          <Route exact path='/' render={() => {
            if (this.state.user) {
              return (<Main />)
            } else {
              return (<Login onAuth={this.handleOnAuth} />)
            }
          }}
          />
        </div>
      </HashRouter>
    )
  }
}

export default App
