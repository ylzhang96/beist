import React, {Component} from 'react';
import '../styles/css/style.css';
import { Col, Grid, Row} from 'react-bootstrap';    // import bootstrap framework

class IndexFooter extends Component {

    render() {
        return (
            <div className="padTop3Class">
                <div className="container panel-footer indexFooter">
                    <Grid className="">
                        <Row>
                            <Col sm={6} md={4}>
                                <h4>帮助</h4>
                            </Col>
                            <Col sm={6} md={4}>
                                <h4>关于</h4>
                            </Col>
                            <Col sm={12} md={4}>
                                <h4>手机端下载</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6} md={4}>
                                <p>简介</p>
                            </Col>
                            <Col sm={6} md={4}>
                                <p>版本信息</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6} md={4}>
                                <p>如何使用</p>
                            </Col>
                            <Col sm={6} md={4}>
                                <p>关于我们</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6} md={4}>
                            </Col>
                            <Col sm={6} md={4}>
                                <p>联系我们</p>
                            </Col>
                        </Row>
                    </Grid>
                    <div className="padTop2Class">
                        <p>Copyright © 张艳丽 金昳昀 王琳琳 朱寒燕 All rights reserved.</p>
                    </div>

                </div>
            </div>
        );
    }
}

export default IndexFooter;