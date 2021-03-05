import React, { Component } from 'react';

import { Redirect, Route, Switch } from 'react-router-dom'
import { Register, Login, Home, Network, Education, Award, Project, Certificate } from '../pages';

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
                    <Route path="/home" component={Home}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/network" component={Network}/>
                    <Route path="/education" component={Education}/>
                    <Route path="/award" component={Award}/>
                    <Route path="/project" component={Project}/>
                    <Route path="/certificate" component={Certificate}/>
                </Switch>
            </>
        );
    }
}

export default App;