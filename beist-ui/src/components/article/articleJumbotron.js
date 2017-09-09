import React, {Component} from 'react';
import {Button, Col, Grid, Jumbotron, Row} from "react-bootstrap";

class ArticleJumbotron extends Component {

    constructor() {
        super();
        this.state = {
            wordRemindingNum :0,
            preparingNum : 0,
            hasReadNum:0,
            rate:0
        }

    }

    componentWillMount() {
        fetch("/api/article/countArticle", {
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
                    wordRemindingNum : json.result.wordRemindingNum,
                    preparingNum : json.result.preparingNum,
                    hasReadNum:json.result.hasReadNum,
                    rate:json.result.rate
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
                            <h2>文章</h2>
                        </Row>
                        <Row className="padTop2Class">
                            <Col sm={6}>
                                <h4>熟悉单词</h4>
                            </Col>
                            <Col sm={6}>
                                <h4>{this.state.wordRemindingNum} 篇</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <h4>准备阅读</h4>
                            </Col>
                            <Col sm={6}>
                                <h4>{this.state.preparingNum} 篇</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <h4>已经阅读</h4>
                            </Col>
                            <Col sm={6}>
                                <h4>{this.state.hasReadNum} 篇</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <h4>阅读进度</h4>
                            </Col>
                            <Col sm={6}>
                                <h4>{this.state.rate} %</h4>
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