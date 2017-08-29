import React, {Component} from 'react';
import Head from "../components/head";
import MyPageBody from "../components/myPageBody";
import MyPageFooter from "../components/myPageFooter";

class MyPage extends Component {
    render() {
        return (
            <div>
                <Head/>
                <div className="padTop3Class">
                    <MyPageBody/>
                </div>
                <div className="padTop5Class">
                    <MyPageFooter/>
                </div>
            </div>
        );
    }
}

export default MyPage;