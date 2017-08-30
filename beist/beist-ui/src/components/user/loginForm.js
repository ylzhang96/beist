import React, { Component } from 'react';
import {Col, ControlLabel, Form, FormControl, FormGroup, HelpBlock} from "react-bootstrap";

class LoginForm extends Component {


    // 欠缺校验

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

            </Form>
        );
    }
}

export default LoginForm;