import React, {Component} from 'react';
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, HelpBlock} from "react-bootstrap";

class RegisterForm extends Component {

    getValidationTelState() {
        const length = this.props.userTele.length;
        if (length === 11) return 'success';
        else if (length > 0) {
            return 'warning';
        }
        else if(length === 0) {
            return 'warning';
        }
    }

    getValidationPassState() {
        const length = this.props.userPass.length;
        if (length > 0) return 'success';
        else return 'warning';
    }

    getValidationCodeState() {
        const length = this.props.userCode.length;
        if (length === 6) return 'success';
        else return 'warning';
    }

    getUserCode() {

    }

    render() {
        return (
            <Form horizontal>
                <FormGroup controlId="formHorizontalTele" validationState={this.getValidationTelState()}>
                    <Col componentClass={ControlLabel} sm={3}>
                        手机号
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text" placeholder="手机号" onChange={this.props.onChangeUserTele}/>
                        <FormControl.Feedback />
                        <HelpBlock>{''}</HelpBlock>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword" validationState={this.getValidationPassState()}>
                    <Col componentClass={ControlLabel} sm={3}>
                        密码
                    </Col>
                    <Col sm={8}>
                        <FormControl type="password" placeholder="密码" onChange={this.props.onChangeUserPass}/>
                        <FormControl.Feedback />
                        <HelpBlock>{''}</HelpBlock>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword" validationState={this.getValidationCodeState()}>
                    <Col sm={1}>
                        {' '}
                    </Col>
                    <Col sm={3}>
                        <Button bsStyle="info" onClick={this.getUserCode.bind(this)} block>获取验证码</Button>
                    </Col>
                    <Col sm={7}>
                        <FormControl type="text" placeholder="验证码" onChange={this.props.onChangeUserCode}/>
                        <FormControl.Feedback />
                        <HelpBlock>{''}</HelpBlock>
                    </Col>

                </FormGroup>

            </Form>
        );
    }
}

export default RegisterForm;