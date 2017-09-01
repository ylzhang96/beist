import React, {Component} from 'react';
import Head from "../components/head";
import ArticleBody from "../components/article/articleBody";
import MyPageFooter from "../components/myPageFooter";

class Article extends Component {
    render() {
        return (
            <div>
                <Head/>
                <div className="padTop2Class">
                    <ArticleBody/>
                </div>
                <div className="padTop2Class">
                    <MyPageFooter/>
                </div>
            </div>
        );
    }
}

export default Article;