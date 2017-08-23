import React, { Component } from 'react'
import firebase from 'firebase'
import uuid from 'uuid'

import styles from './operations-list.css'

import AddOperation from '../AddOperation'
import Operation from '../Operation'

class OperationsList extends Component {
    constructor (props) {
        super (props)

        this.state = {
            openAddOperationText: false,
            operations: [],
            operationsIds: ''
        }

        this.handleAddOperation = this.handleAddOperation.bind(this)
        this.handleCloseFormOperation = this.handleCloseFormOperation.bind(this)
        this.handleSubmitFormOperation = this.handleSubmitFormOperation.bind(this)
    }

    componentWillMount () {
        const operationsRef = firebase.database().ref().child('operations')

        operationsRef.on('child_added', snapshot => {
            if (snapshot.val().player === this.props.player) {
                let operations = this.state.operations

                this.setState({
                    operations: operations.concat(snapshot.val()),
                    openAddOperationText: false,
                    operationsIds: (this.state.operationsIds.length > 0) ? this.state.operationsIds + snapshot.val().id : snapshot.val().id
                })
            }
        })
    }

     // Función que abre el formulario para añadir una operación al jugador seleccionado.
     handleAddOperation () {
        this.setState({
            openAddOperationText: true
        })
    }

    handleCloseFormOperation (event) {
        event.preventDefault()

        this.setState({
            openAddOperationText: false
        })
    }

    handleSubmitFormOperation (event) {
        event.preventDefault()

        const uid = uuid()

        firebase.database().ref('/operations/' + uid).set({
            id: uid,
            type: (event.target.type.value === 'expense') ? 'Gasto' : 'Ingreso',
            quantity: event.target.quantity.value,
            motive: event.target.motive.value,
            player: this.props.player
        })

        // TODO: Añadimos el id de la operación al registro del jugador.
        if (this.state.operations.length > 0) {
            firebase.database().ref().child('players').child(`${this.props.player}/operations`).set(this.state.operationsIds + ',' + uid)
            this.setState({
                operationsIds: this.state.operationsIds + ',' + uid
            })
        }
        else {
            firebase.database().ref().child('players').child(`${this.props.player}/operations`).set(uid)
            this.setState({
                operationsIds: uid
            })
        }

        //Modificamos el valor del campo 'balance'.
        const balance = this.getBalancePlayer(this.props.player)
        

        if (event.target.type.value === 'expense') {
            let total = balance - Number(event.target.quantity.value)
            firebase.database().ref().child('players').child(`${this.props.player}/balance`).set(total)    
        }
        else {
            let total = balance + Number(event.target.quantity.value)
            firebase.database().ref().child('players').child(`${this.props.player}/balance`).set(total)
        }
    }
    
    renderOpenFormAddOperation () {
        if (this.state.openAddOperationText) {
            return (
            <AddOperation
                onSubmitFormOperation={this.handleSubmitFormOperation}
                onCloseFormOperation={this.handleCloseFormOperation}
            />
            )
        }
    }
    
    getBalancePlayer(playerId) {
        let balance = 0
        firebase.database().ref().child('players').child(playerId).once('value', snapshot => {
            if (snapshot.val()) {
                balance = snapshot.val().balance
            }
        })

        return balance
    }

    getOperationOfDb (operationId) {
        let exist = false

        firebase.database().ref('/operations/' + operationId).once('value', snapshot => {
          if (snapshot.val()) {
            exist = true
          }
        })
    
        return exist
      }

      render () {
        let operationsRender

        if (this.state.operations.length > 0) {
            operationsRender = this.state.operations.map((operation, index) => {
            const existOperation = this.getOperationOfDb(operation.id)
    
            if (existOperation) {
              return (
                  <Operation key={index + 1} id={operation.id} type={operation.type} quantity={operation.quantity}
                  motive={operation.motive} />
              )
            }
          })
        } else {
            operationsRender = "No hay operaciones :'("
        }
    
        return (
          <div className={styles.root}>
            {this.renderOpenFormAddOperation()}
            <header className={(!this.state.openAddOperationText) ? styles.header : styles.hideHeader}>
              <div>&nbsp;</div>
              <h3>Operaciones</h3>
              <div className={styles.button} onClick={this.handleAddOperation}>
                <span className='fa fa-plus' />
              </div>
            </header>
            <div className={(!this.state.openAddOperationText) ? styles.showOperationList : styles.hideOperationList}>
              {operationsRender}
            </div>
          </div>
        )
      }
}

export default OperationsList