import React, {Component} from 'react';
import {Link, Route, Switch} from "react-router-dom";
import Index from "./pages/index";
import MyPage from "./pages/myPage";
import About from "./pages/about";
import Word from "./pages/word";
import Article from "./pages/article";
import NoMatch from "./pages/noMatch";
import Settings from "./pages/settings";

class App extends Component {

    render() {
        return (
            <div>
                {this.props.children}
                <Link to="/"/>
                <Switch>
                    <Route exact path="/" component={Index}/>
                    <Route path="/myPage" component={MyPage}/>
                    <Route path="/about" component={About}/>
                    <Route path="/word" component={Word}/>
                    <Route path="/settings" component={Settings}/>
                    <Route path="/article" component={Article}/>
                    <Route component={NoMatch}/>
                </Switch>
            </div>
        );
    }
}

export default App;
