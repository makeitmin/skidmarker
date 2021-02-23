import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Register } from '../pages';

class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Register}/>
                </Switch>
            </div>
        );
    }
}

export default App;