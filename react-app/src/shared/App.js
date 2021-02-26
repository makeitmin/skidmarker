import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Register, Login, Home } from '../pages';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Home}/>
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                </Switch>
            </div>
        );
    }
}

export default App;