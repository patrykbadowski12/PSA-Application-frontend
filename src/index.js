import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Services from './components/Services';
import Login from './components/Login';
import AddService from './components/AddService';


ReactDOM.render(
    <BrowserRouter>
        <div>
            <ul className="nav nav-pills justify-content-end">
                <li className="nav-item" >
                    <Link to="/Login">Login</Link>
                </li>
                <li className="nav-item" >
                    <Link to="/Services">Services</Link>
                </li>
                <li className="nav-item" >
                    <Link to="/AddService">AddService</Link>
                </li>
            </ul>

            <Route path="/Login" component={Login} />
            <Route path="/Services" component={Services} />
            <Route path="/AddService" component={AddService} />

        </div>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
