import React, {Component} from 'react';
import Head from "../components/head";
import MyPageBody from "../components/myPageBody";
import MyPageFooter from "../components/myPageFooter";

class MyPage extends Component {
    render() {
        return (
            <div>
                <Head/>
                <div className="padTop2Class">
                    <MyPageBody/>
                </div>
                <div className="padTop2Class">
                    <MyPageFooter/>
                </div>
            </div>
        );
    }
}

export default MyPage;