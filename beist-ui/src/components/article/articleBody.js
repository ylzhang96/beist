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
            showArticleDetailModal: false
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
                    for (let i = 1; i < length; i++) {
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

    showArticleDetailModal(num) {
        if (num === -1) {
            this.setState({
                chosenArticle: {
                    articleName: this.state.bestRecoArticle.articleName,
                    articleLevel: this.state.bestRecoArticle.articleLevel,
                    articleNum: this.state.bestRecoArticle.articleNum,
                    // 要访问后台
                    article: 'A DNA test of the skeletal remains of a young woman confirmed that they belonged to Wei Qiujie, a Chinese teacher missing in Japan\'s northernmost region Hokkaido since July 23, according to the Chinese consulate-general in Sapporo on Wednesday. \n' +
                    'A local fisherman found the remains on a beach in Hokkaido\'s Kushiro city on Sunday morning. An autopsy revealed that she had died of drowning, the local police said. \n' +
                    '"When I saw the body, I immediately thought it was the [missing Chinese] woman whose image has repeatedly been shown on TV," the fisherman, who called the police immediately, was quoted by local media as saying. \n' +
                    'The beach is not a place where tourists visit - let alone foreigners, but local fishermen collect kelp washed ashore there. \n' +
                    'Wei, a 27-year-old primary school teacher, arrived alone at Hakodate from Fujian province on July 18. She checked in at a guesthouse in Sapporo on July 20, having paid in full ahead of her five-day stay. Changing her schedule, she left Sapporo for Lake Akan near Kushiro on July 22 and departed the picturesque hot spring resort the next day - the last time she was seen. Wei was scheduled to return to China on July 25. \n' +
                    'Wei left behind a hand-scrawled note with her belongings at the Sapporo guesthouse where she had stayed, saying thank-you and bidding farewell to her family. On August 28 Japanese TV network ANN revealed the whole letter, in which Wei said she did not want to exert herself anymore and she loved her family and friends. \n' +
                    'Wei\'s father, Wei Huasheng, came to Sapporo on July 28, looking for his daughter. He told Hokkaido police that there was nothing unusual about her before she left (China), according to Japanese media. He left behind his DNA sample before returning to Fujian. Hokkaido police had launched a massive search for Wei throughout the prefecture, asking local residents for help. \n' +
                    'Hokkaido media reported that Wei\'s family is expected to go to Kushiro soon. \n' +
                    'The Chinese consulate-general in Sapporo has been assisting the family and local police in the search. '
                }
            })
        }
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
                                    <Button bsStyle="info" onClick={this.showArticleDetailModal.bind(this, -1)} block>读文章</Button>
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
                                <Button bsStyle="link">{this.state.best5RecoArticleList[0]}</Button>
                            </Col>
                            <Col sm={12} md={6}>
                                <Button bsStyle="link">{this.state.newestArticleList[0]}</Button>
                            </Col>
                        </Row>
                        <Row className="padTop2Class">
                            <Col sm={12} md={6}>
                                <Button bsStyle="link">{this.state.best5RecoArticleList[1]}</Button>
                            </Col>
                            <Col sm={12} md={6}>
                                <Button bsStyle="link">{this.state.newestArticleList[1]}</Button>
                            </Col>
                        </Row>
                        <Row className="padTop2Class">
                            <Col sm={12} md={6}>
                                <Button bsStyle="link">{this.state.best5RecoArticleList[2]}</Button>
                            </Col>
                            <Col sm={12} md={6}>
                                <Button bsStyle="link">{this.state.newestArticleList[2]}</Button>
                            </Col>
                        </Row><Row className="padTop2Class">
                        <Col sm={12} md={6}>
                            <Button bsStyle="link">{this.state.best5RecoArticleList[3]}</Button>
                        </Col>
                        <Col sm={12} md={6}>
                            <Button bsStyle="link">{this.state.newestArticleList[3]}</Button>
                        </Col>
                    </Row><Row className="padTop2Class">
                        <Col sm={12} md={6}>
                            <Button bsStyle="link">{this.state.best5RecoArticleList[4]}</Button>
                        </Col>
                        <Col sm={12} md={6}>
                            <Button bsStyle="link">{this.state.newestArticleList[4]}</Button>
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
            </div>
        );
    }
}

export default ArticleBody;