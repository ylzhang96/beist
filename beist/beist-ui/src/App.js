import React, {Component} from 'react';
import {Link, Route} from "react-router-dom";
import Login from "./pages/user/login";
import Index from "./pages/index";
import Register from "./pages/user/register";

class App extends Component {

    render() {
        return (
            <div>
                {this.props.children}
                <Link to="/"></Link>
                <Route exact path="/" component={Index}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
            </div>
        );
    }
}

export default App;
