import React, {Component} from 'react';
import '../styles/css/style.css';
import {Button, ButtonToolbar, Col, Grid, Image, Row} from 'react-bootstrap';    // import bootstrap framework
import BeistLogo from '../images/sk.JPG';

class IndexBody extends Component {

    render() {
        return (
            <div className="container">
                <Grid className="padTop10Class padBot3Class">
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
                                        <Button bsStyle="info" href="/login" block>登录</Button>
                                    </Col>
                                    <Col sm={12} md={6}>
                                        <Button bsStyle="info" href="/register" block>注册</Button>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default IndexBody;