import React, {Component} from 'react';
import '../styles/css/style.css';
import {Button, Col, Grid, Modal, Row} from 'react-bootstrap';    // import bootstrap framework

class IndexFooter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showBriefModal : false,
            showGuideModal : false,
            showVersionModal : false,
            showAboutUsModal : false,
            showContactUsModal: false
        }
    }

    close() {
        this.setState({
            showBriefModal : false,
            showGuideModal : false,
            showVersionModal : false,
            showAboutUsModal : false,
            showContactUsModal: false
        })
    }

    openBrief() {
        this.setState({
            showBriefModal : true,
            showGuideModal : false,
            showVersionModal : false,
            showAboutUsModal : false,
            showContactUsModal: false
        })
    }

    openGuide() {
        this.setState({
            showBriefModal : false,
            showGuideModal : true,
            showVersionModal : false,
            showAboutUsModal : false,
            showContactUsModal: false
        })
    }

    openVersion() {
        this.setState({
            showBriefModal : false,
            showGuideModal : false,
            showVersionModal : true,
            showAboutUsModal : false,
            showContactUsModal: false
        })
    }

    openAboutUs() {
        this.setState({
            showBriefModal : false,
            showGuideModal : false,
            showVersionModal : false,
            showAboutUsModal : true,
            showContactUsModal: false
        })
    }

    openContactUs() {
        this.setState({
            showBriefModal : false,
            showGuideModal : false,
            showVersionModal : false,
            showAboutUsModal : false,
            showContactUsModal: true
        })
    }

    render() {
        return (
            <div className="padTop2Class">
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
                                <p><Button bsStyle="link" onClick={this.openBrief.bind(this)}>简介</Button></p>
                            </Col>
                            <Col sm={6} md={4}>
                                <p><Button bsStyle="link" onClick={this.openVersion.bind(this)}>版本信息</Button></p>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6} md={4}>
                                <p><Button bsStyle="link" onClick={this.openGuide.bind(this)}>如何使用</Button></p>
                            </Col>
                            <Col sm={6} md={4}>
                                <p><Button bsStyle="link" onClick={this.openAboutUs.bind(this)}>关于我们</Button></p>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6} md={4}>
                            </Col>
                            <Col sm={6} md={4}>
                                <p><Button bsStyle="link" onClick={this.openContactUs.bind(this)}>联系我们</Button></p>
                            </Col>
                        </Row>
                    </Grid>
                    <div className="padTop2Class">
                        <p>Copyright © 张艳丽 金昳昀 王琳琳 朱寒燕 All rights reserved.</p>
                    </div>

                </div>

                <Modal show={this.state.showBriefModal} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>简介</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>'Beist' 是一款基于Java语言的Web项目，提供一种新的记忆单词方法。</h4>
                        <h4 className="padTop2Class">'Beist' is a Java Web & Android Application for providing a new method of memorizing
                            English words.</h4>
                        <h4 className="padTop2Class">项目开源地址：GitHub:https://github.com/ylzhang96/beist</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close.bind(this)}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.showGuideModal} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>如何使用</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>进入主页、新用户请选择注册、老用户选择登录进入个人主页</h4>
                        <h4 className="padTop2Class">在个人主页中，您可以选择通过英文查询中文解释</h4>
                        <h4 className="padTop2Class">在个人主页中，您可以对您的昵称、背诵难度进行设置</h4>
                        <h4 className="padTop2Class">在个人主页中，您可以选择背单词或者通过阅读文章来背单词</h4>
                        <h4 className="padTop2Class">您可以进入设置中测试您的英语水平</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close.bind(this)}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.showVersionModal} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>版本信息</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Version 1.0</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close.bind(this)}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.showAboutUsModal} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>关于我们</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Beist is made By 张艳丽、金昳昀、王琳琳、朱寒燕</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close.bind(this)}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.showContactUsModal} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>联系我们</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Email: ylzhang96@163.com 张艳丽</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close.bind(this)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default IndexFooter;