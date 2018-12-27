import React from 'react';
import { hot } from 'react-hot-loader';
import { Link, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import PageLoader from './components/PageLoader';

class App extends React.Component {
    render() {
        const { routes } = this.props;

        return (
            <PageLoader routes={ routes }>
                Hello world 21
                <div>
                    <Link to="/">Главная</Link>
                </div>
                <div>
                    <Link to="/home/1">Home</Link>
                </div>
                <div>
                    <Link to="/about">About</Link>
                </div>
                <Switch>
                    { renderRoutes(routes) }
                </Switch>
            </PageLoader>
        )
    }
}

export default hot(module)(App)
