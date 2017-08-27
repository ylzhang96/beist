import React, {Component} from 'react';
import '../styles/css/style.css';
import IndexBody from "../components/indexBody";
import IndexFooter from "../components/indexFooter";

class Index extends Component {

    render() {
        return (
            <div>
                <IndexBody/>
                <IndexFooter/>
            </div>
        );
    }
}

export default Index;