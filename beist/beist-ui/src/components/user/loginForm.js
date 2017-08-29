import React, { Component } from 'react';
import {Col, ControlLabel, Form, FormControl, FormGroup} from "react-bootstrap";

class LoginForm extends Component {

    render() {
        return (
            <Form horizontal>
                <FormGroup controlId="formHorizontalTele">
                    <Col componentClass={ControlLabel} sm={3}>
                        手机号
                    </Col>
                    <Col sm={8}>
                        <FormControl type="text" placeholder="手机号" onChange={this.props.onChangeUserTele}/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} sm={3}>
                        密码
                    </Col>
                    <Col sm={8}>
                        <FormControl type="password" placeholder="密码" onChange={this.props.onChangeUserPass}/>
                    </Col>
                </FormGroup>

                {/*<FormGroup>*/}
                    {/*<Col smOffset={2} sm={10}>*/}
                        {/*<Checkbox>记住我</Checkbox>*/}
                    {/*</Col>*/}
                {/*</FormGroup>*/}

                {/*<FormGroup>*/}
                    {/*<Col smOffset={2} sm={10}>*/}
                        {/*<Button type="submit">*/}
                            {/*登录*/}
                        {/*</Button>*/}
                    {/*</Col>*/}
                {/*</FormGroup>*/}
            </Form>
        );
    }
}

export default LoginForm;