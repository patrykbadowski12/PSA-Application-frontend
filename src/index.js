import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, NavLink, Redirect } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Services from './components/Services';
import AddService from './components/AddService';

ReactDOM.render(
    <BrowserRouter >
        <div>
            <ul className= "nav nav-pills justify-content-end">
                <li className="nav-item" >
                    <NavLink to='/Services'>Services</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to='/AddService'>Add Service</NavLink>
                </li>
            </ul>
            <Redirect from="/" to="/Services" />
            <Route path='/Services' component={Services} />
            <Route path='/AddService' component={AddService}/>
        </div>
    </BrowserRouter>
    ,document.getElementById('root'));
registerServiceWorker();
