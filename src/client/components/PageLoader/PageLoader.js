import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';
import loadData from 'shared/loadData';

TopBarProgress.config({
    barColors: {
        '0': '#3180F2',
        '1.0': '#0042A2'
    },
    barThickness: 5,
    shadowBlur: 5
});

@withRouter
export default class extends React.Component {
    state = {
        previousLocation: null,
        isLoading: false
    };

    static getDerivedStateFromProps(nextProps, prevState){
        const navigated = nextProps.location !== prevState.previousLocation;

        if (prevState.previousLocation === null) {
            return { previousLocation: nextProps.location };
        }

        if(navigated){
            return { previousLocation: prevState.previousLocation };
        }

        else return null;
    }

    async componentDidMount() {
        if (!(this.props.context || {}).initialLoad) {
            await this.loadPage();
        }
    }

    async componentDidUpdate(prevProps) {
        const navigated = prevProps.location !== this.props.location;

        if (navigated) {
            this.setState({
                previousLocation: prevProps.location,
                isLoading: true
            });

            await this.loadPage(prevProps.location);

            this.setState({
                previousLocation: null,
                isLoading: false
            });
        }
    }

    async loadPage(prevLocation = {}) {
        this.blockPage();

        const { routes, location } = this.props;

        await loadData(routes, location.pathname, prevLocation);

        this.blockPage(false);
    }

    blockPage(block = true) {
        /** Блокирует клики по странице во время загрузки */
        const app = document.getElementById('app');
        app.style.pointerEvents = block ? 'none' : 'all';
    }

    render() {
        const { children, location } = this.props;
        const { previousLocation, isLoading } = this.state;

        return (
          <Fragment>
              {isLoading && <TopBarProgress />}
              {React.cloneElement(children, {
                  location: previousLocation || location
              })}
          </Fragment>
        );
    }
}
