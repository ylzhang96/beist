import React, {Component} from 'react';
import {Button, Col, Grid, Jumbotron, Modal, Row} from "react-bootstrap";

class WordBody extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showWordModal: false,
            showWordDetailModal: false,
            unKnownText: '不认识',
            wordInfo: {
                word: 'orchestra',
                wordShowDetailNum: 0,
                wordDetailList: ['Young conductors earn their spurs in a small orchestra or opera house.',
                    'n. 管弦乐队'],
                wordHint0: '',
                wordHint1: '',
            }
        }
    }

    openWordModal() {
        this.setState({
            showWordModal: true,
            showWordDetailModal: false
        })
    }

    openWordDetailModal() {
        this.setState({
            showWordModal: false,
            showWordDetailModal: true
        })
    }

    closeWordModal() {
        this.setState({
            showWordModal: false
        })
    }

    closeWordDetailModal() {
        this.setState({
            showWordDetailModal: false
        })
    }

    wordKnow() {
        this.openWordDetailModal();
    }

    wordUnknown() {
        let num = this.state.wordInfo.wordShowDetailNum;
        if (num === 0) {
            this.setState({
                wordInfo: {
                    word: this.state.wordInfo.word,
                    wordHint0: '例句:  ' + this.state.wordInfo.wordDetailList[0],
                    wordHint1: '',
                    wordShowDetailNum: num + 1,
                    wordDetailList: this.state.wordInfo.wordDetailList,
                }
            })
        }
        else if(num === 1) {
            this.setState({
                wordInfo: {
                    word: this.state.wordInfo.word,
                    wordHint0: '例句:  ' + this.state.wordInfo.wordDetailList[0],
                    wordHint1: '中文解释:  ' + this.state.wordInfo.wordDetailList[1],
                    wordShowDetailNum: num + 1,
                    wordDetailList: this.state.wordInfo.wordDetailList
                },
            });
            this.setState({
                unKnownText: '查看详情'
            })
        }
        else if(num === 2) {
            this.openWordDetailModal();
        }
    }

    nextWord() {
        // 改熟悉度
        // 获取下一个单词
    }

    exitKnow() {
        // 改熟悉度
        // 获取下一个单词

    }

    render() {
        return (
            <div>
                <div className="container">
                    <Jumbotron>
                        <Grid className="text-center">
                            <Row className="padTop3Class padBot2Class text-center">
                                <h2>单词</h2>
                            </Row>
                            <Row className="padTop2Class">
                                <Col sm={3}>
                                    <h4>今日已背</h4>
                                </Col>
                                <Col sm={3}>
                                    <h4>20 个</h4>
                                </Col>
                                <Col sm={3}>
                                    <h4>今日需背</h4>
                                </Col>
                                <Col sm={3}>
                                    <h4>100 个</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={3}>
                                    <h4>总共已背</h4>
                                </Col>
                                <Col sm={3}>
                                    <h4>1000 个</h4>
                                </Col>
                                <Col sm={3}>
                                    <h4>背诵进度</h4>
                                </Col>
                                <Col sm={3}>
                                    <h4>15 %</h4>
                                </Col>
                            </Row>
                            <Row className="padBot2Class padTop3Class">
                                <div className="padLef30Class padRig30Class">
                                    <Button bsStyle="info" onClick={this.openWordModal.bind(this)} block>背单词</Button>
                                </div>
                            </Row>
                        </Grid>
                    </Jumbotron>
                </div>

                <Modal className="WordModal" show={this.state.showWordModal} onHide={this.closeWordModal.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title><h1 className="text-center">{this.state.wordInfo.word}</h1></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h3>{this.state.wordInfo.wordHint0}</h3>
                        <h3 className="padTop5Class">{this.state.wordInfo.wordHint1}</h3>
                    </Modal.Body>
                    <Modal.Footer className="padLef30Class padRig30Class">
                        <Button bsStyle="info" block onClick={this.wordKnow.bind(this)}>认识</Button>
                        <Button block onClick={this.wordUnknown.bind(this)}>{this.state.unKnownText}</Button>
                    </Modal.Footer>
                </Modal>

                <Modal className="WordDetailModal" show={this.state.showWordDetailModal}
                       onHide={this.closeWordDetailModal.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title><h1 className="text-center">{this.state.wordInfo.word}</h1></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h3>{this.state.wordInfo.wordHint0}</h3>
                        <h3 className="padTop5Class">{this.state.wordInfo.wordHint1}</h3>
                    </Modal.Body>
                    <Modal.Footer className="padLef30Class padRig30Class">
                        <Button bsStyle="info" block onClick={this.exitKnow.bind(this)}>撤销认识</Button>
                        <Button block onclick={this.nextWord.bind(this)}>下一个</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default WordBody;