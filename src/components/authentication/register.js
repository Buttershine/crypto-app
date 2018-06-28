import React, { Component, PropTypes } from 'react'
import {Form, FormGroup, FormControl, Col, Button} from 'react-bootstrap'
import VertBar from '../miscellaneous/vertBar.js'

export default class Register extends Component {
    constructor() {
        super()

        this.props = {
            username: '',
            password: '',
            errorMessage: ''
        }
    }

    render() {
        const { errorMessage } = this.props

        return (
            <div>
                <Button onClick={(event) => this.handleClick(event)} ref="login" className="btn btn-primary button-panel-button">Register</Button>
            </div>
        )
    }

    handleClick(event) {
        const username = this.props.username
        const password = this.props.password
        if(this.props.username && this.props.password){
            const creds = { username: username, password: password }
            this.props.onLoginClick(creds)
        }else {
            this.state.errorMessage = "Please Enter a Valid Username and Password"
        }

    }
}