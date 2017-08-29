import React, {Component} from 'react';
import '../styles/css/style.css';
import {Button, ButtonToolbar, Col, Grid, Image, Modal, Row} from 'react-bootstrap';    // import bootstrap framework
import BeistLogo from '../images/sk.JPG';
import LoginForm from "./user/loginForm";
import RegisterForm from "./user/registerForm";

class IndexBody extends Component {
    constructor() {
        super();
        this.state = {
            showLoginModal: false,
            showRegisterModal: false
        }
    }

    openLoginModal() {
        this.setState({
            showLoginModal: true,
            showRegisterModal: false
        })
    }

    openRegisterModal() {
        this.setState({
            showRegisterModal: true,
            showLoginModal: false
        })
    }

    closeLoginModal() {
        this.setState({
            showLoginModal: false
        })
    }

    closeRegisterModal() {
        this.setState({
            showRegisterModal: false
        })
    }

    render() {
        return (
            <div>
                <div className="container">
                    <Grid className="padTop10Class">
                        <Row>
                            <Col sm={12} md={6}>
                                <Image src={BeistLogo} thumbnail/>
                            </Col>
                            <Col sm={12} md={6}>
                                <div className="indexBody">
                                    <h4>It's time to change your way of memorizing words.</h4>
                                    <ButtonToolbar/>
                                    <h1>Ready?</h1>
                                    <Row className="indexButton">
                                        <Col sm={12} md={6}>
                                            <div>
                                                <Button bsStyle="info" onClick={this.openLoginModal.bind(this)}
                                                        block>登录</Button>
                                            </div>
                                        </Col>
                                        <Col sm={12} md={6}>
                                            <div>
                                                <Button bsStyle="info" onClick={this.openRegisterModal.bind(this)}
                                                        block>注册</Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </div>
                <Modal className="LoginModal" show={this.state.showLoginModal} onHide={this.closeLoginModal.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>登录</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <LoginForm/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.openRegisterModal.bind(this)}>还未注册?</Button>
                        <Button bsStyle="info">登录</Button>
                    </Modal.Footer>
                </Modal>
                <Modal className="RegisterModal" show={this.state.showRegisterModal} onHide={this.closeRegisterModal.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>注册</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <RegisterForm/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.openLoginModal.bind(this)}>已有账号?</Button>
                        <Button bsStyle="info">注册</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default IndexBody;