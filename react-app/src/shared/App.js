import React, { Component } from 'react';

import { Redirect, Route, Switch } from 'react-router-dom'
import Register from '../pages/Register';
import Login from '../pages/Login';
import Network from '../pages/Network';
import User from '../pages/User';
import OtherUser from '../pages/OtherUser';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    render() {
        return (
            <>
                {
                    !sessionStorage.getItem("token") ? <Redirect to="/login" /> : ""
                }
                <Route exact path="/login" component={Login}/>
                <Switch>
                    <Route path="/user" component={User}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/network" component={Network}/>
                    <Route path="/other" component={OtherUser}/>
                </Switch>
            </>
        );
    }
}

export default App;