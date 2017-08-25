import React, { Component } from 'react';
import {Button, Checkbox, Col, ControlLabel, Form, FormControl, FormGroup} from "react-bootstrap";

class LoginForm extends Component {
    render() {
        return (
            <Form horizontal>
                <FormGroup controlId="formHorizontalTele">
                    <Col componentClass={ControlLabel} sm={2}>
                        手机号
                    </Col>
                    <Col sm={10}>
                        <FormControl type="text" placeholder="手机号" />
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} sm={2}>
                        密码
                    </Col>
                    <Col sm={10}>
                        <FormControl type="password" placeholder="Password" />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Checkbox>Remember me</Checkbox>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button type="submit">
                            登录
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default LoginForm;