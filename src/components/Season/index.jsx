import React, { Component } from 'react'

import styles from './season.css'

class Season extends Component {
    constructor( props ) {
        super( props )
    }

    render () {
        return (
            <div>
                <p className={styles.literalSeason}>Temporada</p>
                <select className={styles.seasonCombo}>
                {
                    this.props.seasons.map( season => {
                    return ( <option value={season.year} key={season.id}>{season.year}</option> )
                    })
                }
                </select>
            </div>
        )
    }
}

export default Season