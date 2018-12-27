import React, { Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TopBarProgress from "react-topbar-progress-indicator"
import loadData from 'shared/loadData';

TopBarProgress.config({
    barColors: {
        "0": "#53b374",
        "1.0": "#53b374",
    },
    barThickness: 2,
    shadowBlur: 5,
});

@withRouter
export default class extends React.Component {
    state = {
        previousLocation: null,
        isLoading: false
    };

    async componentDidMount() {
        await this.loadPage();
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
            })
        }
    }

    async loadPage(prevLocation = {}) {
        this.blockPage();

        const {
            routes,
            location,
        } = this.props;

        await loadData(routes, location.pathname, prevLocation);

        this.blockPage(false);
    }

    blockPage(block = true) {
        /** Блокирует клики по странице во время загрузки */
        const app = document.getElementById("app");
        app.style.pointerEvents = block ? "none" : "all";
    }

    render() {
        const { children, location } = this.props;
        const { previousLocation, isLoading } = this.state;

        return (
            <Fragment>
                { isLoading && <TopBarProgress /> }
                <Route
                    location={ previousLocation || location }
                    render={ () => children }
                />
            </Fragment>
        )
    }
}
