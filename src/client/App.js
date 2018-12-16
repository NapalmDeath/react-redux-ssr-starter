import React from 'react';
import { hot } from 'react-hot-loader';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';

class App extends React.Component {
    render() {
        return (
            <div>
                Hello world 18
                <div>
                    <Link to="/">Главная</Link>
                </div>
                <div>
                    <Link to="/home">Home</Link>
                </div>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => <div>Index</div>}
                    />
                    <Route path="/home" component={ Home } />
                </Switch>
            </div>
        )
    }
}

export default hot(module)(App)
