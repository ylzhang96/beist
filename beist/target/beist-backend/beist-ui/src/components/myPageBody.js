import React, {Component} from 'react';
import {
    Row, Grid, Col
} from "react-bootstrap";
import WordJumbotron from "./word/wordJumbotron";
import ArticleJumbotron from "./article/articleJumbotron";
import UserJumbotron from "./user/userJumbotron";

class MyPageBody extends Component {
    render() {
        return (
            <div>
            <Grid>
                <Row className="show-grid">
                    <Col sm={12} md={4}>
                        <WordJumbotron/>
                    </Col>
                    <Col sm={12} md={4}>
                        <ArticleJumbotron/>
                    </Col>
                    <Col sm={12} md={4}>
                        <UserJumbotron/>
                    </Col>
                </Row>
            </Grid>
            </div>
        );
    }
}

export default MyPageBody;