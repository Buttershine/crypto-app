import React, {Component} from 'react';
import '../../App.css';
import {Button } from 'react-bootstrap'
import Logout from './logout'
import {loginUser, logoutUser} from "../../actions/authActions";

export default class LoginTopMenu extends Component {
    constructor(props){
        super(props);

        this.state = {
            authModalShow: !this.props.isAuthenticated
        }

    }

    render(){
        const { dispatch, isAuthenticated, errorMessage } = this.props
        if (isAuthenticated) {
            return <Logout onLogoutClick ={ creds => dispatch(logoutUser(creds)) }/>;
        }
        // return <Login />;
        return (<div>
                    <style type="text/css">{`
                        .btn-custom {
                        position:absolute;
                        right:10px;
                        top:5px;
                        background-color: transparent;
                        color: white;
                        }
                    `}</style>
                    <Button bsStyle="custom">Login</Button>
                </div>);
    }

}