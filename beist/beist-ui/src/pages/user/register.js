import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import LoginForm from '../../components/user/loginForm';

class Register extends Component {
    render() {
        return (
            <div class="container">
                <LoginForm/>
            </div>
        );
    }
}

export default Register;