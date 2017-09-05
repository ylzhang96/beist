import React, {Component} from 'react';
import {Tab, Tabs} from "react-bootstrap";
import UserSettings from "./userSettings";
import ReciteSettings from "./reciteSettings";

class SettingsBody extends Component {

    render() {
        return (
            <div className="container">
                <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                    <Tab eventKey={1} title="个人信息">
                        <div className="container padTop5Class"><UserSettings/></div>
                    </Tab>
                    <Tab eventKey={2} title="背诵设置">
                        <div className="container padTop5Class padBot10Class"><ReciteSettings/></div>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default SettingsBody;