import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';           // install bootstrap framework
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {Route, BrowserRouter as Router} from 'react-router-dom'
import App from "./App";

ReactDOM.render(
    (
        <Router>
            <Route path="/" component={App}></Route>
        </Router>
    ),
    document.getElementById('root'));
registerServiceWorker();
