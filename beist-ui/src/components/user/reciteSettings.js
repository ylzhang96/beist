import React, {Component} from 'react';
import {
    Button, Col, ControlLabel, Form, FormControl, FormGroup, HelpBlock, ListGroup, ListGroupItem,
    Modal
} from "react-bootstrap";

class ReciteSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nowRange: '',
            nowLevel: '',
            nowPlanWordNumber: '',
            userRange: '六级',
            userLevel: '零基础',
            showTestModal: false,
            testStart: false,
            wordList: [],
            wordNum: 0,
            wordAList: [],
            wordBList: [],
            wordCList: [],
            wordDList: [],
            wordCorrectList: [],
            yourAnswer: [],
            correctNum: 0,
            allCorrectNum: 0
        }
    }

    componentWillMount() {
        fetch("/api/user/findRangeAndLevel", {
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
                    nowRange: json.result.userRange,
                    nowLevel: json.result.userLevel,
                    nowPlanWordNumber: json.result.userPlanWordNumber,
                    userRange: '六级'
                });
            } else {
                // let errorMessage = json.result.errorMessage;
                // alert(errorMessage);
            }
        }).catch(function (ex) {
            console.log('parsing failed', ex)
        })
    }

    onChangeUserRange(event) {
        let range = event.target.value;
        this.setState({
            userRange: range
        });
        // console.log("range" + range);
        // console.log(this.state.userRange); // 异步
    }

    onButtonChangeRange() {
        fetch("/api/user/modifyRange", {
            method: "POST",
            headers: {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json',
                'userTele': localStorage.getItem("userTele"),
                'token': localStorage.getItem("token")
            },
            body: JSON.stringify({
                'userTele': localStorage.getItem("userTele"),
                'userRange': this.state.userRange
            })
            // JSON.stringify序列化
        }).then(function (response) {
            return response.json()
        }).then((json) => {
            console.log('parsed json', json)
            if (json.status === 0) {
                this.setState({
                    nowRange: json.result.userRange,
                    nowPlanWordNumber: json.result.userPlanWordNumber
                })
                alert("从明天起开始修改！");
                // window.location.href = '/settings';
            }
            else {
                let errorMessage = json.result.errorMessage;
                alert(errorMessage);
                if (errorMessage === '您没有权限，请登录') {
                    window.location.href = '/';
                }
            }
        }).catch(function (ex) {
            console.log('parsing failed', ex)
        })
    }

    closeTestModal() {
        if (this.state.testStart === false) {
            this.setState({
                showTestModal: false
            })
        } else {
            alert("测试进行中，请勿关闭模态框!");
        }
    }

    closeTestModalTruly() {
        this.setState({
            showTestModal: false
        })
    }

    testLevel() {
        this.setState({
            wordList: [],
            wordNum: 0,
            wordAList: [],
            wordBList: [],
            wordCList: [],
            wordDList: [],
            wordCorrectList: [],
            yourAnswer: [],
            correctNum: 0,
            allCorrectNum: 0,
            userLevel: '零基础'
        });
        fetch("/api/user/testLevel", {
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
            if (json.status === 0) {
                for (let i = 0; i < 40; i++) {
                    let wordCorrect = Math.floor(Math.random() * 4);
                    if (wordCorrect === 0) {
                        this.setState({
                            wordList: this.state.wordList.concat(json.result.wordList[i].word),
                            wordCorrectList: this.state.wordCorrectList.concat(wordCorrect),
                            wordAList: this.state.wordAList.concat(json.result.wordList[i].correctMean),
                            wordBList: this.state.wordBList.concat(json.result.wordList[i].firstWrongMean),
                            wordCList: this.state.wordCList.concat(json.result.wordList[i].secondWrongMean),
                            wordDList: this.state.wordDList.concat(json.result.wordList[i].thirdWrongMean)
                        });
                    } else if (wordCorrect === 1) {
                        this.setState({
                            wordList: this.state.wordList.concat(json.result.wordList[i].word),
                            wordCorrectList: this.state.wordCorrectList.concat(wordCorrect),
                            wordAList: this.state.wordAList.concat(json.result.wordList[i].firstWrongMean),
                            wordBList: this.state.wordBList.concat(json.result.wordList[i].correctMean),
                            wordCList: this.state.wordCList.concat(json.result.wordList[i].secondWrongMean),
                            wordDList: this.state.wordDList.concat(json.result.wordList[i].thirdWrongMean)
                        });
                    } else if (wordCorrect === 2) {
                        this.setState({
                            wordList: this.state.wordList.concat(json.result.wordList[i].word),
                            wordCorrectList: this.state.wordCorrectList.concat(wordCorrect),
                            wordAList: this.state.wordAList.concat(json.result.wordList[i].secondWrongMean),
                            wordBList: this.state.wordBList.concat(json.result.wordList[i].firstWrongMean),
                            wordCList: this.state.wordCList.concat(json.result.wordList[i].correctMean),
                            wordDList: this.state.wordDList.concat(json.result.wordList[i].thirdWrongMean)
                        });
                    } else if (wordCorrect === 3) {
                        this.setState({
                            wordList: this.state.wordList.concat(json.result.wordList[i].word),
                            wordCorrectList: this.state.wordCorrectList.concat(wordCorrect),
                            wordAList: this.state.wordAList.concat(json.result.wordList[i].thirdWrongMean),
                            wordBList: this.state.wordBList.concat(json.result.wordList[i].firstWrongMean),
                            wordCList: this.state.wordCList.concat(json.result.wordList[i].secondWrongMean),
                            wordDList: this.state.wordDList.concat(json.result.wordList[i].correctMean)
                        });
                    }
                }
                this.setState({
                    wordList: this.state.wordList.concat('Result'),
                    wordAList: this.state.wordAList.concat('测'),
                    wordBList: this.state.wordBList.concat('试'),
                    wordCList: this.state.wordCList.concat('结'),
                    wordDList: this.state.wordDList.concat('果')
                });
                // console.log(this.state.wordList);
                // console.log(this.state.wordAList);
                // console.log(this.state.wordBList);
                // console.log(this.state.wordCList);
                // console.log(this.state.wordDList);
                // console.log(this.state.wordCorrectList);
                // window.location.href = '/settings';
            }
            else {
                let errorMessage = json.result;
                alert(errorMessage);
                if (errorMessage === '您没有权限，请登录') {
                    window.location.href = '/';
                }
            }
        }).catch(function (ex) {
            console.log('parsing failed', ex)
        });
        this.setState({
            showTestModal: true,
            testStart: true
        })
    }

    getTestResult(which) {
        // console.log(which === this.state.wordCorrectList[this.state.wordNum]);
        if (this.state.wordNum <= 39) {
            this.setState({
                yourAnswer: this.state.yourAnswer.concat(which)
            })
            if (which === this.state.wordCorrectList[this.state.wordNum]) {
                this.setState({
                    allCorrectNum: this.state.allCorrectNum + 1
                })
            }
            if (this.state.wordNum <= 39) {
                this.setState({
                    wordNum: this.state.wordNum + 1
                })
            }
        }
        else {
            this.modifyLevel();
        }

    }

    // 没有仔细测试！！！
    modifyLevel() {
        // alert(this.state.yourAnswer.length);
        let correctNum = 0;
        let userLevel = '零基础';
        for (let i = 0; i < 8; i++) {
            if (this.state.yourAnswer[i] === this.state.wordCorrectList[i]) {
                correctNum = correctNum + 1
            }
        }
        if (correctNum >= 7) {
            userLevel = '基础';
        }
        correctNum = 0;
        for (let i = 8; i < 16; i++) {
            if (this.state.yourAnswer[i] === this.state.wordCorrectList[i]) {
                correctNum = correctNum + 1
            }
        }
        if (correctNum >= 7) {
            userLevel = '初中';
        }
        correctNum = 0;
        for (let i = 16; i < 23; i++) {
            if (this.state.yourAnswer[i] === this.state.wordCorrectList[i]) {
                correctNum = correctNum + 1
            }
        }
        if (correctNum >= 6) {
            userLevel = '高中';
        }
        correctNum = 0;
        for (let i = 24; i < 31; i++) {
            if (this.state.yourAnswer[i] === this.state.wordCorrectList[i]) {
                correctNum = correctNum + 1
            }
        }
        if (correctNum >= 6) {
            userLevel = '四级';
        }
        correctNum = 0;
        for (let i = 32; i < 40; i++) {
            if (this.state.yourAnswer[i] === this.state.wordCorrectList[i]) {
                correctNum = correctNum + 1
            }
        }
        if (correctNum >= 6) {
            userLevel = '六级';
        }
        console.log(userLevel);
        correctNum = 0;
        fetch("/api/user/modifyLevel", {
            method: "POST",
            headers: {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json',
                'userTele': localStorage.getItem("userTele"),
                'token': localStorage.getItem("token")
            },
            body: JSON.stringify({
                'userTele': localStorage.getItem("userTele"),
                'userLevel': userLevel
            })
            // JSON.stringify序列化
        }).then(function (response) {
            return response.json()
        }).then((json) => {
            console.log('parsed json', json)
            if (json.status === 0) {
                this.setState({
                    nowLevel: json.result.userLevel,
                    showTestModal: false
                })
                // window.location.href = '/settings';
            }
            else {
                let errorMessage = json.result.errorMessage;
                alert(errorMessage);
                if (errorMessage === '您没有权限，请登录') {
                    window.location.href = '/';
                }
            }
        }).catch(function (ex) {
            console.log('parsing failed', ex)
        })
    }

    render() {
        return (
            <div>
                <Form horizontal>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={1}>
                            {'当前难度'}
                        </Col>
                        <Col sm={3}>
                            <FormControl type="text" placeholder={this.state.nowRange}
                                         disabled='false'/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={1}>
                            {'当前需背'}
                        </Col>
                        <Col sm={3}>
                            <FormControl type="text" placeholder={this.state.nowPlanWordNumber}
                                         disabled='false'/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={1}>
                            {'当前水平'}
                        </Col>
                        <Col sm={3}>
                            <FormControl type="text" placeholder={this.state.nowLevel}
                                         disabled='false'/>
                        </Col>
                        <Col sm={3}>
                            <Button bsStyle="info" onClick={this.testLevel.bind(this)}>去测试</Button>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formControlsRange">
                        <Col componentClass={ControlLabel} sm={1}>
                            修改难度
                        </Col>
                        <Col sm={4}>
                            <FormControl componentClass="select"
                                         onChange={this.onChangeUserRange.bind(this)}
                                         placeholder="六级">
                                <option value='六级'>六级</option>
                                <option value='四级'>四级</option>
                                <option value='高中'>高中</option>
                                <option value='初中'>初中</option>
                                <option value='基础'>基础</option>
                            </FormControl>
                            <FormControl.Feedback/>
                            <HelpBlock>{''}</HelpBlock>
                        </Col>
                        <Col sm={3}>
                            <Button bsStyle="info"
                                    onClick={this.onButtonChangeRange.bind(this)}>修改</Button>
                        </Col>
                    </FormGroup>
                </Form>
                <Modal show={this.state.showTestModal} onHide={this.closeTestModal.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.wordList[this.state.wordNum]}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ListGroup>
                            <ListGroupItem
                                onClick={this.getTestResult.bind(this, 0)}>{this.state.wordAList[this.state.wordNum]}</ListGroupItem>
                            <ListGroupItem
                                onClick={this.getTestResult.bind(this, 1)}>{this.state.wordBList[this.state.wordNum]}</ListGroupItem>
                            <ListGroupItem
                                onClick={this.getTestResult.bind(this, 2)}>{this.state.wordCList[this.state.wordNum]}</ListGroupItem>
                            <ListGroupItem
                                onClick={this.getTestResult.bind(this, 3)}>{this.state.wordDList[this.state.wordNum]}</ListGroupItem>
                        </ListGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="info" onClick={this.closeTestModalTruly.bind(this)}>真的不测了</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ReciteSettings;