import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Register, Login } from '../pages';

class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Home}/>
                <Switch>
                    <Route path="/register" component={Register}/>
                </Switch>
            </div>
        );
    }
}

export default App;