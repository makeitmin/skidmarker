import React, { Component } from 'react';

import { Redirect, Route, Switch } from 'react-router-dom'
import { Register, Login, Home } from '../pages';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    render() {
        return (
            <>
                {
                    !sessionStorage.getItem('token') ? <Redirect to='/login' /> : ''
                }
                <Route exact path="/login" component={Login}/>
                <Switch>
                    <Route path="/home" component={Home}/>
                    <Route path="/register" component={Register}/>
                </Switch>
            </>
        );
    }
}

export default App;