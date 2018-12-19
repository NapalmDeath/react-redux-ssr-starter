import React from 'react';
import { hot } from 'react-hot-loader';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

class App extends React.Component {
    render() {
        return (
            <div>
                Hello world 21
                <div>
                    <Link to="/">Главная</Link>
                </div>
                <div>
                    <Link to="/home">Home</Link>
                </div>
                <div>
                    <Link to="/home">Home</Link>
                </div>
                <div>
                    <Link to="/about">About</Link>
                </div>
                <div>
                    <Link to="/about">About</Link>
                </div>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => <div>Index</div>}
                    />
                    <Route path="/home" component={ Home } />
                    <Route path="/about" component={ About } />
                </Switch>
            </div>
        )
    }
}

export default hot(module)(App)
