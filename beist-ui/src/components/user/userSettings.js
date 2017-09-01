import React, {Component} from 'react';
import {
    Button, Col, ControlLabel, Form, FormControl, FormGroup, Grid, Image, Jumbotron, Label, Modal, Row, Tab,
    Tabs
} from "react-bootstrap";
import Icon from '../../images/41.jpg';

class UserSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userPhoto: {Icon},
            userTele: '17301649176',
            userPass: '17301649176',
            userNickName: 'Caroline',
            changeNickNameButton: '修改',
        isDisabledChangeNickName: true
    }
    }

    onChangeNickName() {
        if(this.state.changeNickNameButton === '修改') {
            this.setState({
                isDisabledChangeNickName: false,
                changeNickNameButton: '确认'
            });
        }
        else {
            // 数据库修改
            this.setState({
                isDisabledChangeNickName: true,
                changeNickNameButton: '修改'
            });
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
                                <div className="text-center" ><Image src={Icon} circle/></div>
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
                                <FormControl type="text" placeholder={this.state.userNickName}
                                             disabled={this.state.isDisabledChangeNickName}/>
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
                                    this.state.userTele[0]+this.state.userTele[1]+
                                    this.state.userTele[2]+'****'+this.state.userTele[7]+
                                    this.state.userTele[8]+this.state.userTele[9]+
                                    this.state.userTele[10]} disabled/>
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