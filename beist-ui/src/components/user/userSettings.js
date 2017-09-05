import React, {Component} from 'react';
import {
    Button, Col, ControlLabel, Form, FormControl, FormGroup, Image, Row} from "react-bootstrap";
import Icon from '../../images/41.jpg';

class UserSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userPhoto: {Icon},
            userTele: '',
            userPass: '',
            userNickName: '',
            changeNickNameButton: '修改',
            isDisabledChangeNickName: true
        }
    }

    onChangeUserName(event) {
        let name = event.target.value;
        this.setState({
            userNickName: name
        })
    }

    onChangeNickName() {
        if (this.state.changeNickNameButton === '修改') {
            this.setState({
                isDisabledChangeNickName: false,
                changeNickNameButton: '确认',
                userNickName: ''
            });
        }
        else if (this.state.changeNickNameButton === '确认') {
            // 数据库修改
            fetch("/api/user/modifyNickName", {
                method: "POST",
                headers: {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem("token")
                },
                body: JSON.stringify({
                    'userTele': localStorage.getItem("userTele"),
                    'nickName': this.state.userNickName
                })
                // JSON.stringify序列化
            }).then(function (response) {
                return response.json()
            }).then((json) => {
                console.log('parsed json', json)
                if (json.status === 0) {
                    let userName = json.result.nickName;
                    localStorage.setItem("userName", userName);
                    console.log(localStorage.getItem("userName"));
                    this.setState({
                        userNickName: localStorage.getItem("userName"),
                        isDisabledChangeNickName: true,
                        changeNickNameButton: '修改'
                    });
                    window.location.href = '/settings';
                }
                else {
                    let errorMessage = json.result.errorMessage;
                    alert(errorMessage);
                    this.setState({
                        userNickName: localStorage.getItem("userName"),
                        isDisabledChangeNickName: true,
                        changeNickNameButton: '修改'
                    });
                    if(errorMessage === '您没有权限，请登录') {
                        window.location.href='/';
                    }
                }
            }).catch(function (ex) {
                console.log('parsing failed', ex)
            })
        }
    }

    render() {
        return (
            <div>
                <Form horizontal>
                    <FormGroup controlId="userPhotoSettings">
                        <Row>
                            <Col componentClass={ControlLabel} sm={1}>
                                头像
                            </Col>
                            <Col sm={4}>
                                <div className="text-center"><Image src={Icon} circle/></div>
                            </Col>
                            <Col sm={3}>
                                <Button bsStyle="info"
                                >修改</Button>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup controlId="userNickNameSettings">
                        <Row>
                            <Col componentClass={ControlLabel} sm={1}>
                                昵称
                            </Col>
                            <Col sm={4}>
                                <FormControl type="text" placeholder={localStorage.getItem("userName")}
                                             disabled={this.state.isDisabledChangeNickName}
                                             onChange={this.onChangeUserName.bind(this)}/>
                            </Col>
                            <Col sm={3}>
                                <Button bsStyle="info"
                                        onClick={this.onChangeNickName.bind(this)}>{this.state.changeNickNameButton}</Button>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup controlId="userTeleSettings">
                        <Row>
                            <Col componentClass={ControlLabel} sm={1}>
                                手机号
                            </Col>
                            <Col sm={4}>
                                <FormControl type="text" placeholder={
                                    localStorage.getItem('userTele')[0] + localStorage.getItem('userTele')[1] +
                                    localStorage.getItem('userTele')[2] + '****' + localStorage.getItem('userTele')[7] +
                                    localStorage.getItem('userTele')[8] + localStorage.getItem('userTele')[9] +
                                    localStorage.getItem('userTele')[10]} disabled/>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup controlId="userPassSettings">
                        <Row>
                            <Col componentClass={ControlLabel} sm={1}>
                                密码
                            </Col>
                            <Col sm={4}>
                                <FormControl type="password" placeholder='********' disabled/>
                            </Col>
                        </Row>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default UserSettings;