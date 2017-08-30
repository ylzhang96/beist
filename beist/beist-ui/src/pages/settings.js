import React, {Component} from 'react';
import Head from "../components/head";
import SettingsBody from "../components/user/settingsBody";
import MyPageFooter from "../components/myPageFooter";

class Settings extends Component {
    render() {
        return (
            <div>
                <Head/>
                <div className="padTop2Class">
                    <SettingsBody/>
                </div>
                <div className="padTop2Class">
                    <MyPageFooter/>
                </div>
            </div>
        );
    }
}

export default Settings;