import React, {Component} from 'react';
import {Button, Col, Grid, Jumbotron, Row} from "react-bootstrap";

class ArticleJumbotron extends Component {
    render() {
        return (
            <div>
                <Jumbotron>
                    <Grid className="text-center">
                        <Row className="padTop2Class padBot2Class text-center">
                            <h2>文章</h2>
                        </Row>
                        <Row className="padTop3Class">
                            <Col sm={6}>
                                <h4>今日已读</h4>
                            </Col>
                            <Col sm={6}>
                                <h4>2 篇</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <h4>待读文章</h4>
                            </Col>
                            <Col sm={6}>
                                <h4>12 篇</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <h4>总共已读</h4>
                            </Col>
                            <Col sm={6}>
                                <h4>145 篇</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <h4>阅读进度</h4>
                            </Col>
                            <Col sm={6}>
                                <h4>15 %</h4>
                            </Col>
                        </Row>
                        <Row className="padBot2Class padTop3Class">
                            <div className="padTop10Class"><Button bsStyle="info" block href="/article">读文章</Button></div>
                        </Row>
                    </Grid>
                </Jumbotron>
            </div>
        );
    }
}

export default ArticleJumbotron;