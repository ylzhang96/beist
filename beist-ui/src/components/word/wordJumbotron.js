import React, {Component} from 'react';
import {Button, Col, Grid, Jumbotron, Row} from "react-bootstrap";

class WordJumbotron extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userPlanWordCount : 0,
            allUserWordCount: 0,
            todayUserWordCount : 0,
            todayUserHasCount: 0,
            rate : 0
        }
    }

    componentWillMount() {
        fetch("/api/user/findWordNum", {
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
                    userPlanWordCount : json.userPlanWordCount,
                    allUserWordCount: json.result.allUserWordCount,
                    todayUserWordCount : json.result.todayUserWordCount,
                    todayUserHasCount: json.result.todayUserHasCount,
                    rate : json.result.rate
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
                            <h2>单词</h2>
                        </Row>
                        <Row className="padTop2Class">
                            <Col sm={6}>
                                <h4>今日已背</h4>
                            </Col>
                            <Col sm={6}>
                                <h4>{this.state.todayUserHasCount} 个</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <h4>今日需背</h4>
                            </Col>
                            <Col sm={6}>
                                <h4>{this.state.todayUserWordCount} 个</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <h4>总共已背</h4>
                            </Col>
                            <Col sm={6}>
                                <h4>{this.state.allUserWordCount} 个</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <h4>背诵进度</h4>
                            </Col>
                            <Col sm={6}>
                                <h4>{this.state.rate} %</h4>
                            </Col>
                        </Row>
                        <Row className="padBot2Class padTop3Class">
                            <div className="padTop10Class"><Button bsStyle="info" block href="/word">背单词</Button></div>
                        </Row>
                    </Grid>
                </Jumbotron>
            </div>
        );
    }
}

export default WordJumbotron;