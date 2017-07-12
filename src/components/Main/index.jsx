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
          leagues: [
            {
              id: uuid(),
              name: 'Premier Talavera',
              players: [
                {
                  id: uuid(),
                  name: 'Aarón RJ',
                  balance: '20.000.000',
                  operations: [
                    {
                      id: uuid(),
                      type: 'expense',
                      quantity: '1.500.000',
                      motive: 'Fichaje de Emerson'
                    },
                    {
                      id: uuid(),
                      type: 'entry',
                      quantity: '1.000.000',
                      motive: 'Por quedar en segunda posición en la jornada 34'
                    }
                  ]
                },
                {
                  id: uuid(),
                  name: 'Dani Méndez',
                  balance: '5.000.000',
                  operations: [
                    {
                      id: uuid(),
                      type: 'expense',
                      quantity: '9.000.000',
                      motive: 'Fichaje de Borja Bastón'
                    },
                    {
                      id: uuid(),
                      type: 'entry',
                      quantity: '2.000.000',
                      motive: 'Venta de Fulano al mercado'
                    }
                  ]
                }
              ]
            },
            {
              id: uuid(),
              name: 'Liga 66 4Picas',
              players: [
                {
                  id: uuid(),
                  name: 'tOWERR',
                  balance: '20.000.000',
                  operations: [
                    {
                      id: uuid(),
                      type: 'expense',
                      quantity: '10.500.000',
                      motive: 'Fichaje de Modric'
                    },
                    {
                      id: uuid(),
                      type: 'entry',
                      quantity: '10.000.000',
                      motive: 'Venta de Saúl Sánchez a Kalifa'
                    }
                  ]
                },
                {
                  id: uuid(),
                  name: 'Kalifa',
                  balance: '2.000.000',
                  operations: [
                    {
                      id: uuid(),
                      type: 'expense',
                      quantity: '1.500.000',
                      motive: 'Fichaje de Diego López'
                    },
                    {
                      id: uuid(),
                      type: 'entry',
                      quantity: '1.000.000',
                      motive: 'Por tener 2 jugadores en el once ideal de la jornada 15'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: uuid(),
          year: '2018',
          leagues: [
            {
              id: uuid(),
              name: 'Premier Talavera II',
              players: [
                {
                  id: uuid(),
                  name: 'Aarón RJ II',
                  balance: '15.000.000',
                  operations: [
                    {
                      id: uuid(),
                      type: 'expense',
                      quantity: '1.500.000',
                      motive: 'Fichaje de Emerson II'
                    },
                    {
                      id: uuid(),
                      type: 'entry',
                      quantity: '1.000.000',
                      motive: 'Por quedar en segunda posición en la jornada 38'
                    }
                  ]
                },
                {
                  id: uuid(),
                  name: 'Dani Méndez II',
                  balance: '3.000.000',
                  operations: [
                    {
                      id: uuid(),
                      type: 'expense',
                      quantity: '1.500.000',
                      motive: 'Fichaje de Ibrahim'
                    },
                    {
                      id: uuid(),
                      type: 'entry',
                      quantity: '1.000.000',
                      motive: 'Por quedar en tercero posición en la jornada 31'
                    }
                  ]
                }
              ]
            },
            {
              id: uuid(),
              name: 'Liga 66 4Picas II',
              players: [
                {
                  id: uuid(),
                  name: 'tOWERR II',
                  balance: '20.325.000',
                  operations: [
                    {
                      id: uuid(),
                      type: 'expense',
                      quantity: '1.500.000',
                      motive: 'Fichaje de Mourinho'
                    },
                    {
                      id: uuid(),
                      type: 'entry',
                      quantity: '1.000.000',
                      motive: 'Por quedar en primera posición en la jornada 30'
                    }
                  ]
                },
                {
                  id: uuid(),
                  name: 'Kalifa II',
                  balance: '2.500.005',
                  operations: [
                    {
                      id: uuid(),
                      type: 'expense',
                      quantity: '1.500.000',
                      motive: 'Fichaje de Rubén Castro'
                    },
                    {
                      id: uuid(),
                      type: 'entry',
                      quantity: '1.000.000',
                      motive: 'Por quedar en octava posición en la jornada 5'
                    }
                  ]
                }
              ]
            }
          ]
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
        <LeagueList leagues={this.state.leaguesNow} />
      </div>
    )
  }
}

export default Main
