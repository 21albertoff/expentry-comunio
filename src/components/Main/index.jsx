import React, { Component } from 'react'
import uuid from 'uuid'

import styles from './main.css'

import Season from '../Season'

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
    return (
      <div className={styles.root}>
        <Season seasons={this.state.seasons} />
      </div>
    )
  }
}

export default Main
