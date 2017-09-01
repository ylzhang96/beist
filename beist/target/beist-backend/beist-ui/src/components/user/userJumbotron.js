import React, {Component} from 'react';
import {Button, Col, Grid, Jumbotron, Row} from "react-bootstrap";

class UserJumbotron extends Component {
    render() {
        return (
            <div>
                <Jumbotron>
                    <Grid className="text-center">
                        <Row className="padTop2Class padBot2Class text-center">
                            <h2>用户信息</h2>
                        </Row>
                        <Row className="padTop2Class">
                            <Col sm={6}>
                                <h4>水平测试</h4>
                            </Col>
                            <Col sm={6}>
                                <h4>六级</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <h4>目标难度</h4>
                            </Col>
                            <Col sm={6}>
                                <h4>托福</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <h4>已背天数</h4>
                            </Col>
                            <Col sm={6}>
                                <h4>25 天</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <h4>总共需背</h4>
                            </Col>
                            <Col sm={6}>
                                <h4>2000 个</h4>
                            </Col>
                        </Row>
                        <Row className="padBot2Class padTop3Class">
                            <div className="padTop10Class"><Button bsStyle="info" href="/settings" block>去设置</Button></div>
                        </Row>
                    </Grid>
                </Jumbotron>
            </div>
        );
    }
}

export default UserJumbotron;