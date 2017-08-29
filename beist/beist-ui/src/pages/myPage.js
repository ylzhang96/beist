import React, {Component} from 'react';
import {Button, Checkbox, Col, ControlLabel, Form, FormControl, FormGroup} from "react-bootstrap";
import Head from "../components/head";
import About from "../components/about";

class MyPage extends Component {
    render() {
        return (
            <div>
                <Head/>
                <div className="padTop3Class">
                    <About/>
                </div>
            </div>
        );
    }
}

export default MyPage;