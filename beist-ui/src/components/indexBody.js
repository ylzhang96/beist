import React, {Component} from 'react';
import '../styles/css/style.css';
import {Button, ButtonToolbar, Col, Grid, Image, Label, Modal, Row} from 'react-bootstrap';    // import bootstrap framework
import BeistLogo from '../images/indexImage.jpg';
import LoginForm from "./user/loginForm";
import RegisterForm from "./user/registerForm";
import fetch from 'isomorphic-fetch';

class IndexBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginLabel: '',
            registerLabel: '',
            showLoginModal: false,
            showRegisterModal: false,
            isRegister: false,
            userInfo: {
                userTele: '',
                userPass: '',
                userCode: '',
                userName: ''
            }
        }
    }

    onChangeUserTele(event) {
        let telephone = event.target.value;
        this.setState({
            userInfo: {
                userTele: telephone,
                userPass: this.state.userInfo.userPass,
                userCode: this.state.userInfo.userCode,
                userName: this.state.userInfo.userName
            }
        });
    }

    onChangeUserPass(event) {
        let password = event.target.value;
        this.setState({
            userInfo: {
                userTele: this.state.userInfo.userTele,
                userPass: password,
                userCode: this.state.userInfo.userCode,
                userName: this.state.userInfo.userName
            }
        });
    }

    onChangeUserCode(event) {
        let code = event.target.value;
        this.setState({
            userInfo: {
                userTele: this.state.userInfo.userTele,
                userPass: this.state.userInfo.userPass,
                userCode: code,
                userName: this.state.userInfo.userName
            }
        })
    }

    onChangeUserName(event) {
        let name = event.target.value;
        this.setState({
            userInfo: {
                userTele: this.state.userInfo.userTele,
                userPass: this.state.userInfo.userPass,
                userCode: this.state.userInfo.userCode,
                userName: name
            }
        })
    }

    openLoginModal() {
        this.setState({
            loginLabel: '',
            registerLabel: '',
            showLoginModal: true,
            showRegisterModal: false,
            isRegister: false,
            userInfo: {
                userTele: '',
                userPass: '',
                userCode: '',
                userName: ''
            }
        })
    }

    openRegisterModal() {
        this.setState({
            loginLabel: '',
            registerLabel: '',
            showRegisterModal: true,
            showLoginModal: false,
            isRegister: true,
            userInfo: {
                userTele: '',
                userPass: '',
                userCode: '',
                userName: ''
            }
        })
    }

    closeLoginModal() {
        this.setState({
            loginLabel: '',
            registerLabel: '',
            showLoginModal: false,
            isRegister: false,
            userInfo: {
                userTele: '',
                userPass: '',
                userCode: '',
                userName: ''
            }
        })

    }

    closeRegisterModal() {
        this.setState({
            loginLabel: '',
            registerLabel: '',
            showRegisterModal: false,
            isRegister: false,
            userInfo: {
                userTele: '',
                userPass: '',
                userCode: '',
                userName: ''
            }
        })
    }

    userLogin() {
        this.setState({
            isRegister: false
        });
        // console.log(this.state.isRegister);
        // console.log(this.state.userInfo.userTele);
        // console.log(this.state.userInfo.userPass);
        // Ajax - Fetch API
        // 调用后端接口，验证登录是否正确，正确转myPage
        fetch("/api/user/login", {
            method: "POST",
            headers: {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'userTele': this.state.userInfo.userTele,
                'password': this.state.userInfo.userPass
            })
            // JSON.stringify序列化
        }).then(function (response) {
            return response.json()
        }).then((json) => {
            console.log('parsed json', json)
            if (json.status === 0) {
                this.setState({
                    loginLabel: ''
                });
                let token = json.result.token;
                localStorage.setItem("token", token);
                console.log(localStorage.getItem("token"));
                let userTele = json.result.userTele;
                localStorage.setItem("userTele", userTele);
                console.log(localStorage.getItem("userTele"));
                let userName = json.result.userName;
                localStorage.setItem("userName", userName);
                console.log(localStorage.getItem("userName"));
                window.location.href = '/myPage';
            }
            else {
                this.setState({
                    loginLabel: "手机号或密码错误"
                    // 不能用function,this不是一个this,用()=>()
                    // https://stackoverflow.com/questions/39138974/react-typeerror-cannot-read-property-setstate-of-undefined
                });
                // console.log("用户名或密码错误");
            }
        }).catch(function (ex) {
            console.log('parsing failed', ex)
        })
    }

    userRegister() {
        this.setState({
            isRegister: true
        });
        fetch("/api/user/register", {
            method: "POST",
            headers: {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'userTele': this.state.userInfo.userTele,
                'password': this.state.userInfo.userPass,
                'nickName': this.state.userInfo.userName
            })
            // JSON.stringify序列化
        }).then(function (response) {
            return response.json()
        }).then((json) => {
            console.log('parsed json', json)
            if (json.status === 0) {
                this.setState({
                    registerLabel: ''
                });
                let token = json.result.token;
                localStorage.setItem("token", token);
                console.log(localStorage.getItem("token"));
                let userTele = json.result.userTele;
                localStorage.setItem("userTele", userTele);
                console.log(localStorage.getItem("userTele"));
                let userName = json.result.userName;
                localStorage.setItem("userName", userName);
                console.log(localStorage.getItem("userName"));
                window.location.href = '/myPage';
            }
            else {
                this.setState({
                    registerLabel: json.result.errorMessage
                });
            }
        }).catch(function (ex) {
            console.log('parsing failed', ex)
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
                        <LoginForm onChangeUserTele={this.onChangeUserTele.bind(this)}
                                   onChangeUserPass={this.onChangeUserPass.bind(this)}
                                   userTele={this.state.userInfo.userTele} userPass={this.state.userInfo.userPass}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Label bsStyle="warning">{this.state.loginLabel}</Label>
                        {'   '}
                        <Button onClick={this.openRegisterModal.bind(this)}>还未注册?</Button>
                        <Button onClick={this.userLogin.bind(this)} bsStyle="info">登录</Button>
                    </Modal.Footer>
                </Modal>
                <Modal className="RegisterModal" show={this.state.showRegisterModal}
                       onHide={this.closeRegisterModal.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>注册</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <RegisterForm onChangeUserTele={this.onChangeUserTele.bind(this)}
                                      onChangeUserPass={this.onChangeUserPass.bind(this)}
                                      onChangeUserCode={this.onChangeUserCode.bind(this)}
                                      onChangeUserName={this.onChangeUserName.bind(this)}
                                      userTele={this.state.userInfo.userTele} userPass={this.state.userInfo.userPass}
                                      userCode={this.state.userInfo.userCode} userName={this.state.userInfo.userName}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Label bsStyle="warning">{this.state.registerLabel}</Label>
                        {'   '}
                        <Button onClick={this.openLoginModal.bind(this)}>已有账号?</Button>
                        <Button onClick={this.userRegister.bind(this)} bsStyle="info">注册</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default IndexBody;