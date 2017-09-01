import React, {Component} from 'react';
import {Button, Col, Grid, Jumbotron, Row} from "react-bootstrap";

class WordJumbotron extends Component {
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
                                <h4>20 个</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <h4>今日需背</h4>
                            </Col>
                            <Col sm={6}>
                                <h4>100 个</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <h4>总共已背</h4>
                            </Col>
                            <Col sm={6}>
                                <h4>1000 个</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <h4>背诵进度</h4>
                            </Col>
                            <Col sm={6}>
                                <h4>15 %</h4>
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