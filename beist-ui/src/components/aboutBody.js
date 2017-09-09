import React, {Component} from 'react';
import {
    Tab,Tabs
} from "react-bootstrap";

class AboutBody extends Component {
    render() {
        return (
            <div className="container">
                <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                    <Tab eventKey={1} title="简介">
                        <div className="padTop2Class">
                            <h4>'Beist' 是一款基于Java语言的Web项目，提供一种新的记忆单词方法。</h4>
                            <h4 className="padTop2Class">'Beist' is a Java Web & Android Application for providing a new method of memorizing
                                English words.</h4>
                            <h4 className="padTop2Class">项目开源地址：GitHub:https://github.com/ylzhang96/beist</h4>
                        </div>
                    </Tab>
                    <Tab eventKey={2} title="如何使用">
                        <div className="padTop2Class">
                            <h4>进入主页、新用户请选择注册、老用户选择登录进入个人主页</h4>
                            <h4 className="padTop2Class">在个人主页中，您可以选择通过英文查询中文解释</h4>
                            <h4 className="padTop2Class">在个人主页中，您可以对您的昵称、背诵难度进行设置</h4>
                            <h4 className="padTop2Class">在个人主页中，您可以选择背单词或者通过阅读文章来背单词</h4>
                            <h4 className="padTop2Class">您可以进入设置中测试您的英语水平</h4>
                        </div>
                    </Tab>
                    <Tab eventKey={3} title="版本信息" className="container">
                        <div className="padTop2Class"><h4>Version 1.0</h4></div>
                    </Tab>
                    <Tab eventKey={4} title="关于我们">
                        <div className="padTop2Class"><h4>Beist is made By 张艳丽、金昳昀、王琳琳、朱寒燕</h4></div>
                    </Tab>
                    <Tab eventKey={5} title="联系我们">
                        <div className="padTop2Class"><h4>Email: ylzhang96@163.com 张艳丽</h4></div>
                    </Tab>
                </Tabs>
            </div>

        );
    }
}

export default AboutBody;