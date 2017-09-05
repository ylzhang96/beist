import React, {Component} from 'react';
import {Button, Col, Grid, Jumbotron, Row} from "react-bootstrap";

class UserJumbotron extends Component {
    constructor(props){
        super(props);
        this.state = {
            nowRange: '',
            nowLevel: '',
            nowPlanWordNumber: ''
        }
    }

    componentWillMount() {
        fetch("/api/user/findRangeAndLevel", {
            method: "POST",
            headers: {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json',
                'token': localStorage.getItem("token"),
                'userTele': localStorage.getItem("userTele")
            }
        }).then(function (response) {
            return response.json()
        }).then((json) => {
            console.log('parsed json', json)
            if (json.status === 0) {
                this.setState({
                    nowRange: json.result.userRange,
                    nowLevel: json.result.userLevel,
                    nowPlanWordNumber: json.result.userPlanWordNumber,
                });
            } else {
                // let errorMessage = json.result.errorMessage;
                // alert(errorMessage);
            }
        }).catch(function (ex) {
            console.log('parsing failed', ex)
        })
    }


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
                                <h4>{this.state.nowLevel}</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <h4>目标难度</h4>
                            </Col>
                            <Col sm={6}>
                                <h4>{this.state.nowRange}</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <h4>已背天数</h4>
                            </Col>
                            <Col sm={6}>
                                <h4>0 天</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <h4>总共需背</h4>
                            </Col>
                            <Col sm={6}>
                                <h4>{this.state.nowPlanWordNumber + ' 个'}</h4>
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