import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';           // install bootstrap framework
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Index from "./pages/index";
import Login from "./pages/user/login";
import {Route, Router} from "react-router";

ReactDOM.render((
        <Router >//开始创建路由表
            <Route path="/" component={App}>//声明每一个路由
                {/*<Route path="/about" component={About}/>*/}
                <Route path="login" component={Login}>//每个路由
                    {/*<Route path=":id" component={User}/>//对应一个Component*/}
                </Route>
            </Route>
        </Router>
    ),
    document.getElementById('root'));
registerServiceWorker();
