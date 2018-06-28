import React, { Component, PropTypes } from 'react'
import Login from './login'
import Register from './register'
import Logout from './logout'
import { Modal, Button, Form, FormGroup, FormControl, Col} from 'react-bootstrap';

import {loginUser, logoutUser, registerUser} from '../../actions/authActions'

export default class AuthModal extends Component {

    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            authModalShow: !this.props.isAuthenticated
        }

        this.handleInputChange = {
            username: this.handleChange.bind(this, 'username'),
            password: this.handleChange.bind(this, 'password'),
        }

        this.closeModal = this.closeModal.bind(this);

    }

    render() {
        const { dispatch, isAuthenticated, errorMessage } = this.props;


        return (
            <div>
                <Modal show={this.state.authModalShow} onHide={this.closeModal}>
                    <Modal.Header>
                        <Button onClick={this.closeModal} sm={4} type="button" className={"close"} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </Button>
                        <Modal.Title sm={7}>Login or Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup>
                                <Col sm={6}>
                                    <FormControl value={this.state.username} onChange={this.handleInputChange.username} ref='username' type='text' class="form-control" placeholder={"Username"}/>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={6}>
                                    <FormControl value={this.state.password} onChange={this.handleInputChange.password} ref='password' type='password' class="form-control" placeholder={"Password"}/>
                                </Col>
                            </FormGroup>
                            {/*{errorMessage &&*/}
                            {/*<p>{errorMessage}</p>*/}
                            {/*}*/}
                            <FormGroup>
                                <Col xs={1}>
                                    <Login
                                        username={this.state.username}
                                        password={this.state.password}
                                        errorMessage={errorMessage}
                                        closeAuthModal={this.closeModal}
                                        onLoginClick={ creds => dispatch(loginUser(creds)) }
                                    />
                                </Col>
                                <Col xs={1}>
                                </Col>
                                <Col xs={1}>
                                    <Register username={this.state.username}
                                              password={this.state.password}
                                              errorMessage={errorMessage}
                                              closeAuthModal={this.closeModal}
                                              onLoginClick={ creds => dispatch(registerUser(creds)) }/>
                                </Col>
                            </FormGroup>
                        </Form>
                        {/*{isAuthenticated &&*/}
                        {/*<Logout onLogoutClick={() => dispatch(logoutUser())} />*/}
                        {/*}*/}
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

    closeModal() {
        this.setState({ authModalShow: false });
    }

    openModal(){
        this.setState({ authModalShow: true });
    }

    handleChange(key, e) {
        this.setState({[key]: e.target.value})
    }

}