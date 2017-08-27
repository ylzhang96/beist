import React, {Component} from 'react';
import {Link, Route} from "react-router-dom";
import Login from "./pages/user/login";
import Index from "./pages/index";

class App extends Component {

    render() {
        return (
            <div>
                {this.props.children}
                <Link to="/"></Link>
                <Route exact path={"/"} component={Index}/>
                <Route path={"/login"} component={Login}/>
            </div>
        );
    }
}

export default App;
