import React, {Component} from 'react';
import {Button, Jumbotron} from "react-bootstrap";

class ArticleJumbotron extends Component {
    render() {
        return (
            <div>
                <Jumbotron>
                    <div className="text-center padBot2Class"><h2>读文章</h2></div>

                    <h5>今日已读：20个</h5>
                    <h5>今日需读：40个</h5>
                    <h5>总共已读：1800个</h5>
                    <div className="padTop5Class"><Button bsStyle="info" block>读文章</Button></div>
                </Jumbotron>
            </div>
        );
    }
}

export default ArticleJumbotron;