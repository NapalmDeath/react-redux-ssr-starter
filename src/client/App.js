import React from 'react';
import { hot } from 'react-hot-loader';
import { Link, Route, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Routes from './pages/routes';

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
                    <Link to="/about">About</Link>
                </div>
                <Switch>
                    { renderRoutes(Routes) }
                </Switch>
            </div>
        )
    }
}

export default hot(module)(App)
