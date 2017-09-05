import React, {Component} from 'react';
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, HelpBlock} from "react-bootstrap";

class ReciteSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nowRange: '',
            nowLevel: '',
            nowPlanWordNumber: '',
            userRange: '六级',
            userLevel: ''
        }
    }

    componentWillMount() {
        fetch("/api/user/findRangeAndLevel", {
            method: "POST",
            headers: {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json',
                'token': localStorage.getItem("token"),
                'userTele': localStorage.getItem("userTele")
            }
        }).then(function (response) {
            return response.json()
        }).then((json) => {
            console.log('parsed json', json)
            if (json.status === 0) {
                this.setState({
                    nowRange: json.result.userRange,
                    nowLevel: json.result.userLevel,
                    nowPlanWordNumber: json.result.userPlanWordNumber,
                    userRange: '六级'
                });
            } else {
                // let errorMessage = json.result.errorMessage;
                // alert(errorMessage);
            }
        }).catch(function (ex) {
            console.log('parsing failed', ex)
        })
    }

    onChangeUserRange(event) {
        let range = event.target.value;
        this.setState({
            userRange: range
        });
        // console.log("range" + range);
        // console.log(this.state.userRange); // 异步
    }

    onButtonChangeRange() {
        fetch("/api/user/modifyRange", {
            method: "POST",
            headers: {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json',
                'userTele': localStorage.getItem("userTele"),
                'token': localStorage.getItem("token")
            },
            body: JSON.stringify({
                'userTele': localStorage.getItem("userTele"),
                'userRange': this.state.userRange
            })
            // JSON.stringify序列化
        }).then(function (response) {
            return response.json()
        }).then((json) => {
            console.log('parsed json', json)
            if (json.status === 0) {
                this.setState({
                    nowRange: json.result.userRange,
                    nowPlanWordNumber: json.result.userPlanWordNumber
                })
                // window.location.href = '/settings';
            }
            else {
                let errorMessage = json.result.errorMessage;
                alert(errorMessage);
                if (errorMessage === '您没有权限，请登录') {
                    window.location.href = '/';
                }
            }
        }).catch(function (ex) {
            console.log('parsing failed', ex)
        })
    }

    render() {
        return (
            <div>
                <Form horizontal>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={1}>
                            {'当前难度'}
                        </Col>
                        <Col sm={3}>
                            <FormControl type="text" placeholder={this.state.nowRange}
                                         disabled='false'/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={1}>
                            {'当前需背'}
                        </Col>
                        <Col sm={3}>
                            <FormControl type="text" placeholder={this.state.nowPlanWordNumber}
                                         disabled='false'/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={1}>
                            {'当前水平'}
                        </Col>
                        <Col sm={3}>
                            <FormControl type="text" placeholder={this.state.nowLevel}
                                         disabled='false'/>
                        </Col>
                        <Col sm={3}>
                            <Button bsStyle="info">去测试</Button>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formControlsRange">
                        <Col componentClass={ControlLabel} sm={1}>
                            修改难度
                        </Col>
                        <Col sm={4}>
                            <FormControl componentClass="select"
                                         onChange={this.onChangeUserRange.bind(this)}
                                         placeholder="六级">
                                <option value='六级'>六级</option>
                                <option value='四级'>四级</option>
                                <option value='高中'>高中</option>
                                <option value='初中'>初中</option>
                                <option value='基础'>基础</option>
                            </FormControl>
                            <FormControl.Feedback/>
                            <HelpBlock>{''}</HelpBlock>
                        </Col>
                        <Col sm={3}>
                            <Button bsStyle="info"
                                    onClick={this.onButtonChangeRange.bind(this)}>修改</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default ReciteSettings;