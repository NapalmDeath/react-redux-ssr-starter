import React, { Fragment } from 'react';
import { hot } from 'react-hot-loader';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import PageLoader from './components/PageLoader';

class App extends React.Component {
  render() {
    const { routes } = this.props;

    return (
      <Fragment>
        Hello world
        <div>
          <Link to="/">Главная</Link>
        </div>
        <div>
          <Link to="/home/1">Home</Link>
        </div>
        <div>
          <Link to="/about">About</Link>
        </div>
        <PageLoader routes={routes}>{renderRoutes(routes)}</PageLoader>
      </Fragment>
    );
  }
}

export default hot(module)(App);
