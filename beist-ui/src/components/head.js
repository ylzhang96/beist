import React, {Component} from 'react';
import {
    Button,
    FormControl,
    FormGroup, Glyphicon, Image, InputGroup,
    MenuItem, Modal, Nav, Navbar, NavDropdown, NavItem
} from "react-bootstrap";
import Icon from '../images/icon.jpg';

class Head extends Component {

    constructor() {
        super();
        this.state = {
            fuzzyWord: '',
            showWordModal: false,
            wordNum: 0,
            word1: {
                wordName: '',
                wordPhonetic: '',
                wordExample: '',
                wordMeaning: '',
                wordMeaningCn: '',
                wordLevel: ''
            },
            word2: {
                wordName: '',
                wordPhonetic: '',
                wordExample: '',
                wordMeaning: '',
                wordMeaningCn: '',
                wordLevel: ''
            },
            word3: {
                wordName: '',
                wordPhonetic: '',
                wordExample: '',
                wordMeaning: '',
                wordMeaningCn: '',
                wordLevel: ''
            }
        }
    }

    componentWillMount() {
        fetch("/api/user/check", {
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
            if (json.status === 1) {
                localStorage.setItem("userTele", "");
                localStorage.setItem("token", "");
                localStorage.setItem("userName", "");
                let errorMessage = json.result.errorMessage;
                alert(errorMessage);
                window.location.href = '/';
            }
        }).catch(function (ex) {
            console.log('parsing failed', ex)
        })
    }

    onChangeFuzzyWord(event) {
        let word = event.target.value;
        this.setState({
            fuzzyWord: word,
            wordNum: 0,
            word1: {
                wordName: '',
                wordPhonetic: '',
                wordExample: '',
                wordMeaning: '',
                wordMeaningCn: '',
                wordLevel: ''
            },
            word2: {
                wordName: '',
                wordPhonetic: '',
                wordExample: '',
                wordMeaning: '',
                wordMeaningCn: '',
                wordLevel: ''
            },
            word3: {
                wordName: '',
                wordPhonetic: '',
                wordExample: '',
                wordMeaning: '',
                wordMeaningCn: '',
                wordLevel: ''
            }
        })
    }

    onSearchWord() {
        fetch("/api/word/search", {
            method: "POST",
            headers: {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json',
                'token': localStorage.getItem("token"),
                'userTele': localStorage.getItem("userTele")
            },
            body: JSON.stringify({
                'word': this.state.fuzzyWord
            })
        }).then(function (response) {
            return response.json()
        }).then((json) => {
                console.log('parsed json', json)
                if (json.status >= 0) {
                    this.setState({
                        word1: {
                            wordName: json.result.word1.word,
                            wordPhonetic: json.result.word1.wordPhonetic,
                            wordLevel: json.result.word1.wordLevel,
                            wordExample: '用例：' + json.result.word1.wordExample,
                            wordMeaning: '英文解释：' + json.result.word1.wordMeaning,
                            wordMeaningCn: '中文解释：' + json.result.word1.wordMeaningCn
                        },
                        wordNum: 1
                    });
                    if (json.status > 1) {
                        this.setState({
                            word2: {
                                wordName: json.result.word2.word,
                                wordPhonetic: json.result.word2.wordPhonetic,
                                wordLevel: json.result.word2.wordLevel,
                                wordExample: '用例：' + json.result.word2.wordExample,
                                wordMeaning: '英文解释：' + json.result.word2.wordMeaning,
                                wordMeaningCn: '中文解释：' + json.result.word2.wordMeaningCn
                            },
                            wordNum: 2
                        })
                    }
                    if (json.status > 2) {
                        this.setState({
                            word3: {
                                wordName: json.result.word3.word,
                                wordPhonetic: json.result.word3.wordPhonetic,
                                wordLevel: json.result.word3.wordLevel,
                                wordExample: '用例：' + json.result.word3.wordExample,
                                wordMeaning: '英文解释：' + json.result.word3.wordMeaning,
                                wordMeaningCn: '中文解释：' + json.result.word3.wordMeaningCn
                            },
                            wordNum: 3
                        })
                    }
                    this.openWordModal();
                }
                else {
                    alert("没有找到单词");
                }
            }
        ).catch(function (ex) {
            console.log('parsing failed', ex)
        })
    }

    exitUser() {
        // 删除token
        localStorage.setItem("token", "");
        localStorage.setItem("userName", "");
        localStorage.setItem("userTele", "");
        window.location.href = '/';
    }

    closeWordModal() {
        this.setState({
            showWordModal: false
        });
    }

    openWordModal() {
        this.setState({
            showWordModal: true
        });
    }

    render() {

        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/myPage">Beist</a>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1} href="/word">背单词</NavItem>
                            <NavItem eventKey={2} href="/article">读文章</NavItem>
                        </Nav>
                        <Nav pullRight>
                            <NavDropdown eventKey={3} title={<Image src={Icon} circle/>} id="basic-nav-dropdown">
                                <MenuItem eventKey={3.1}><h5>{localStorage.getItem("userName")}</h5></MenuItem>
                                <MenuItem divider/>
                                <MenuItem eventKey={3.2} href="/settings">设置</MenuItem>
                                <MenuItem eventKey={3.3} href="/about">帮助</MenuItem>
                                <MenuItem divider/>
                                <MenuItem eventKey={3.4} onClick={this.exitUser.bind(this)}>注销</MenuItem>
                            </NavDropdown>
                        </Nav>
                        <Navbar.Form pullRight>
                            <FormGroup>
                                <InputGroup>
                                    <FormControl type="text" placeholder="查单词"
                                                 onChange={this.onChangeFuzzyWord.bind(this)}/>
                                    <InputGroup.Button>
                                        <Button onClick={this.onSearchWord.bind(this)}><Glyphicon
                                            glyph="search"/></Button>
                                    </InputGroup.Button>
                                </InputGroup>
                            </FormGroup>
                        </Navbar.Form>
                    </Navbar.Collapse>
                </Navbar>
                <Modal show={this.state.showWordModal} onHide={this.closeWordModal.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Result</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h3>{this.state.word1.wordName}</h3>
                        <p>{this.state.word1.wordPhonetic + ' ' + this.state.word1.wordLevel}</p>
                        <p>{this.state.word1.wordMeaning}</p>
                        <p>{this.state.word1.wordMeaningCn}</p>
                        <p>{this.state.word1.wordExample}</p>

                        <p>{' '}</p>
                        <h3>{this.state.word2.wordName}</h3>
                        <p>{this.state.word2.wordPhonetic + ' ' + this.state.word2.wordLevel}</p>
                        <p>{this.state.word2.wordMeaning}</p>
                        <p>{this.state.word2.wordMeaningCn}</p>
                        <p>{this.state.word2.wordExample}</p>

                        <p>{' '}</p>
                        <h3>{this.state.word3.wordName}</h3>
                        <p>{this.state.word3.wordPhonetic + ' ' + this.state.word3.wordLevel}</p>
                        <p>{this.state.word3.wordMeaning}</p>
                        <p>{this.state.word3.wordMeaningCn}</p>
                        <p>{this.state.word3.wordExample}</p>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeWordModal.bind(this)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        );
    }
}

export default Head;