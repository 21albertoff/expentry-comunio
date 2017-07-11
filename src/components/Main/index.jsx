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
          year: "17/18",
          leagues: []
        },
        {
          id: uuid(),
          year: "18/19",
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
