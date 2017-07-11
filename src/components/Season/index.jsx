import React, { Component } from 'react'

import styles from './season.css'

class Season extends Component {
    constructor( props ) {
        super( props )
    }

    render () {
        let year = new Date().getFullYear()

        return (
            <div>
                <p className={styles.literalSeason}>Temporada</p>
                <select className={styles.seasonCombo}>
                {
                    this.props.seasons.map( season => {
                        if( year == season.year || year - 1 == season.year ) {
                            return ( <option value={season.year} key={season.id} selected>{season.year}</option> )
                        }
                        else {
                            return ( <option value={season.year} key={season.id}>{season.year}</option> )
                        }
                    })
                }
                </select>
            </div>
        )
    }
}

export default Season