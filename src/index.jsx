import React from 'react'
import { render } from 'react-dom'
import firebase from 'firebase'

// Initialize Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyCNOH6gUBVEqZPn2q4wiv7lzEG2QrdtA3A',
  authDomain: 'expentry-comunio.firebaseapp.com',
  databaseURL: 'https://expentry-comunio.firebaseio.com',
  projectId: 'expentry-comunio',
  storageBucket: 'expentry-comunio.appspot.com',
  messagingSenderId: '874644608088'
})

import App from './components/App'

render(<App />, document.getElementById('root'))
