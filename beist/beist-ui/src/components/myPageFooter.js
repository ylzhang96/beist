import React, {Component} from 'react';
import '../styles/css/style.css';
import {Col, Grid, Row} from 'react-bootstrap';    // import bootstrap framework

class MyPageFooter extends Component {

    render() {
        return (
            <div>
                <div className="panel-footer indexFooter">
                    <h3>We turn not older with years, but newer every day.</h3>
                    <p>我们并非在年复一年地变老，而是日复一日地焕然一新。</p>
                    <p>——Emily Dickinson</p>
                    <div className="padTop2Class">
                        <p>Copyright © 张艳丽 金昳昀 王琳琳 朱寒燕 All rights reserved.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default MyPageFooter;