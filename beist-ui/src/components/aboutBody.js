import React, {Component} from 'react';
import {
    Tab, Col, Nav,
    NavItem, Row
} from "react-bootstrap";

class AboutBody extends Component {
    render() {
        return (
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row className="clearfix">
                    <Col sm={1}>
                        <Nav bsStyle="pills" stacked>
                            <NavItem eventKey="first">
                                帮助
                            </NavItem>
                            <NavItem eventKey="second">
                                关于
                            </NavItem>
                        </Nav>
                    </Col>
                    <Col sm={11}>
                        <Tab.Content animation>
                            <Tab.Pane eventKey="first">
                                帮助<Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                <Row className="clearfix">
                                    <Col sm={2}>
                                        <Nav bsStyle="pills" stacked>
                                            <NavItem eventKey="first">
                                                简介
                                            </NavItem>
                                            <NavItem eventKey="second">
                                                如何使用
                                            </NavItem>
                                        </Nav>
                                    </Col>
                                    <Col sm={10}>
                                        <Tab.Content animation>
                                            <Tab.Pane eventKey="first">
                                                Tab 1 content
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="second">
                                                Tab 2 content
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Col>
                                </Row>
                            </Tab.Container>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                关于<Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                <Row className="clearfix">
                                    <Col sm={2}>
                                        <Nav bsStyle="pills" stacked>
                                            <NavItem eventKey="first">
                                                版本信息
                                            </NavItem>
                                            <NavItem eventKey="second">
                                                关于我们
                                            </NavItem>
                                            <NavItem eventKey="third">
                                                联系我们
                                            </NavItem>
                                        </Nav>
                                    </Col>
                                    <Col sm={10}>
                                        <Tab.Content animation>
                                            <Tab.Pane eventKey="first">
                                                Tab 1 content
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="second">
                                                Tab 2 content
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="third">
                                                Tab 3 content
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Col>
                                </Row>
                            </Tab.Container>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        );
    }
}

export default AboutBody;