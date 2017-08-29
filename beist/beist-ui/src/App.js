import React, {Component} from 'react';
import {Link, Route} from "react-router-dom";
import Index from "./pages/index";
import MyPage from "./pages/myPage";

class App extends Component {

    render() {
        return (
            <div>
                {this.props.children}
                <Link to="/"></Link>
                <Route exact path="/" component={Index}/>
                <Route path="/myPage" component={MyPage}/>
                {/*<Route path="/register" component={Register}/>*/}
            </div>
        );
    }
}

export default App;
