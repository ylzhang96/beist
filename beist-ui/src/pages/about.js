import React, {Component} from 'react';
import Head from "../components/head";
import AboutBody from "../components/aboutBody";
import IndexFooter from "../components/indexFooter";
import MyPageFooter from "../components/myPageFooter";

class About extends Component {
    render() {
        return (
            <div>
                <Head/>
                <div className="padTop5Class">
                    <AboutBody/>
                </div>
            </div>
        );
    }
}

export default About;