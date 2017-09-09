import React, {Component} from 'react';
import {Button, Col, Grid, Jumbotron, Modal, Pagination, Row} from "react-bootstrap";

class ArticleBody extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeRecoPage: 1,
            activeNewPage: 1,
            activeAllRecoNum: 10,  // 数据库所有文章除以5
            activeALLNewNum: 2,   // 所有待读除以5
            newestArticleListNum: 5,  // 一般为5，小于5再说
            RecoArticleIdList: [],
            RecoArticleTitleList: [],
            UserArticleIdList: [],
            UserArticleTitleList: [],
            bestRecoArticle: {
                articleName: '',
                articleLevel: '',
                articleNum: 0,
                articleAbstract: ''
            },
            chosenArticle: {
                articleName: '',
                articleLevel: '',
                articleNum: 0,
                article: ''
            },
            best5RecoArticleList: [],
            newestArticleList: [],
            showArticleDetailModal: false,
            showWordDetailModal: false,
            wordIdList: [],
            wordNum: 1,
            wordInfo: {
                wordId: '',
                word: '',
                wordPhonetic: '',
                wordExample: '',
                wordMeaning: '',
                wordMeaningCn: ''
            },
            chosenNumber : 0
        }
    }

    componentWillMount() {
        fetch("/api/article/getArticleList", {
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
            if (json.status > 0) {
                this.setState({
                    RecoArticleIdList: json.result.articleIdList,
                    RecoArticleTitleList: json.result.articleTitleList
                });
                if (json.status > 1) {
                    let length = this.state.RecoArticleIdList.length;
                    for (let i = 1; i < length; i++) {
                        this.setState({
                            best5RecoArticleList: this.state.best5RecoArticleList.concat(this.state.RecoArticleTitleList[i])
                        })
                    }
                }
                fetch("/api/article/getArticleInfoByArticleId", {
                    method: "POST",
                    headers: {
                        'Cache-Control': 'no-cache',
                        'Content-Type': 'application/json',
                        'token': localStorage.getItem("token"),
                        'userTele': localStorage.getItem("userTele"),
                        'articleId': this.state.RecoArticleIdList[0],
                    }
                }).then(function (response) {
                    return response.json()
                }).then((json) => {
                    console.log('parsed json', json)
                    if (json.status === 0) {
                        this.setState({
                            bestRecoArticle: {
                                articleName: json.result.articleName,
                                articleLevel: json.result.articleLevel,
                                articleNum: json.result.articleNum,
                                articleAbstract: json.result.articleAbstract
                            },
                        });
                    } else {
                        // let errorMessage = json.result.errorMessage;
                        // alert(errorMessage);
                    }
                }).catch(function (ex) {
                    console.log('parsing failed', ex)
                })
            } else {
                // let errorMessage = json.result.errorMessage;
                // alert(errorMessage);
            }
        }).catch(function (ex) {
            console.log('parsing failed', ex)
        })
        fetch("/api/article/getUserArticleList", {
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
            console.log('parsed json', json);
            if (json.status === 0) {
                this.setState({
                    UserArticleIdList: json.result.articleIdList,
                    UserArticleTitleList: json.result.articleTitleList
                });
                if (json.status > 0) {
                    let length = this.state.UserArticleIdList.length;
                    for (let i = 0; i < length; i++) {
                        this.setState({
                            newestArticleList: this.state.newestArticleList.concat(this.state.UserArticleTitleList[i])
                        })
                    }
                }
            } else {
                // let errorMessage = json.result.errorMessage;
                // alert(errorMessage);
            }
        }).catch(function (ex) {
            console.log('parsing failed', ex)
        })
    }

    showWordDetailModal() {
        this.getWordByWordId(0);
        this.setState({
            showWordDetailModal: true
        });
    }

    closeWordDetailModal() {

        this.setState({
            showWordDetailModal: false,
            wordNum : 1
        });
    }

    showArticleDetailModal() {
        this.setState({
            showArticleDetailModal: true
        });
    }

    closeArticleDetailModal() {
        this.setState({
            showArticleDetailModal: false
        });
    }

    handleRecoSelect(eventKey) {
        this.setState({
            activeRecoPage: eventKey
        });
    }

    handleNewSelect(eventKey) {
        this.setState({
            activeNewPage: eventKey
        });
    }

    nextWord() {
        this.getWordByWordId(this.state.wordNum);
        if(this.state.wordNum < this.state.wordIdList.length - 1) {
            this.setState({
                wordNum : this.state.wordNum + 1
            })
        } else {
            this.updateArticleState(0);
            this.getArticle(this.state.chosenNumber);
        }
    }

    updateArticleState(state) {

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
                    }
                })
            }
            else {
                let errorMessage = json.message;
                // alert(errorMessage);
                if (errorMessage === '您没有权限，请登录') {
                    window.location.href = '/';
                }
            }
        }).catch(function (ex) {
            console.log('parsing failed', ex)
        })
    }

    getArticle(num) {
        this.setState({
            chosenNumber:num
        })
        let wordId = 0;
        if (num >= 0 && num <= 5) {
            wordId = this.state.RecoArticleIdList[num];
        } else {
            wordId = this.state.UserArticleIdList[num - 6];
        }
        // 用户文章表没有或者用户单词表为熟悉单词，则返回单词列表
        // 用户文章表显示准备阅读或者用户单词表显示已阅读，则返回文章列表
        fetch("/api/article/getArticleListOrWordList", {
            method: "POST",
            headers: {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json',
                'token': localStorage.getItem("token"),
                'userTele': localStorage.getItem("userTele"),
                'articleId': wordId,
            }
        }).then(function (response) {
            return response.json()
        }).then((json) => {
            console.log('parsed json', json)
            if (json.status === 1) {
                for (let i = 0; i < json.result.wordIdList.length; i++) {
                    this.setState({
                        wordIdList: this.state.wordIdList.concat(json.result.wordIdList[i]),
                        wordNum: 1
                    });
                }

            } else if (json.status === 0) {
                let articleTotal = '';
                for(let i = 0; i < json.result.article.length; i++) {
                    articleTotal = articleTotal + "\n" + json.result.article[i];
                }
                this.setState({
                    chosenArticle: {
                        articleName: json.result.articleInfo[0],
                        articleLevel: json.result.articleInfo[1],
                        articleNum: json.result.articleInfo[2],
                        article: articleTotal
                    }
                })
                this.showArticleDetailModal();
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
                <div className="container">
                    <Jumbotron>
                        <h2 className="text-center">{this.state.bestRecoArticle.articleName}</h2>
                        <p className="padTop3Class">{this.state.bestRecoArticle.articleAbstract}</p>
                        <Grid className="text-center padTop2Class">
                            <Row>
                                <Col sm={6}>
                                    <p>难度： {this.state.bestRecoArticle.articleLevel}</p>
                                </Col>
                                <Col sm={6}>
                                    <p>字数： {this.state.bestRecoArticle.articleNum}</p>
                                </Col>
                            </Row>

                            <Row className="padBot2Class padTop3Class">
                                <div className="padLef30Class padRig30Class">
                                    <Button bsStyle="info" onClick={this.getArticle.bind(this, 0)} block>读文章</Button>
                                </div>
                            </Row>
                        </Grid>
                    </Jumbotron>
                </div>
                <div className="container text-center">
                    <Grid>
                        <Row>
                            <Col sm={12} md={6}>
                                <h3>推荐阅读</h3>
                            </Col>
                            <Col sm={12} md={6}>
                                <h3>待读文章</h3>
                            </Col>
                        </Row>
                        <Row className="padTop2Class">
                            <Col sm={12} md={6}>
                                <Button bsStyle="link"
                                        onClick={this.getArticle.bind(this, 1)}>{this.state.best5RecoArticleList[0]}</Button>
                            </Col>
                            <Col sm={12} md={6}>
                                <Button bsStyle="link"
                                        onClick={this.getArticle.bind(this, 6)}>{this.state.newestArticleList[0]}</Button>
                            </Col>
                        </Row>
                        <Row className="padTop2Class">
                            <Col sm={12} md={6}>
                                <Button bsStyle="link"
                                        onClick={this.getArticle.bind(this, 2)}>{this.state.best5RecoArticleList[1]}</Button>
                            </Col>
                            <Col sm={12} md={6}>
                                <Button bsStyle="link"
                                        onClick={this.getArticle.bind(this, 7)}>{this.state.newestArticleList[1]}</Button>
                            </Col>
                        </Row>
                        <Row className="padTop2Class">
                            <Col sm={12} md={6}>
                                <Button bsStyle="link"
                                        onClick={this.getArticle.bind(this, 3)}>{this.state.best5RecoArticleList[2]}</Button>
                            </Col>
                            <Col sm={12} md={6}>
                                <Button bsStyle="link"
                                        onClick={this.getArticle.bind(this, 8)}>{this.state.newestArticleList[2]}</Button>
                            </Col>
                        </Row><Row className="padTop2Class">
                        <Col sm={12} md={6}>
                            <Button bsStyle="link"
                                    onClick={this.getArticle.bind(this, 4)}>{this.state.best5RecoArticleList[3]}</Button>
                        </Col>
                        <Col sm={12} md={6}>
                            <Button bsStyle="link"
                                    onClick={this.getArticle.bind(this, 9)}>{this.state.newestArticleList[3]}</Button>
                        </Col>
                    </Row><Row className="padTop2Class">
                        <Col sm={12} md={6}>
                            <Button bsStyle="link"
                                    onClick={this.getArticle.bind(this, 5)}>{this.state.best5RecoArticleList[4]}</Button>
                        </Col>
                        <Col sm={12} md={6}>
                            <Button bsStyle="link"
                                    onClick={this.getArticle.bind(this, 10)}>{this.state.newestArticleList[4]}</Button>
                        </Col>
                    </Row>


                        {/*<Row className="padTop3Class">*/}
                        {/*<Col sm={12} md={6}>*/}
                        {/*<Pagination*/}
                        {/*prev*/}
                        {/*next*/}
                        {/*first*/}
                        {/*last*/}
                        {/*ellipsis*/}
                        {/*boundaryLinks*/}
                        {/*items={this.state.activeAllRecoNum}*/}
                        {/*maxButtons={5}*/}
                        {/*activePage={this.state.activeRecoPage}*/}
                        {/*onSelect={this.handleRecoSelect.bind(this)}/>*/}
                        {/*</Col>*/}
                        {/*<Col sm={12} md={6}>*/}
                        {/*<Pagination*/}
                        {/*prev*/}
                        {/*next*/}
                        {/*first*/}
                        {/*last*/}
                        {/*ellipsis*/}
                        {/*boundaryLinks*/}
                        {/*items={this.state.activeALLNewNum}*/}
                        {/*maxButtons={5}*/}
                        {/*activePage={this.state.activeNewPage}*/}
                        {/*onSelect={this.handleNewSelect.bind(this)}/>*/}
                        {/*</Col>*/}
                        {/*</Row>*/}
                    </Grid>
                </div>
                <Modal className="ArticleDetailModal" show={this.state.showArticleDetailModal}
                       onHide={this.closeArticleDetailModal.bind(this)} bsSize="large"
                       aria-labelledby="contained-modal-title-lg">
                    <Modal.Header closeButton>
                        <Modal.Title><h3 className="text-center">{this.state.chosenArticle.articleName}</h3>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{this.state.chosenArticle.article}</p>
                        <div className="padTop3Class">
                            难度： {this.state.chosenArticle.articleLevel}
                            <div className="text-right floatClass"> 字数： {this.state.chosenArticle.articleNum}</div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="padLef30Class padRig30Class">
                        <Button bsStyle="info" onClick={this.closeArticleDetailModal.bind(this)} block>完成阅读</Button>
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
                        <Button block onClick={this.nextWord.bind(this)}>下一个</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ArticleBody;