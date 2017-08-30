import React, {Component} from 'react';
import Head from "../components/head";
import MyPageFooter from "../components/myPageFooter";
import WordBody from "../components/word/wordBody";

class Word extends Component {
    render() {
        return (
            <div>
                <Head/>
                <div className="padTop2Class">
                    <WordBody/>
                </div>
                <div className="padTop2Class">
                    <MyPageFooter/>
                </div>
            </div>
        );
    }
}

export default Word;