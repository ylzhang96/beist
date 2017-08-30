import React, {Component} from 'react';
import Head from "../components/head";

class Article extends Component {
    render() {
        return (
            <div>
                <Head/>
                <div className="padTop5Class">
                    article
                </div>
            </div>
        );
    }
}

export default Article;