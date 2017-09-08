import React, {Component} from 'react';
import {Button, Col, Grid, Jumbotron, Modal, Row} from "react-bootstrap";

class WordBody extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showWordModal: false,
            showWordDetailModal: false,
            unKnownText: '不认识',
            wordIdList: [],
            wordInfo: {
                wordId: '',
                word: '',
                wordPhonetic: '',
                wordExample: '',
                wordMeaning: '',
                wordMeaningCn: '',
            },
            showWordInfo: {
                wordExample: '',
                wordMeaning: '',
                wordMeaningCn: '',
                wordShowDetailNum: 0
            },
            wordNum: 0,
            wordNumPerDay: 10,
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

    openWordModal(number) {
        // console.log(this.state.wordIdList[number]);
        this.getWordByWordId(number);
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
            showWordModal: false,
            wordNum: -1,
        })
    }

    closeWordDetailModal() {
        this.setState({
            showWordDetailModal: false,
            wordNum: -1,
        })
    }

    wordKnow() {
        let num = this.state.showWordInfo.wordShowDetailNum;
        if (num === 0) {
            // 加熟练度
        }
        this.openWordDetailModal();
    }

    getwordList() {
        fetch("/api/word/getWordList", {
            method: "POST",
            headers: {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json',
                'userTele': localStorage.getItem("userTele"),
                'token': localStorage.getItem("token")
            }
        }).then(function (response) {
            return response.json()
        }).then((json) => {
            console.log('parsed json', json)
            if (json.status > 0) {
                let wordNumPerDay = json.status;
                for (let i = 0; i < wordNumPerDay; i++) {
                    this.setState({
                        wordNumPerDay: json.status,
                        wordIdList: this.state.wordIdList.concat(json.result.wordList[i]),
                        wordNum: 0
                    })
                }
                this.openWordModal(0);
            }
            else {
                let errorMessage = json.message;
                alert(errorMessage);
                if (errorMessage === '您没有权限，请登录') {
                    window.location.href = '/';
                }
            }
        }).catch(function (ex) {
            console.log('parsing failed', ex)
        })
    }

    getWordByWordId(number) {
        // console.log(this.state.wordNum);
        fetch("/api/word/getWordByWordId", {
            method: "POST",
            headers: {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/x-www-form-urlencoded',
                'userTele': localStorage.getItem("userTele"),
                'token': localStorage.getItem("token"),
                'wordId': this.state.wordIdList[number]
            }
        }).then(function (response) {
            return response.json()
        }).then((json) => {
            console.log('parsed json', json)
            if (json.status === 0) {
                this.setState({
                    wordInfo: {
                        wordId: this.state.wordIdList[number],
                        word: json.result.word,
                        wordPhonetic: json.result.wordPhonetic,
                        wordExample: '例句:  ' + json.result.wordExample,
                        wordMeaning: '英文解释： ' + json.result.wordMeaning,
                        wordMeaningCn: '中文解释: ' + json.result.wordMeaningCn
                    },
                    showWordInfo: {
                        wordExample: '',
                        wordMeaning: '',
                        wordMeaningCn: '',
                        wordShowDetailNum: 0
                    },
                    unKnownText: '不认识'
                })
            }
            else {
                let errorMessage = json.message;
                alert(errorMessage);
                if (errorMessage === '您没有权限，请登录') {
                    window.location.href = '/';
                }
            }
        }).catch(function (ex) {
            console.log('parsing failed', ex)
        })
    }

    wordUnknown() {
        let num = this.state.showWordInfo.wordShowDetailNum;
        // console.log(num);
        if (num === 0) {
            this.setState({
                showWordInfo: {
                    wordExample: this.state.wordInfo.wordExample,
                    wordMeaning: '',
                    wordMeaningCn: '',
                    wordShowDetailNum: num + 1
                }
            })
        }
        else if (num === 1) {
            this.setState({
                showWordInfo: {
                    wordExample: this.state.wordInfo.wordExample,
                    wordMeaning: this.state.wordInfo.wordMeaning,
                    wordMeaningCn: '',
                    wordShowDetailNum: num + 1
                }
            });
        }
        else if (num === 2) {
            this.setState({
                showWordInfo: {
                    wordExample: this.state.wordInfo.wordExample,
                    wordMeaning: this.state.wordInfo.wordMeaning,
                    wordMeaningCn: this.state.wordInfo.wordMeaningCn,
                    wordShowDetailNum: num + 1
                }
            });
            this.setState({
                unKnownText: '查看详情'
            })
        }
        else if (num === 3) {
            this.openWordDetailModal();
        }
    }

    nextWord() {
        if (this.state.showWordInfo.wordShowDetailNum === 0) {
            // 改熟悉度
            fetch("/api/word/updateWordProficiency", {
                method: "POST",
                headers: {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'wordId': this.state.wordInfo.wordId,
                    'userTele': localStorage.getItem("userTele"),
                    'token': localStorage.getItem("token")
                }
            }).then(function (response) {
                return response.json()
            }).then((json) => {
                console.log('parsed json', json)
                if (json.status === 0) {
                    // https://segmentfault.com/q/1010000002992310
                    this.setState({
                        wordIdList: this.state.wordIdList.filter(item => item !== json.result.wordId)
                    });
                    // console.log("hhh")
                }
                else {
                    let errorMessage = json.message;
                    alert(errorMessage);
                    if (errorMessage === '您没有权限，请登录') {
                        window.location.href = '/';
                    }
                }
            }).catch(function (ex) {
                console.log('parsing failed', ex)
            });
        }

        console.log(this.state.wordIdList);
        // console.log(this.state.wordIdList.length);
        let number = Math.floor(Math.random() * this.state.wordIdList.length)
        console.log(number);
        this.openWordModal(number);
    }

    exitKnow() {
        let number = Math.floor(Math.random() * this.state.wordIdList.length)
        this.openWordModal(number);
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
                                    <h4>{this.state.todayUserHasCount} 个</h4>
                                </Col>
                                <Col sm={3}>
                                    <h4>今日需背</h4>
                                </Col>
                                <Col sm={3}>
                                    <h4>{this.state.todayUserWordCount} 个</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={3}>
                                    <h4>总共已背</h4>
                                </Col>
                                <Col sm={3}>
                                    <h4>{this.state.allUserWordCount} 个</h4>
                                </Col>
                                <Col sm={3}>
                                    <h4>背诵进度</h4>
                                </Col>
                                <Col sm={3}>
                                    <h4>{this.state.rate} %</h4>
                                </Col>
                            </Row>
                            <Row className="padBot2Class padTop3Class">
                                <div className="padLef30Class padRig30Class">
                                    <Button bsStyle="info" onClick={this.getwordList.bind(this)} block>背单词</Button>
                                </div>
                            </Row>
                        </Grid>
                    </Jumbotron>
                </div>

                <Modal className="WordModal" show={this.state.showWordModal} onHide={this.closeWordModal.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h1 className="text-center">
                                <h1>{this.state.wordInfo.word}</h1>
                                <h4>{this.state.wordInfo.wordPhonetic}</h4>
                            </h1>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>{this.state.showWordInfo.wordExample}</h4>
                        <h4 className="padTop5Class">{this.state.showWordInfo.wordMeaning}</h4>
                        <h4 className="padTop5Class">{this.state.showWordInfo.wordMeaningCn}</h4>
                    </Modal.Body>
                    <Modal.Footer className="padLef30Class padRig30Class">
                        <Button bsStyle="info" block onClick={this.wordKnow.bind(this)}>认识</Button>
                        <Button block onClick={this.wordUnknown.bind(this)}>{this.state.unKnownText}</Button>
                    </Modal.Footer>
                </Modal>

                <Modal className="WordDetailModal" show={this.state.showWordDetailModal}
                       onHide={this.closeWordDetailModal.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <div className="text-center">
                                <h1>{this.state.wordInfo.word}</h1>
                                <h4>{this.state.wordInfo.wordPhonetic}</h4>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>{this.state.wordInfo.wordExample}</h4>
                        <h4 className="padTop5Class">{this.state.wordInfo.wordMeaning}</h4>
                        <h4 className="padTop5Class">{this.state.wordInfo.wordMeaningCn}</h4>
                    </Modal.Body>
                    <Modal.Footer className="padLef30Class padRig30Class">
                        <Button bsStyle="info" block onClick={this.exitKnow.bind(this)}>撤销认识</Button>
                        <Button block onClick={this.nextWord.bind(this)}>下一个</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default WordBody;