import React, {Component} from 'react';
import {Button, Jumbotron} from "react-bootstrap";

class WordJumbotron extends Component {
    render() {
        return (
            <div>
                <Jumbotron>
                    <div className="text-center padBot2Class"><h2>背单词</h2></div>

                    <h5>今日已背：20个</h5>
                    <h5>今日需背：40个</h5>
                    <h5>总共已背：1800个</h5>
                    <div className="padTop5Class"><Button bsStyle="info" block>背单词</Button></div>
                </Jumbotron>
            </div>
        );
    }
}

export default WordJumbotron;